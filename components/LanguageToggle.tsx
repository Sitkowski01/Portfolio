"use client";

import { useLang } from "./i18n";

export default function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div
      className="flex items-center h-full px-3 gap-1 bg-terminal-bg border-l border-terminal-border font-mono text-xs shrink-0 relative z-10"
      role="group"
      aria-label="Język / Language"
    >
      <button
        onClick={() => setLang("pl")}
        aria-pressed={lang === "pl"}
        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
          lang === "pl"
            ? "text-bull font-bold"
            : "text-terminal-text/50 hover:text-terminal-text"
        }`}
      >
        PL
      </button>
      <span className="text-terminal-border">/</span>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
          lang === "en"
            ? "text-bull font-bold"
            : "text-terminal-text/50 hover:text-terminal-text"
        }`}
      >
        EN
      </button>
    </div>
  );
}
