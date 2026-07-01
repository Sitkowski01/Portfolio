"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import { GithubIcon } from "./Icons";
import type { Project } from "./Projects";
import { useTr } from "./i18n";

const AUTOPLAY_MS = 3500;

// Mono-etykieta sekcji case study: indeks + tytuł + hairline
function FieldLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[0.6rem] font-bold text-bull/80">{n}</span>
      <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-terminal-text/55">
        {children}
      </span>
      <span className="flex-1 h-px bg-gradient-to-r from-terminal-border to-transparent" />
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const images = project.images;
  const reduce = useReducedMotion();
  const tr = useTr();

  const title = tr(project.title.pl, project.title.en);

  // Adres w pasku „okna przeglądarki" — domena dla live'ów, kategoria dla konceptów
  let addressLabel = tr(project.category.pl, project.category.en);
  if (project.demoUrl.startsWith("http")) {
    try {
      addressLabel = new URL(project.demoUrl).hostname.replace(/^www\./, "");
    } catch {
      /* zostaw kategorię */
    }
  }

  // Wejście: fade + delikatne podniesienie/scale; wyjście szybsze (responsywne)
  const panelInitial = reduce
    ? { opacity: 0 }
    : { opacity: 0, y: 24, scale: 0.97 };
  const panelAnimate = reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 };

  // ESC zamyka, scroll strony zablokowany
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && images.length > 1)
        setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft" && images.length > 1)
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    // Blokada scrolla + kompensacja szerokości paska — bez tego strona
    // przeskakuje w bok, gdy pionowy scrollbar znika/wraca.
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [onClose, images.length]);

  // Autoplay — restartuje się po każdej zmianie slajdu
  useEffect(() => {
    if (images.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % images.length),
      AUTOPLAY_MS
    );
    return () => clearTimeout(id);
  }, [index, images.length]);

  // Portal do <body> — rodzice z transformem (np. .reveal) psują position:fixed
  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={tr(`Szczegóły projektu ${title}`, `${title} — project details`)}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-terminal-bg/85 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      ></motion.div>

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-5xl max-h-[92vh] lg:h-[88vh] flex flex-col overflow-hidden glass-panel border border-terminal-border rounded-2xl shadow-panel"
        initial={panelInitial}
        animate={panelAnimate}
        exit={panelInitial}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Pasek tytułu */}
        <div className="shrink-0 z-20 flex items-center gap-3 px-5 py-3 border-b border-terminal-border bg-terminal-bg/95 backdrop-blur-sm">
          {project.logo && (
            <img
              src={project.logo}
              alt=""
              className="w-7 h-7 rounded-lg border border-terminal-border"
            />
          )}
          <span className="font-mono font-bold text-terminal-highlight">
            {project.ticker}
          </span>
          <span className="font-mono text-bull text-xs bg-bull/10 px-2 py-0.5 rounded border border-bull/30">
            {tr(project.change.pl, project.change.en)}
          </span>
          <span className="hidden sm:inline font-mono text-xs text-terminal-text/60 uppercase tracking-wider">
            {tr(project.category.pl, project.category.en)}
          </span>
          <button
            onClick={onClose}
            aria-label="Zamknij"
            className="ml-auto w-8 h-8 rounded-lg border border-terminal-border text-terminal-text hover:text-bear hover:border-bear/50 transition-colors cursor-pointer font-mono"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 p-5 sm:p-6 flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
          {/* Pokaz slajdów — w ramce „okna" dla efektu prezentacji */}
          <div className="flex flex-col gap-3 lg:w-[58%] lg:h-full lg:min-h-0">
            <div className="flex flex-col lg:flex-1 lg:min-h-0 rounded-xl overflow-hidden border border-terminal-border bg-terminal-panel shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]">
              {/* Pasek chrome: kropki + adres + licznik */}
              <div className="flex items-center gap-2 px-3 py-2 border-b border-terminal-border bg-terminal-bg/70">
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-bear/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-terminal-highlight/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-bull/70" />
                </span>
                <span className="mx-auto max-w-[60%] truncate font-mono text-[0.62rem] text-terminal-text/60">
                  {addressLabel}
                </span>
                {images.length > 1 && (
                  <span className="font-mono text-[0.62rem] text-terminal-text/60 tabular-nums">
                    {index + 1}/{images.length}
                  </span>
                )}
              </div>

              {/* Scena — wypełnia całą wysokość okna na desktopie */}
              <div className="relative w-full h-[42vh] lg:h-auto lg:flex-1 lg:min-h-0 bg-terminal-bg">
              <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

              {images.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-mono text-3xl font-bold text-terminal-border select-none">
                    {project.ticker}
                  </span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-terminal-text/40">
                    [ awaiting_screenshots ]
                  </span>
                </div>
              ) : (
                <>
                  {/* Crossfade — wszystkie slajdy w stosie */}
                  {images.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={tr(
                        `${title} — zrzut ekranu ${i + 1} z ${images.length}`,
                        `${title} — screenshot ${i + 1} of ${images.length}`
                      )}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-contain p-2 transition-all duration-700 ease-out ${
                        i === index
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 pointer-events-none"
                      }`}
                    />
                  ))}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setIndex((i) => (i - 1 + images.length) % images.length)
                        }
                        aria-label="Poprzedni screenshot"
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-terminal-bg/80 border border-terminal-border text-terminal-highlight text-lg flex items-center justify-center cursor-pointer hover:border-bull hover:text-bull transition-colors"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setIndex((i) => (i + 1) % images.length)}
                        aria-label="Następny screenshot"
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-terminal-bg/80 border border-terminal-border text-terminal-highlight text-lg flex items-center justify-center cursor-pointer hover:border-bull hover:text-bull transition-colors"
                      >
                        ›
                      </button>
                    </>
                  )}
                </>
              )}
              </div>
            </div>

            {/* Kropki */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2">
                {images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIndex(i)}
                    aria-label={`Screenshot ${i + 1}`}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                      i === index
                        ? "w-6 bg-bull"
                        : "w-1.5 bg-terminal-border hover:bg-terminal-text"
                    }`}
                  ></button>
                ))}
              </div>
            )}
          </div>

          {/* Szczegóły — układ case study; przewija się tylko treść, przyciski zostają */}
          <div className="flex flex-col lg:w-[42%] lg:h-full lg:min-h-0">
           <div className="flex flex-col lg:flex-1 lg:min-h-0 lg:overflow-y-auto lg:pr-2 [scrollbar-width:thin]">
            {/* Nagłówek: kicker + tytuł */}
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-bull/80 mb-2">
              {tr(project.category.pl, project.category.en)}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
              {title}
            </h3>

            {/* 01 — Overview */}
            <FieldLabel n="01">{tr("Przegląd", "Overview")}</FieldLabel>
            <p className="text-terminal-text text-sm sm:text-[0.95rem] leading-relaxed mb-5">
              {tr(project.description.pl, project.description.en)}
            </p>

            {/* 02 — Kluczowe funkcje */}
            {project.highlights && (
              <>
                <FieldLabel n="02">{tr("Kluczowe funkcje", "Key features")}</FieldLabel>
                <ul className="flex flex-col mb-5">
                  {project.highlights.map((h, i) => (
                    <li
                      key={h.pl}
                      className="group/hl flex items-start gap-3 py-2 border-b border-terminal-border/40 last:border-b-0 text-sm text-terminal-text"
                    >
                      <span className="font-mono text-[0.7rem] font-bold text-bull/70 tabular-nums pt-0.5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{tr(h.pl, h.en)}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* 03 — Metryki */}
            {project.stats && (
              <>
                <FieldLabel n="03">{tr("Metryki", "Metrics")}</FieldLabel>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {project.stats.map((stat) => (
                    <div
                      key={stat.label.pl}
                      className="relative overflow-hidden bg-terminal-bg/60 border border-terminal-border rounded-lg px-4 py-2.5"
                    >
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-bull/60" />
                      <div className="font-mono text-[0.6rem] uppercase tracking-wider text-terminal-text/55 mb-1.5">
                        {tr(stat.label.pl, stat.label.en)}
                      </div>
                      <div className="font-mono text-base font-bold text-terminal-highlight">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* 04 — Stack */}
            <FieldLabel n={project.stats ? "04" : project.highlights ? "03" : "02"}>
              Stack
            </FieldLabel>
            <div className="flex flex-wrap gap-2 font-mono text-xs text-terminal-text mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-terminal-bg border border-terminal-border px-2 py-1 rounded transition-colors hover:border-bull/50 hover:text-terminal-highlight"
                >
                  {tag}
                </span>
              ))}
            </div>
           </div>

            {/* Stopka z akcjami — poza scrollem, zawsze widoczna */}
            <div className="shrink-0 grid grid-cols-2 gap-3 pt-4 mt-3 border-t border-terminal-border/60 font-mono text-sm uppercase tracking-wider">
              {project.demoUrl === "#" ? (
                // Brak działającego linku (np. „W trakcie", koncept) — status, nie martwy przycisk
                <span className="bg-terminal-bg border border-terminal-border text-terminal-text py-3 rounded text-center flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-terminal-text/50" />
                  {project.demoLabel
                    ? tr(project.demoLabel.pl, project.demoLabel.en)
                    : tr("W trakcie", "In progress")}
                </span>
              ) : (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={project.demoUrl.endsWith(".pdf") ? "" : undefined}
                  className="bg-bull border border-bull text-[#030712] font-bold py-3 rounded transition-all hover:bg-[#00e68a] hover:shadow-neon-green-intense text-center"
                >
                  {project.demoLabel
                    ? tr(project.demoLabel.pl, project.demoLabel.en)
                    : tr("Live Demo", "Live Demo")}
                </a>
              )}
              <a
                href={project.githubUrl}
                target={project.githubUrl === "#" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="bg-terminal-bg border border-terminal-border text-terminal-highlight py-3 rounded transition-colors hover:border-terminal-text flex items-center justify-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}
