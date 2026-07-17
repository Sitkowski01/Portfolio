"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TerminalIcon } from "./Icons";
import { useTr } from "./i18n";

type Command = {
  keyword: string;
  label: { pl: string; en: string };
  hint: string;
  action: () => void;
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  // Pozycja z łańcucha offsetParent — ignoruje transform z animacji .reveal,
  // przez który scrollIntoView celował 30px za nisko
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  window.scrollTo({ top: Math.max(0, top - 72), behavior: "smooth" });
};

const COMMANDS: Command[] = [
  {
    keyword: "top",
    label: { pl: "Start / Góra strony", en: "Start / Top" },
    hint: "scroll top",
    action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  },
  {
    keyword: "skills",
    label: { pl: "Tech Stack / Umiejętności", en: "Tech Stack / Skills" },
    hint: "goto #keyboard",
    action: () => scrollTo("keyboard"),
  },
  {
    keyword: "profile",
    label: { pl: "Profil firmy / Fundamenty", en: "Company Profile / Fundamentals" },
    hint: "goto #profile",
    action: () => scrollTo("profile"),
  },
  {
    keyword: "projects",
    label: { pl: "Zobacz projekty", en: "View projects" },
    hint: "goto #holdings",
    action: () => scrollTo("holdings"),
  },
  {
    keyword: "experience",
    label: { pl: "Track Record / Doświadczenie", en: "Track Record / Experience" },
    hint: "goto #track-record",
    action: () => scrollTo("track-record"),
  },
  {
    keyword: "interests",
    label: { pl: "Zainteresowania / Hobby", en: "Interests / Hobbies" },
    hint: "goto #interests",
    action: () => scrollTo("interests"),
  },
  {
    keyword: "ratings",
    label: { pl: "Rekomendacje / Opinie", en: "Recommendations / Reviews" },
    hint: "goto #ratings",
    action: () => scrollTo("ratings"),
  },
  {
    keyword: "contact",
    label: { pl: "Kontakt / Czego szukam", en: "Contact / What I want" },
    hint: "goto #contact-cta",
    action: () => scrollTo("contact-cta"),
  },
  {
    keyword: "email",
    label: { pl: "Wyślij email", en: "Send email" },
    hint: "mailto",
    action: () => {
      window.location.href = "mailto:sitekmikolaj01@gmail.com";
    },
  },
  {
    keyword: "cv",
    label: { pl: "Wyświetl CV", en: "View CV" },
    hint: "open /CV_Mikołaj_Sitek.pdf",
    action: () => {
      window.open("/CV_Mikołaj_Sitek.pdf", "_blank");
    },
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const tr = useTr();

  // Dotyk: chip to zwykły przycisk menu (bez podpowiedzi klawiszowych),
  // a paleta nie łapie autofocusa — inaczej klawiatura systemowa
  // zasłaniałaby listę komend. Start = false (zgodny z SSR).
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const filtered = COMMANDS.filter(
    (c) =>
      c.keyword.includes(query.toLowerCase()) ||
      tr(c.label.pl, c.label.en).toLowerCase().includes(query.toLowerCase())
  );

  const openPalette = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelected(0);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelected(0);
          }
          return !prev;
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (open && !isTouch) inputRef.current?.focus();
  }, [open, isTouch]);

  const run = (cmd: Command) => {
    setOpen(false);
    cmd.action();
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && filtered[selected]) {
      e.preventDefault();
      run(filtered[selected]);
    }
  };

  return (
    <>
      {/* Hint chip — discoverability */}
      <button
        onClick={openPalette}
        className="fixed bottom-5 right-5 z-40 glass-panel border border-terminal-border rounded-lg h-9 px-3.5 font-mono text-xs text-terminal-text hover:text-bull hover:border-bull/50 transition-colors flex items-center gap-2 cursor-pointer shadow-panel"
        aria-label={
          isTouch
            ? tr("Otwórz menu nawigacji", "Open navigation menu")
            : tr("Otwórz panel komend (Ctrl+K)", "Open command palette (Ctrl+K)")
        }
      >
        <TerminalIcon className="w-4 h-4" />
        {isTouch ? (
          <span className="uppercase tracking-wider">Menu</span>
        ) : (
          <>
            <span className="hidden sm:inline uppercase tracking-wider">
              Terminal
            </span>
            <kbd className="px-1.5 py-0.5 bg-terminal-bg border border-terminal-border rounded text-[0.65rem]">
              Ctrl+K
            </kbd>
          </>
        )}
      </button>

      {/* Palette overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[90] bg-terminal-bg/70 backdrop-blur-sm flex items-start justify-center pt-[18vh] px-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={tr("Panel komend", "Command palette")}
        >
          <div
            className="w-full max-w-lg glass-panel border border-terminal-border rounded-xl shadow-panel overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-terminal-border font-mono">
              <span className="text-bull font-bold shrink-0">msx&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelected(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder={tr(
                  "wpisz komendę... (projects, contact, cv)",
                  "type a command... (projects, contact, cv)"
                )}
                className="flex-1 bg-transparent outline-none text-terminal-highlight placeholder:text-terminal-text/40 text-sm"
                aria-label={tr("Komenda", "Command")}
              />
              {!isTouch && (
                <kbd className="px-1.5 py-0.5 bg-terminal-bg border border-terminal-border rounded text-[0.65rem] text-terminal-text shrink-0">
                  ESC
                </kbd>
              )}
            </div>

            {/* Results */}
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 font-mono text-sm text-terminal-text text-center">
                  command not found:{" "}
                  <span className="text-bear">{query}</span>
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.keyword}
                    onClick={() => run(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 font-mono text-[0.8rem] sm:text-sm text-left cursor-pointer transition-colors ${
                      i === selected
                        ? "bg-bull/10 text-terminal-highlight"
                        : "text-terminal-text"
                    }`}
                  >
                    <span
                      className={`shrink-0 text-bull ${i === selected ? "opacity-100" : "opacity-0"}`}
                    >
                      ▸
                    </span>
                    <span className="flex-1 min-w-0">
                      {tr(cmd.label.pl, cmd.label.en)}
                    </span>
                    <span className="hidden sm:block shrink-0 text-xs text-terminal-text/50">
                      {cmd.hint}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
