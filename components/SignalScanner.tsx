"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

type Blip = {
  name: string;
  cat: string;
  eff: string;
  trait: string;
  signal: string; // typ pozycji w języku tradingu
  strength: number; // siła sygnału w %
  top: number; // % od góry
  left: number; // % od lewej
  small?: boolean;
};

const blips: Blip[] = [
  // STRATEGY
  {
    name: "Investing",
    cat: "Strategy",
    eff: "Ocena ryzyka i praca na niepełnych danych.",
    trait: "Cierpliwość, konsekwencja.",
    signal: "LONG",
    strength: 92,
    top: 25,
    left: 65,
  },
  {
    name: "Analytical Thinking",
    cat: "Strategy",
    eff: "Rozbijanie ogromnych problemów na mniejsze weryfikowalne tezy.",
    trait: "Logika, obiektywizm.",
    signal: "CORE HOLDING",
    strength: 88,
    top: 15,
    left: 45,
    small: true,
  },
  // BUILD
  {
    name: "Problem Solving",
    cat: "Build",
    eff: "Skupienie na rozwiązaniu, a nie ślepe przywiązanie do konkretnego narzędzia.",
    trait: "Adaptacyjność.",
    signal: "STRONG BUY",
    strength: 90,
    top: 35,
    left: 25,
  },
  {
    name: "Technology",
    cat: "Build",
    eff: "Śledzenie trendów i architektury nowoczesnych systemów.",
    trait: "Pasja konstrukcyjna.",
    signal: "ACCUMULATE",
    strength: 85,
    top: 55,
    left: 15,
    small: true,
  },
  // ANALYSIS
  {
    name: "League of Legends",
    cat: "Analysis",
    eff: "Mikrodecyzje w ułamkach sekund pod presją.",
    trait: "Timing, optymalizacja.",
    signal: "HIGH MOMENTUM",
    strength: 81,
    top: 75,
    left: 70,
  },
  {
    name: "Data Visualization",
    cat: "Analysis",
    eff: "Odczytywanie narracji ukrytej w surowym szumie liczbowym.",
    trait: "Przejrzystość.",
    signal: "LONG",
    strength: 86,
    top: 85,
    left: 45,
  },
  {
    name: "UI Systems",
    cat: "Analysis",
    eff: "Rozumienie powtarzalności we wzorcach zachowań.",
    trait: "Standaryzacja.",
    signal: "ACCUMULATE",
    strength: 79,
    top: 60,
    left: 80,
    small: true,
  },
  // HUMAN FACTOR
  {
    name: "Football",
    cat: "Human Factor",
    eff: "Zmysł taktyczny i rezygnowanie z ego dla dobra wspólnego wyniku.",
    trait: "Praca zespołowa.",
    signal: "CORE HOLDING",
    strength: 84,
    top: 70,
    left: 30,
  },
  {
    name: "Collaboration",
    cat: "Human Factor",
    eff: "Skuteczna wymiana informacji między inżynierią a biznesem.",
    trait: "Komunikacja.",
    signal: "LONG",
    strength: 83,
    top: 40,
    left: 85,
    small: true,
  },
  {
    name: "Learning Velocity",
    cat: "Human Factor",
    eff: "Błyskawiczne przyswajanie nowych standardów rynkowych.",
    trait: "Rozwój.",
    signal: "HIGH MOMENTUM",
    strength: 91,
    top: 20,
    left: 20,
  },
];

export default function SignalScanner() {
  const [active, setActive] = useState<Blip | null>(null);

  const activate = (blip: Blip) => {
    setActive(blip);
  };

  return (
    <section id="signals" className="reveal">
      <SectionHeader label="Market Signals" title="Skaner Sygnałów" />

      <p className="text-terminal-text text-lg max-w-3xl -mt-6 mb-14 leading-relaxed">
        Pola analityczne kształtujące mój proces decyzyjny poza edytorem —
        każde z otwartą pozycją. Najedź na punkt radaru, by{" "}
        <span className="text-terminal-highlight">odczytać sygnał</span>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Radar */}
        <div className="lg:col-span-7 relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center">
          <div
            className="radar-container absolute inset-0 z-10"
            data-particle-anchor="signal-radar"
          >
            <div className="radar-scanner animate-radar-spin"></div>
            <div className="absolute inset-0 border border-terminal-border rounded-full mix-blend-overlay"></div>
            <div className="absolute inset-[15%] border border-terminal-border/50 rounded-full mix-blend-overlay"></div>
            <div className="absolute inset-[30%] border border-terminal-border/30 rounded-full mix-blend-overlay"></div>
            <div className="absolute inset-[45%] border border-terminal-border/10 rounded-full mix-blend-overlay"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-terminal-border/30 -translate-x-1/2"></div>
            <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-terminal-border/30 -translate-y-1/2"></div>
          </div>

          {blips.map((blip) => (
            <button
              key={blip.name}
              type="button"
              className={`radar-blip ${blip.small ? "w-2 h-2" : ""} ${
                active?.name === blip.name ? "is-active" : ""
              }`}
              style={{ top: `${blip.top}%`, left: `${blip.left}%` }}
              aria-label={blip.name}
              onMouseEnter={() => activate(blip)}
              onFocus={() => activate(blip)}
              onClick={() => activate(blip)}
            ></button>
          ))}
        </div>

        {/* Panel odczytu */}
        <div
          className="lg:col-span-5 w-full glass-panel border border-terminal-border rounded-xl p-8 md:p-10 min-h-[300px] flex flex-col justify-center transition-all duration-300 relative"
          aria-live="polite"
        >
          <div className="relative z-10">
            <div className="font-mono text-terminal-text text-[0.65rem] uppercase tracking-widest mb-2 opacity-50">
              Signal Receiver :: {active ? "Entry Confirmed" : "Idle"}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-mono text-bull text-xs uppercase tracking-widest border-b border-bull/20 pb-2 inline-block">
                {active?.cat ?? "--"}
              </span>
              {active && (
                <span className="font-mono text-bull text-[0.65rem] font-bold px-2 py-0.5 rounded border border-bull/40 bg-bull/10 uppercase">
                  ▲ {active.signal}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
              {active?.name ?? "WAITING FOR SIGNAL"}
            </h3>
            <p className="text-terminal-text text-sm leading-relaxed mb-6">
              {active?.eff ??
                "Najedź kursorem lub sfocusuj punkt na radarze, aby odczytać parametry logiki."}
            </p>

            {/* Siła sygnału */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-[0.65rem] font-mono uppercase tracking-widest mb-2">
                <span className="text-terminal-text opacity-70">
                  Signal Strength
                </span>
                <span className="text-bull font-bold">
                  {active ? `${active.strength}%` : "--"}
                </span>
              </div>
              <div className="h-1.5 bg-terminal-bg rounded-full overflow-hidden border border-terminal-border/50">
                <div
                  className="h-full bg-bull rounded-full transition-all duration-500 ease-out shadow-neon-green"
                  style={{ width: active ? `${active.strength}%` : "0%" }}
                ></div>
              </div>
            </div>

            <div className="mt-auto">
              <span className="block text-[0.65rem] text-terminal-text uppercase tracking-widest mb-1 opacity-70">
                Edge
              </span>
              <div className="font-mono text-sm text-white">
                {active?.trait ?? "--"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
