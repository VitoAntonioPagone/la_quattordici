import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
  lang?: "it" | "en";
  firstName: string;
  lastName: string;
  contact: string; // email or phone
  checkInISO: string; // YYYY-MM-DD
  checkOutISO: string; // YYYY-MM-DD
  guests: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function isPhone(v: string) {
  // simple permissive check
  const cleaned = v.trim().replace(/[\s()-]/g, "");
  return /^[+]?[\d]{6,}$/.test(cleaned);
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<Payload>;

    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const contact = (body.contact || "").trim();
    const checkInISO = (body.checkInISO || "").trim();
    const checkOutISO = (body.checkOutISO || "").trim();
    const guests = (body.guests || "").trim();
    const lang = body.lang === "it" ? "it" : "en";

    if (!firstName || !lastName || !contact || !checkInISO || !checkOutISO || !guests) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!isEmail(contact) && !isPhone(contact)) {
      return NextResponse.json({ error: "Invalid contact" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || "465");
    const secure = String(process.env.SMTP_SECURE || "true") === "true";
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.EMAIL_TO || user;
    const fromName = process.env.EMAIL_FROM_NAME || "La Quattordici";

    if (!host || !user || !pass || !to) {
      return NextResponse.json({ error: "SMTP not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    const fullName = `${firstName} ${lastName}`.trim();
    const subject =
      lang === "it"
        ? `Richiesta disponibilità: ${fullName} (${checkInISO} → ${checkOutISO})`
        : `Availability request: ${fullName} (${checkInISO} → ${checkOutISO})`;

    const html = `
      <div style="font-family: Arial, sans-serif; background:#f7f7f7; padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #eee;border-radius:12px;overflow:hidden;">
          <div style="padding:18px 22px;border-bottom:1px solid #eee;">
            <div style="font-size:14px;color:#777;letter-spacing:0.08em;text-transform:uppercase;">
              ${lang === "it" ? "Richiesta disponibilità" : "Availability request"}
            </div>
            <div style="font-size:20px;font-weight:700;color:#111;margin-top:6px;">
              ${escapeHtml(fullName)}
            </div>
          </div>

          <div style="padding:18px 22px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr>
                <td style="padding:10px 0;color:#666;width:40%;">${lang === "it" ? "Arrivo" : "Check-in"}</td>
                <td style="padding:10px 0;color:#111;font-weight:600;">${escapeHtml(checkInISO)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666;">${lang === "it" ? "Partenza" : "Check-out"}</td>
                <td style="padding:10px 0;color:#111;font-weight:600;">${escapeHtml(checkOutISO)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666;">${lang === "it" ? "Ospiti" : "Guests"}</td>
                <td style="padding:10px 0;color:#111;font-weight:600;">${escapeHtml(guests)}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#666;">${lang === "it" ? "Contatto" : "Contact"}</td>
                <td style="padding:10px 0;color:#111;font-weight:600;">${escapeHtml(contact)}</td>
              </tr>
            </table>

            <div style="margin-top:14px;font-size:12px;color:#888;">
              ${lang === "it" ? "Messaggio generato dal sito La Quattordici." : "Sent from La Quattordici website."}
            </div>
          </div>
        </div>
      </div>
    `;

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${fromName}" <${user}>`,
      to,
      subject,
      html
    };

    // If the user provided an email, set Reply-To so you can reply directly
    if (isEmail(contact)) {
      mailOptions.replyTo = contact;
    }

    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json({ ok: true, messageId: info.messageId });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ? String(e.message) : "Unknown error" },
      { status: 500 }
    );
  }
}
