import { NextResponse } from "next/server";
import * as ical from "node-ical";

export const dynamic = "force-dynamic";

function listFromEnv(v?: string) {
  return (v || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isoDateInTZ(date: Date, timeZone: string) {
  // stable YYYY-MM-DD in the configured TZ
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);

  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

function addDaysISO(iso: string, days: number) {
  const [y, m, d] = iso.split("-").map((x) => Number(x));
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return `${dt.getUTCFullYear()}-${pad2(dt.getUTCMonth() + 1)}-${pad2(dt.getUTCDate())}`;
}

async function fetchTextWithTimeout(url: string, ms: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(id);
  }
}

// Manual closures
// - CALENDAR_MANUAL_CLOSED_DATES="2025-12-19,2025-12-20,2025-12-21"
// - CALENDAR_MANUAL_CLOSED_RANGES="2025-12-19:2025-12-22,2026-01-10:2026-01-12"
//   Range end is CHECKOUT/EXCLUSIVE, so 19-21 is "19:22"
function parseManualClosedDates() {
  return new Set(listFromEnv(process.env.CALENDAR_MANUAL_CLOSED_DATES));
}

function parseManualClosedRanges() {
  const raw = listFromEnv(process.env.CALENDAR_MANUAL_CLOSED_RANGES);
  const ranges: Array<{ start: string; endExclusive: string }> = [];

  for (const r of raw) {
    const cleaned = r.replace(/\s+/g, "");
    const parts =
      cleaned.includes(":") ? cleaned.split(":") :
      cleaned.includes("..") ? cleaned.split("..") :
      cleaned.includes("-") && cleaned.split("-").length === 6 ? cleaned.split("-") : null;

    if (!parts) continue;

    // support "YYYY-MM-DD:YYYY-MM-DD"
    if (parts.length === 2) {
      const [start, endExclusive] = parts;
      if (start?.length === 10 && endExclusive?.length === 10) ranges.push({ start, endExclusive });
      continue;
    }

    // very defensive, skip anything weird
  }

  return ranges;
}

function addRangeToSet(set: Set<string>, startISO: string, endExclusiveISO: string) {
  let cur = startISO;
  while (cur < endExclusiveISO) {
    set.add(cur);
    cur = addDaysISO(cur, 1);
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const debug = url.searchParams.get("debug") === "1";

  const tz = process.env.CALENDAR_TZ || "Europe/Rome";
  const timeoutMs = Number(process.env.CALENDAR_FETCH_TIMEOUT_MS || "10000");

  // URLs: prefer CALENDAR_ICS_URLS, fallback to AIRBNB_ICS_URL + BOOKING_ICS_URL
  const fromCombined = listFromEnv(process.env.CALENDAR_ICS_URLS);
  const fromSingles = [process.env.AIRBNB_ICS_URL, process.env.BOOKING_ICS_URL].filter(Boolean) as string[];
  const ICS_URLS = fromCombined.length ? fromCombined : fromSingles;

  if (!ICS_URLS.length) {
    return NextResponse.json({ error: "Missing CALENDAR_ICS_URLS (or AIRBNB_ICS_URL/BOOKING_ICS_URL)" }, { status: 500 });
  }

  const todayISO = isoDateInTZ(new Date(), tz);
  const tomorrowISO = addDaysISO(todayISO, 1);

  const unavailable = new Set<string>();

  // 1) Add manual closed dates and ranges (these are also unavailable)
  const manualDates = parseManualClosedDates();
  for (const d of manualDates) unavailable.add(d);

  const manualRanges = parseManualClosedRanges();
  for (const r of manualRanges) addRangeToSet(unavailable, r.start, r.endExclusive);

  // 2) Fetch and parse ICS in parallel
  const results = await Promise.allSettled(
    ICS_URLS.map(async (icsUrl) => {
      const raw = await fetchTextWithTimeout(icsUrl, timeoutMs);
      return { icsUrl, raw };
    })
  );

  const diagnostics: any = {
    tz,
    todayISO,
    tomorrowISO,
    sources: [] as any[],
    manual: {
      closedDatesCount: manualDates.size,
      closedRangesCount: manualRanges.length,
      closedDatesSample: [...manualDates].slice(0, 8),
      closedRangesSample: manualRanges.slice(0, 8)
    }
  };

  for (const r of results) {
    if (r.status !== "fulfilled") {
      if (debug) diagnostics.sources.push({ ok: false, error: String(r.reason) });
      continue;
    }

    const { icsUrl, raw } = r.value;
    const parsed = ical.parseICS(raw);

    let eventsParsed = 0;
    const sample: any[] = [];

    for (const key of Object.keys(parsed)) {
      const ev: any = parsed[key];
      if (!ev || ev.type !== "VEVENT") continue;

      const start: Date | undefined = ev.start;
      const end: Date | undefined = ev.end;
      if (!start || !end) continue;

      eventsParsed++;

      // date-only ISO in TZ
      const startISO = isoDateInTZ(start, tz);
      const endISO = isoDateInTZ(end, tz); // checkout/exclusive

      // Add nights where current < end (same as your Flask logic)
      addRangeToSet(unavailable, startISO, endISO);

      if (sample.length < 3) {
        sample.push({
          summary: ev.summary || ev.description || "VEVENT",
          start: startISO,
          end: endISO
        });
      }
    }

    if (debug) diagnostics.sources.push({ url: icsUrl, ok: true, eventsParsed, sample });
  }

  // 3) Only tomorrow onward
  const filtered = [...unavailable].filter((d) => d >= tomorrowISO).sort();

  if (!debug) return NextResponse.json(filtered);

  diagnostics.unavailableCount = filtered.length;
  diagnostics.unavailableSample = filtered.slice(0, 8);

  return NextResponse.json({ dates: filtered, diagnostics });
}
