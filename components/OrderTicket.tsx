"use client";

import { useTr } from "./i18n";

// Karta „order ticket" — czego szukam (Position Open). Osadzana w sekcji Contact.
// ── EDYTUJ TUTAJ ──────────────────────────────────────────────
const TICKET = {
  asset: "$MIKOLAJ",
  side: "BUY",
  rows: [
    { k: { pl: "Rola", en: "Role" }, v: { pl: "Fullstack Developer · Web & Mobile", en: "Fullstack Developer · Web & Mobile" } },
    { k: { pl: "Stack", en: "Stack" }, v: { pl: "React · React Native · Next.js · Node", en: "React · React Native · Next.js · Node" } },
    { k: { pl: "Tryb", en: "Mode" }, v: { pl: "Zdalnie · Hybryda · Szczecin / Poznań", en: "Remote · Hybrid · Szczecin / Poznań" } },
    { k: { pl: "Typ", en: "Type" }, v: { pl: "Etat · B2B · Kontrakt", en: "Full-time · B2B · Contract" } },
    { k: { pl: "Języki", en: "Languages" }, v: { pl: "PL · EN (C1) · ES (A1)", en: "PL · EN (C1) · ES (A1)" } },
    { k: { pl: "Dostępność", en: "Availability" }, v: { pl: "Otwarty na rozmowy", en: "Open to talk" } },
  ],
};
// ──────────────────────────────────────────────────────────────

export default function OrderTicket() {
  const tr = useTr();
  return (
    <div className="glass-panel border border-bull/30 rounded-xl shadow-neon-green overflow-hidden font-mono text-left">
      {/* Pasek nagłówka */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-terminal-border bg-terminal-bg/60">
        <span className="text-sm font-bold text-terminal-highlight">
          {TICKET.asset}
        </span>
        <span className="text-[0.55rem] uppercase tracking-widest text-[#030712] bg-bull font-bold px-2 py-0.5 rounded">
          {TICKET.side}
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[0.65rem] uppercase tracking-widest text-bull">
          <span className="w-1.5 h-1.5 rounded-full bg-bull cursor-blink" />
          {tr("Pozycja otwarta", "Position Open")}
        </span>
      </div>

      {/* Pola zlecenia */}
      <div className="divide-y divide-terminal-border/50">
        {TICKET.rows.map((r) => (
          <div
            key={r.k.pl}
            className="flex flex-col items-start gap-0.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3 hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-terminal-text/60 shrink-0">
              {tr(r.k.pl, r.k.en)}
            </span>
            <span className="text-[0.72rem] sm:text-sm text-terminal-highlight text-left sm:text-right leading-snug">
              {tr(r.v.pl, r.v.en)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
