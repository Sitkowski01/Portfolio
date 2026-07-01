import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Formularz kontaktowy → wysyłka przez SMTP skrzynki (Hostline) na CONTACT_TO.
// Konfiguracja w .env.local (i w panelu hostingu/Vercel):
//   SMTP_HOST=mail.mjgweb.pl  SMTP_PORT=465  SMTP_USER=mikolaj@mjgweb.pl
//   SMTP_PASS=<hasło skrzynki>  CONTACT_TO=mikolaj@mjgweb.pl

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Nieprawidłowe dane." }, { status: 400 });
  }

  const { name, email, message, company } = (data ?? {}) as Record<string, string>;

  // Honeypot — boty wypełniają ukryte pole „company"
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const cleanName = (name ?? "").trim();
  const cleanEmail = (email ?? "").trim();
  const cleanMessage = (message ?? "").trim();

  if (cleanName.length < 2 || cleanName.length > 120) {
    return NextResponse.json({ ok: false, error: "Podaj imię / nazwę." }, { status: 400 });
  }
  if (!EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ ok: false, error: "Podaj poprawny e-mail." }, { status: 400 });
  }
  if (cleanMessage.length < 5 || cleanMessage.length > 5000) {
    return NextResponse.json({ ok: false, error: "Wiadomość jest za krótka." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST || "mail.mjgweb.pl";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || "mikolaj@mjgweb.pl";

  if (!user || !pass) {
    console.error("Brak SMTP_USER / SMTP_PASS w env.");
    return NextResponse.json(
      { ok: false, error: "Formularz nie jest jeszcze skonfigurowany." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Portfolio — kontakt" <${user}>`,
      to,
      replyTo: `"${cleanName}" <${cleanEmail}>`,
      subject: `Portfolio: wiadomość od ${cleanName}`,
      text: `Od: ${cleanName} <${cleanEmail}>\n\n${cleanMessage}`,
      html: `
        <div style="font-family:system-ui,Arial,sans-serif;font-size:15px;color:#0f172a">
          <p><strong>Od:</strong> ${escapeHtml(cleanName)} &lt;${escapeHtml(cleanEmail)}&gt;</p>
          <hr style="border:none;border-top:1px solid #e2e8f0" />
          <p style="white-space:pre-wrap">${escapeHtml(cleanMessage)}</p>
        </div>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Błąd wysyłki maila:", err);
    return NextResponse.json(
      { ok: false, error: "Nie udało się wysłać. Spróbuj ponownie lub napisz bezpośrednio." },
      { status: 502 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
