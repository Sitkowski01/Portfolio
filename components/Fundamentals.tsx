"use client";

import { useEffect, useId, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import { useTr } from "./i18n";
import {
  BriefcaseIcon,
  CpuIcon,
  GithubIcon,
  TerminalIcon,
} from "./Icons";

// Brakująca ikona „warstwy" (projekty) — styl Lucide
function LayersIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-5 h-5"}
      aria-hidden="true"
    >
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  );
}

// ── EDYTUJ TUTAJ ──────────────────────────────────────────────
const TICKER = "$MKSITEK";

const HERO = {
  value: 4,
  suffix: "+",
  label: { pl: "Lata kodowania", en: "Years coding" },
  sub: { pl: "od 2021 · web · mobile · AI", en: "since 2021 · web · mobile · AI" },
  icon: <TerminalIcon className="w-6 h-6" />,
};

// kamienie milowe
const JOURNEY: { year: { pl: string; en: string }; text: { pl: string; en: string } }[] = [
  { year: { pl: "2021", en: "2021" }, text: { pl: "Start kodowania", en: "Started coding" } },
  { year: { pl: "2023", en: "2023" }, text: { pl: "Staże — Raven, GlobalLogic", en: "Internships — Raven, GlobalLogic" } },
  { year: { pl: "teraz", en: "now" }, text: { pl: "Specjalista IT @ Leroy Merlin", en: "IT Specialist @ Leroy Merlin" } },
];

type Stat = {
  value: number;
  suffix?: string;
  label: { pl: string; en: string };
  sub: { pl: string; en: string };
  icon: React.ReactNode;
  href?: string;
};

const STATS: Stat[] = [
  { value: 10, label: { pl: "Projekty", en: "Projects" }, sub: { pl: "6 zbudowanych", en: "6 shipped" }, icon: <LayersIcon className="w-4 h-4" /> },
  { value: 3, label: { pl: "Staże / prace", en: "Internships / jobs" }, sub: { pl: "Leroy · GL · Raven", en: "Leroy · GL · Raven" }, icon: <BriefcaseIcon className="w-4 h-4" /> },
  { value: 15, suffix: "+", label: { pl: "Technologie", en: "Technologies" }, sub: { pl: "Front · Back · AI", en: "Front · Back · AI" }, icon: <CpuIcon className="w-4 h-4" /> },
  { value: 30, suffix: "+", label: { pl: "Repozytoria", en: "Repositories" }, sub: { pl: "sitkowski01", en: "sitkowski01" }, icon: <GithubIcon className="w-4 h-4" />, href: "https://github.com/sitkowski01" },
];

// przebieg wielkiego wykresu tła (zmienny trend w górę)
const CHART = [
  8, 11, 9, 13, 15, 14, 18, 16, 21, 24, 22, 27,
  30, 28, 34, 37, 35, 41, 45, 43, 50, 54, 52, 60,
];
// ──────────────────────────────────────────────────────────────

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({ target, play }: { target: number; play: boolean }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!play) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const duration = 1300;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [play, target]);
  return <>{value}</>;
}

// Wielki animowany wykres tła — rysuje linię + wypełnia gradientem
function ChartBackdrop({ play }: { play: boolean }) {
  const id = useId().replace(/:/g, "");
  const w = 1000;
  const h = 320;
  const max = Math.max(...CHART);
  const min = Math.min(...CHART);
  const range = max - min || 1;
  const pts = CHART.map((d, i) => {
    const x = (i / (CHART.length - 1)) * w;
    const y = 24 + (1 - (d - min) / range) * (h - 60);
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full text-bull"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`fill-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* pionowe linie siatki */}
      {Array.from({ length: 11 }).map((_, i) => (
        <line
          key={i}
          x1={(i / 10) * w}
          y1="0"
          x2={(i / 10) * w}
          y2={h}
          stroke="currentColor"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
      ))}
      <path
        d={area}
        fill={`url(#fill-${id})`}
        style={{ opacity: play ? 1 : 0, transition: "opacity 1s ease 400ms" }}
      />
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: play ? 0 : 1,
          transition: "stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)",
          filter: "drop-shadow(0 0 6px rgba(16,185,129,0.5))",
        }}
      />
    </svg>
  );
}

export default function Fundamentals() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const tr = useTr();

  return (
    <section id="fundamentals" className="reveal">
      <SectionHeader
        label={tr("Kluczowe statystyki", "Key Statistics")}
        title={tr("Fundamenty", "Fundamentals")}
      />

      {/* animacje lokalne — bez ruszania globalnej konfiguracji */}
      <style>{`
        @keyframes fund-scan { 0% { transform: translateY(-120%); } 100% { transform: translateY(720%); } }
        @keyframes fund-flicker { 0%,100% { opacity: .05; } 50% { opacity: .12; } }
        @keyframes fund-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
        @media (prefers-reduced-motion: reduce) {
          .fund-scan-bar { animation: none !important; display: none; }
          .fund-caret { animation: none !important; }
        }
      `}</style>

      <div
        ref={ref}
        className="relative overflow-hidden rounded-2xl border border-terminal-border bg-terminal-bg/80 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
      >
        {/* NAGŁÓWEK — statyczny prompt terminala (bez przewijania, żeby nie dublować górnego paska) */}
        <div className="flex items-center gap-2 border-b border-terminal-border/70 bg-terminal-panel/60 px-4 py-2 font-mono text-[0.72rem] overflow-hidden whitespace-nowrap">
          <span className="text-bull">mikolaj@portfolio</span>
          <span className="text-terminal-text/50">:~$</span>
          <span className="text-terminal-highlight">cat fundamentals.json</span>
          <span className="fund-caret inline-block w-[7px] h-3.5 bg-bull/80 translate-y-[2px]" style={{ animation: "fund-caret 1.1s steps(1) infinite" }} />
          <span className="ml-auto shrink-0 flex items-center gap-2 text-bull uppercase tracking-[0.2em] text-[0.62rem]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-bull opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-bull" />
            </span>
            Live
          </span>
        </div>

        {/* SCENA GŁÓWNA — wykres tła + treść na wierzchu */}
        <div className="relative min-h-[300px] sm:min-h-[340px]">
          <ChartBackdrop play={inView} />

          {/* scrim dla czytelności */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-terminal-bg via-terminal-bg/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-terminal-bg to-transparent" />

          {/* scanlines CRT */}
          <div
            className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay fund-flicker"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
              animation: "fund-flicker 4s ease-in-out infinite",
            }}
          />
          {/* przesuwający się błysk */}
          <div
            className="fund-scan-bar pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-bull/12 to-transparent blur-md"
            style={{ animation: "fund-scan 7s linear infinite" }}
          />

          {/* HERO — gigantyczna liczba */}
          <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-9 py-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-bull/10 ring-1 ring-bull/25 text-bull">
                {HERO.icon}
              </span>
              <span className="font-mono text-sm font-bold tracking-wider text-terminal-highlight">
                {TICKER}
              </span>
              <span className="font-mono text-[0.65rem] px-1.5 py-0.5 rounded border border-bull/40 bg-bull/10 text-bull">
                ▲ +{HERO.value}Y
              </span>
            </div>

            <div className="flex items-baseline gap-2 leading-none">
              <span className="font-display text-[5.5rem] sm:text-[8rem] font-bold tracking-tighter text-white drop-shadow-[0_8px_40px_rgba(16,185,129,0.35)]">
                <CountUp target={HERO.value} play={inView} />
              </span>
              <span className="font-display text-4xl sm:text-6xl font-bold text-bull">
                {HERO.suffix}
              </span>
              <div className="ml-2 sm:ml-4 flex flex-col">
                <span className="font-display text-xl sm:text-3xl font-bold text-white/95">
                  {tr(HERO.label.pl, HERO.label.en)}
                </span>
                <span className="font-mono text-xs sm:text-sm text-terminal-text/55">
                  {tr(HERO.sub.pl, HERO.sub.en)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* TABLICA NOTOWAŃ — 4 metryki */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-terminal-border/70 bg-terminal-panel/40 backdrop-blur-sm">
          {STATS.map((s, i) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const Tag: any = s.href ? "a" : "div";
            const linkProps = s.href
              ? {
                  href: s.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  "aria-label": `${tr(s.label.pl, s.label.en)} — ${tr(s.sub.pl, s.sub.en)}`,
                }
              : {};
            return (
              <Tag
                key={s.label.pl}
                {...linkProps}
                style={{ transitionDelay: inView ? `${i * 90}ms` : "0ms" }}
                className={`group relative flex flex-col gap-1.5 px-5 py-5 border-terminal-border/60 transition-colors duration-300 hover:bg-bull/[0.05] border-l [&:nth-child(odd)]:border-l-0 lg:[&:nth-child(odd)]:border-l lg:[&:nth-child(4n+1)]:border-l-0 [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+3)]:border-t-0 ${
                  s.href ? "cursor-pointer" : ""
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-terminal-text/60">
                  <span className="text-bull/80 group-hover:text-bull transition-colors">
                    {s.icon}
                  </span>
                  <span className="truncate">{tr(s.label.pl, s.label.en)}</span>
                  <span className="ml-auto text-bull">{s.href ? "↗" : "▲"}</span>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-white tabular-nums leading-none">
                    <CountUp target={s.value} play={inView} />
                  </span>
                  {s.suffix && (
                    <span className="font-display text-xl font-bold text-bull">
                      {s.suffix}
                    </span>
                  )}
                </div>
                <div className="font-mono text-[0.65rem] text-terminal-text/45 truncate">
                  {tr(s.sub.pl, s.sub.en)}
                </div>
                {/* akcent u dołu na hover */}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-bull/70 group-hover:w-full transition-all duration-500" />
              </Tag>
            );
          })}
        </div>

        {/* PASEK CZASU — oś kariery */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-terminal-border/70 px-5 py-3 font-mono text-[0.7rem]">
          {JOURNEY.map((j, i) => (
            <div key={j.year.pl} className="flex items-center gap-2">
              <span className="text-bull">●</span>
              <span className="font-bold text-terminal-highlight tabular-nums">
                {tr(j.year.pl, j.year.en)}
              </span>
              <span className="text-terminal-text/60">{tr(j.text.pl, j.text.en)}</span>
              {i < JOURNEY.length - 1 && (
                <span className="hidden sm:inline text-terminal-border ml-2">
                  ─────
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
