"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Lang = "pl" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Start na "pl" (zgodnie z SSR) — po montażu ewentualnie przełącz z localStorage,
  // żeby uniknąć niezgodności hydracji.
  const [lang, setLangState] = useState<Lang>("pl");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "pl" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {
      /* prywatny tryb / brak dostępu — ignoruj */
    }
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "pl" ? "en" : "pl"),
    [lang, setLang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback poza providerem — zawsze polski, no-op na zmiany.
    return { lang: "pl", setLang: () => {}, toggle: () => {} };
  }
  return ctx;
}

/**
 * Hook tłumaczący: `const tr = useTr(); tr("Polski", "English")`.
 * Zwraca wersję zależną od aktualnego języka.
 */
export function useTr() {
  const { lang } = useLang();
  return function tr<T>(pl: T, en: T): T {
    return lang === "en" ? en : pl;
  };
}
