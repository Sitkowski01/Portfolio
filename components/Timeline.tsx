"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

type Phase = {
  year: string;
  step: string;
  change: string;
  title: string;
  desc: string;
  tech: string;
};

const phases: Phase[] = [
  {
    year: "2023",
    step: "01 — IPO · FY2023",
    change: "▲ DEBIUT",
    title: "Wejście na rynek",
    desc: "Debiut na parkiecie. Na początku liczyło się poznanie języka interfejsów i zbudowanie regularności — eksploracja natywnego ekosystemu przeglądarki, DOM i pierwsze statyczne skrypty.",
    tech: "HTML / CSS / Vanilla JS",
  },
  {
    year: "2024",
    step: "02 — Expansion · FY2024",
    change: "▲ +85% YoY",
    title: "Ekspansja: React & Architektura",
    desc: "Kod przestał być zbiorem plików — stał się systemem zależności i decyzji. Zmiana paradygmatu na architekturę komponentową i zarządzanie przepływem danych podbiła wycenę.",
    tech: "React / State Management",
  },
  {
    year: "2025",
    step: "03 — Breakout · FY2025",
    change: "▲ +120% YoY",
    title: "Wybicie: dane jako fundament",
    desc: "Interfejs stał się narzędziem do odczytywania sygnałów. Mocne typowanie statyczne zabezpieczyło pozycję, a strumienie danych z zewnętrznych API napędziły momentum.",
    tech: "TypeScript / APIs / Data Visualization",
  },
  {
    year: "2026",
    step: "04 — All Time High · FY2026",
    change: "▲ ATH",
    title: "Gotowość Rynkowa",
    desc: "Pełny proces produkcyjny w cenie akcji: od analizy i architektury, przez implementację web i mobile, po publikację aplikacji w sklepie i integracje AI. Rating: STRONG BUY.",
    tech: "Next.js / React Native / AI / Product",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Indeks ostatniej fazy, która minęła próg scrolla (-1 = żadna)
  const [passedIdx, setPassedIdx] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const tracker = trackerRef.current;
    if (!section || !tracker) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tracker.style.transform = "scaleY(1)";
      setPassedIdx(phases.length - 1);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const startPoint = rect.top - windowHeight * 0.5;
      const endPoint = rect.bottom - windowHeight;
      const totalHeight = endPoint - startPoint;

      let progress = 0;
      if (startPoint < 0 && totalHeight > 0)
        progress = Math.abs(startPoint) / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      tracker.style.transform = `scaleY(${progress})`;

      let idx = -1;
      itemRefs.current.forEach((item, i) => {
        if (item && item.getBoundingClientRect().top < windowHeight * 0.6) {
          idx = i;
        }
      });
      setPassedIdx((prev) => (prev === idx ? prev : idx));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentYear = phases[Math.max(passedIdx, 0)].year;

  return (
    <section id="timeline" className="reveal" ref={sectionRef}>
      <SectionHeader label="Earnings History" title="Historia Notowań" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sticky rok po lewej (desktop) */}
        <div className="hidden lg:block lg:col-span-4 relative h-full">
          <div className="sticky top-[40%] text-[10rem] xl:text-[12rem] font-black text-white/5 leading-none font-mono -ml-4 select-none pointer-events-none">
            {currentYear}
          </div>
        </div>

        <div className="lg:col-span-8 relative">
          {/* Szyna + pasek postępu scrolla */}
          <div className="absolute left-[11px] sm:left-4 top-4 bottom-0 w-[2px] bg-terminal-border/30"></div>
          <div
            ref={trackerRef}
            className="absolute left-[11px] sm:left-4 top-4 bottom-0 w-[2px] bg-bull origin-top will-change-transform z-10"
            style={{ transform: "scaleY(0)", boxShadow: "0 0 10px #10b981" }}
          ></div>

          <div className="flex flex-col gap-28 relative z-20 pb-20">
            {phases.map((phase, i) => {
              const isPassed = i <= passedIdx;
              return (
                <div
                  key={phase.year}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  className="relative pl-0 sm:pl-16"
                  data-particle-anchor={`time-${i + 1}`}
                >
                  <div className="webgl-text-mask"></div>
                  <div className="relative z-10 pl-10 sm:pl-0">
                    {/* Wskaźnik na szynie */}
                    <div
                      className={`absolute left-[-29px] sm:left-[-64px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center -translate-x-[50%] transition-colors duration-500 ${
                        isPassed
                          ? "bg-bull/10 border-bull shadow-[0_0_15px_#10b981]"
                          : "bg-terminal-bg border-terminal-border"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                          isPassed ? "bg-bull" : "bg-terminal-text"
                        } ${i === phases.length - 1 && isPassed ? "animate-pulse" : ""}`}
                      ></div>
                    </div>

                    {/* Rok w tle (mobile) */}
                    <div className="lg:hidden text-5xl font-black text-white/10 leading-none absolute -top-2 left-0 select-none pointer-events-none">
                      {phase.year}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4 pt-1 mt-8 sm:mt-0">
                      <span className="font-mono text-bull text-xs uppercase tracking-widest">
                        {phase.step}
                      </span>
                      <span className="font-mono text-bull text-[0.65rem] font-bold px-2 py-0.5 rounded border border-bull/40 bg-bull/10">
                        {phase.change}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {phase.title}
                    </h3>
                    <p className="text-terminal-text text-lg leading-relaxed max-w-xl mb-4">
                      {phase.desc}
                    </p>
                    <div className="font-mono text-[0.65rem] text-white/40 uppercase">
                      {phase.tech}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
