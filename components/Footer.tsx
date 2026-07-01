"use client";

import { useTr } from "./i18n";

export default function Footer() {
  const tr = useTr();
  return (
    <footer className="border-t border-terminal-border bg-terminal-bg py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 text-center text-terminal-text font-mono text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>SYSTEM TERMINAL v2.0.26</p>
        <p>
          © 2026 MIKOŁAJ SITEK.{" "}
          {tr("WSZELKIE PRAWA ZASTRZEŻONE.", "ALL RIGHTS RESERVED.")}
        </p>
        <p className="text-bull">
          <span className="mr-2">●</span>{" "}
          {tr("POŁĄCZENIE BEZPIECZNE", "CONNECTION SECURE")}
        </p>
      </div>
    </footer>
  );
}
