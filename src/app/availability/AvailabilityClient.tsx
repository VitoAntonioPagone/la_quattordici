"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "../i18n";

type Props = { lang: Lang };

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function isoDateInTZ(date: Date, timeZone: string) {
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

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function stripTimeLocal(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function dayKeyLocal(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

export default function AvailabilityClient({ lang }: Props) {
  const tz = process.env.NEXT_PUBLIC_CALENDAR_TZ || "Europe/Rome";

  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [unavailableSet, setUnavailableSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(lang === "it" ? "2 Ospiti" : "2 Guests");
  const [uiError, setUiError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState("");

  const tomorrowISO = useMemo(() => {
    const todayISO = isoDateInTZ(new Date(), tz);
    return addDaysISO(todayISO, 1);
  }, [tz]);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        // expects either:
        // - string[]
        // - { dates: string[] }
        // - { booked: string[], closed: string[] }
        const res = await fetch("/api/booked-dates?debug=0", { cache: "no-store" });
        const json = await res.json();

        const datesFromOld: string[] = Array.isArray(json) ? json : (json.dates ?? []);
        const booked: string[] = Array.isArray(json) ? [] : (json.booked ?? []);
        const closed: string[] = Array.isArray(json) ? [] : (json.closed ?? []);

        const combined = booked.length || closed.length ? [...booked, ...closed] : datesFromOld;

        if (!alive) return;
        setUnavailableSet(new Set(combined));
      } catch (e) {
        if (!alive) return;
        console.log("[availability] failed to load unavailable dates", e);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [tz]);

  const weekdayLabels = useMemo(() => {
    return lang === "it"
      ? ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }, [lang]);

  const monthLabel = useMemo(() => {
    return month.toLocaleString(lang === "it" ? "it-IT" : "en-US", { month: "long", year: "numeric" });
  }, [month, lang]);

  const gridDays = useMemo(() => {
    const first = startOfMonth(month);
    const mondayIndex = (first.getDay() + 6) % 7; // Mon=0..Sun=6
    const start = new Date(first);
    start.setDate(first.getDate() - mondayIndex);

    const cells: Date[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      cells.push(d);
    }
    return cells;
  }, [month]);

  function isUnavailable(d: Date) {
    return unavailableSet.has(isoDateInTZ(d, tz));
  }

  function isTooEarly(d: Date) {
    return isoDateInTZ(d, tz) < tomorrowISO;
  }

  function rangeHasUnavailable(start: Date, end: Date) {
    // end is checkout (exclusive)
    let cur = stripTimeLocal(start);
    const out = stripTimeLocal(end);

    while (cur < out) {
      if (unavailableSet.has(isoDateInTZ(cur, tz))) return true;
      cur.setDate(cur.getDate() + 1);
    }
    return false;
  }

  function resetSelection() {
    setCheckIn(null);
    setCheckOut(null);
    setUiError("");
  }

  function onPickDate(d: Date) {
    setUiError("");

    if (isUnavailable(d) || isTooEarly(d)) return;

    // First click or restart
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(d);
      setCheckOut(null);
      return;
    }

    // Selecting checkout
    if (checkIn && !checkOut) {
      // If user clicks same day or earlier, restart with new check-in
      if (stripTimeLocal(d).getTime() <= stripTimeLocal(checkIn).getTime()) {
        setCheckIn(d);
        setCheckOut(null);
        return;
      }

      // Validate: nights between checkIn..checkout(exclusive) must be available
      if (rangeHasUnavailable(checkIn, d)) {
        setUiError(lang === "it" ? "Nel periodo selezionato ci sono date non disponibili." : "Selected period contains unavailable dates.");
        return;
      }

      setCheckOut(d);
    }
  }

  function isInSelectedRange(d: Date) {
    // range only AFTER checkout
    if (!checkIn || !checkOut) return false;

    const dd = stripTimeLocal(d).getTime();
    const ci = stripTimeLocal(checkIn).getTime();
    const co = stripTimeLocal(checkOut).getTime();

    return dd >= ci && dd <= co;
  }

  function isEdge(d: Date) {
    return (checkIn && isSameDay(d, checkIn)) || (checkOut && isSameDay(d, checkOut));
  }

  const checkInStr = checkIn ? checkIn.toLocaleDateString(lang === "it" ? "it-IT" : "en-US") : "";
  const checkOutStr = checkOut ? checkOut.toLocaleDateString(lang === "it" ? "it-IT" : "en-US") : "";

  const showAskBtn = Boolean(checkIn && checkOut);

  async function sendAvailabilityRequest() {
    if (!checkIn || !checkOut) return;

    const fn = firstName.trim();
    const ln = lastName.trim();
    const ct = contact.trim();

    if (!fn || !ln || !ct) {
      setSendMsg(lang === "it" ? "Compila tutti i campi." : "Please fill all fields.");
      return;
    }

    setSending(true);
    setSendMsg("");

    try {
      const payload = {
        lang,
        firstName: fn,
        lastName: ln,
        contact: ct,
        checkInISO: isoDateInTZ(checkIn, tz),
        checkOutISO: isoDateInTZ(checkOut, tz),
        guests
      };

      const res = await fetch("/api/ask-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (!res.ok) {
        setSendMsg(json?.error || (lang === "it" ? "Errore invio." : "Send error."));
        return;
      }

      setSendMsg(lang === "it" ? "Richiesta inviata." : "Request sent.");
    } catch (e: any) {
      setSendMsg(String(e?.message || e));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left: Calendar */}
        <div className="lg:col-span-7">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
            {lang === "it" ? "Seleziona le date" : "Select Dates"}
          </h2>

          <p className="text-gray-600 font-light leading-relaxed mb-6 text-lg">
            {lang === "it"
              ? "Scegli arrivo e partenza per vedere le date disponibili."
              : "Choose check-in and check-out to see available dates."}
          </p>

          <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl capitalize">{monthLabel}</h3>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMonth((m) => addMonths(m, -1))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Previous month"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMonth((m) => addMonths(m, 1))}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Next month"
                >
                  <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </div>
            </div>

            {uiError ? (
              <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-sm px-4 py-3">
                {uiError}
              </div>
            ) : null}

            <div className="grid grid-cols-7 mb-4">
              {weekdayLabels.map((w) => (
                <div key={w} className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 py-2">
                  {w}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-2 gap-x-1">
              {gridDays.map((d) => {
                const inMonth = d.getMonth() === month.getMonth();
                const unavailable = isUnavailable(d);
                const tooEarly = isTooEarly(d);
                const disabled = unavailable || tooEarly;

                const inRange = isInSelectedRange(d);
                const edge = isEdge(d);
                const onlyCheckIn = checkIn && !checkOut && isSameDay(d, checkIn);

                const base = "h-12 flex items-center justify-center text-sm transition-colors select-none";
                const muted = inMonth ? "text-charcoal" : "text-gray-300";
                const clickable = !disabled ? "cursor-pointer" : "cursor-not-allowed";
                const hover = !disabled ? "hover:bg-olive hover:text-white" : "";

                const unavailableCls = unavailable ? "bg-red-50 text-red-500 line-through rounded-full" : "";
                const tooEarlyCls = tooEarly ? "text-gray-200" : "";

                // Range is soft olive, edges are solid olive
                const rangeCls = inRange ? "bg-olive/20" : "";
                const edgeCls = edge ? "bg-olive text-white rounded-full" : "";
                const singleCheckInCls = onlyCheckIn ? "bg-olive text-white rounded-full" : "";

                return (
                  <div
                    key={dayKeyLocal(d)}
                    onClick={() => {
                      if (disabled) return;

                      // allow selecting days in adjacent month by jumping to that month
                      if (!inMonth) setMonth(startOfMonth(d));

                      onPickDate(d);
                    }}
                    className={[base, muted, clickable, hover, tooEarlyCls, unavailableCls, rangeCls, singleCheckInCls, edgeCls].join(" ")}
                    title={isoDateInTZ(d, tz)}
                  >
                    {d.getDate()}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-6 mt-8 border-t border-gray-100 pt-6 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-gray-300 bg-white" />
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  {lang === "it" ? "Disponibile" : "Available"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-olive" />
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  {lang === "it" ? "Selezionato" : "Selected"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-200" />
                <span className="text-xs uppercase tracking-wider text-gray-500">
                  {lang === "it" ? "Non disponibile" : "Unavailable"}
                </span>
              </div>

              {loading ? (
                <div className="text-xs uppercase tracking-wider text-gray-400">
                  {lang === "it" ? "Caricamento..." : "Loading..."}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right: Summary + actions */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-32 bg-white rounded-lg p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100">
            <div className="mb-10 text-center border-b border-gray-100 pb-6">
              <span className="material-symbols-outlined text-4xl text-olive mb-4">calendar_month</span>
              <h2 className="font-serif text-3xl text-charcoal">
                {lang === "it" ? "Disponibilità" : "Availability"}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                    {lang === "it" ? "Arrivo" : "Check In"}
                  </label>
                  <input
                    className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-charcoal placeholder-gray-300 font-serif text-lg"
                    placeholder={lang === "it" ? "Seleziona" : "Select"}
                    value={checkInStr}
                    readOnly
                  />
                </div>

                <div className="group">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                    {lang === "it" ? "Partenza" : "Check Out"}
                  </label>
                  <input
                    className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-charcoal placeholder-gray-300 font-serif text-lg"
                    placeholder={lang === "it" ? "Seleziona" : "Select"}
                    value={checkOutStr}
                    readOnly
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                  {lang === "it" ? "Ospiti" : "Guests"}
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full border-0 border-b border-gray-200 bg-transparent px-0 py-2 text-charcoal font-serif text-lg cursor-pointer"
                >
                  <option>{lang === "it" ? "1 Ospite" : "1 Guest"}</option>
                  <option>{lang === "it" ? "2 Ospiti" : "2 Guests"}</option>
                  <option>{lang === "it" ? "3 Ospiti" : "3 Guests"}</option>
                  <option>{lang === "it" ? "4 Ospiti" : "4 Guests"}</option>
                </select>
              </div>

              {(checkIn || checkOut) && (
                <button
                  type="button"
                  onClick={resetSelection}
                  className="w-full bg-white text-charcoal py-4 text-xs font-bold uppercase tracking-[0.2em] border border-gray-200 hover:border-olive hover:text-olive transition-all duration-300 rounded-sm"
                >
                  {lang === "it" ? "Azzera selezione" : "Clear selection"}
                </button>
              )}

              {showAskBtn && (
                <button
                  type="button"
                  onClick={() => {
                    setSendMsg("");
                    setShowModal(true);
                  }}
                  className="w-full bg-charcoal text-white py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-olive transition-all duration-500 rounded-sm"
                >
                  {lang === "it" ? "Chiedi disponibilità" : "Ask availability"}
                </button>
              )}

              {!showAskBtn && (
                <p className="text-center text-[11px] text-gray-400">
                  {lang === "it" ? "Seleziona prima arrivo e poi partenza." : "Select check-in first, then check-out."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => !sending && setShowModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-lg border border-gray-100 shadow-2xl p-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl text-charcoal">
                  {lang === "it" ? "Richiedi disponibilità" : "Request availability"}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {lang === "it" ? "Inserisci i tuoi dati e ti contatteremo." : "Enter your details and we will get back to you."}
                </p>
              </div>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => !sending && setShowModal(false)}
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                  {lang === "it" ? "Nome" : "First name"}
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full text-sm border-gray-200 focus:border-olive focus:ring-0 py-3 px-3 rounded-sm bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                  {lang === "it" ? "Cognome" : "Last name"}
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full text-sm border-gray-200 focus:border-olive focus:ring-0 py-3 px-3 rounded-sm bg-gray-50"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                {lang === "it" ? "Contatto (email o telefono)" : "Contact (email or phone)"}
              </label>
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full text-sm border-gray-200 focus:border-olive focus:ring-0 py-3 px-3 rounded-sm bg-gray-50"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full bg-white text-charcoal py-4 text-xs font-bold uppercase tracking-[0.2em] border border-gray-200 hover:border-olive hover:text-olive transition-all rounded-sm"
                onClick={() => !sending && setShowModal(false)}
                disabled={sending}
              >
                {lang === "it" ? "Annulla" : "Cancel"}
              </button>

              <button
                type="button"
                disabled={sending}
                onClick={sendAvailabilityRequest}
                className="w-full bg-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-olive transition-all duration-500 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (lang === "it" ? "Invio..." : "Sending...") : (lang === "it" ? "Invia" : "Send")}
              </button>
            </div>

            {sendMsg && (
              <div className="mt-4 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-sm px-4 py-3">
                {sendMsg}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
