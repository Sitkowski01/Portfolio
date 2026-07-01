"use client";

import { useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

// Kwartalne świece OHLC 2023–2026 — droga spółki $MIKOLAJ od IPO do ATH
type Candle = {
  q: string;
  year: string;
  o: number;
  h: number;
  l: number;
  c: number;
  vol: number;
};

const CANDLES: Candle[] = [
  { q: "Q1", year: "2023", o: 18, h: 24, l: 15, c: 22, vol: 84 },
  { q: "Q2", year: "2023", o: 22, h: 28, l: 20, c: 26, vol: 52 },
  { q: "Q3", year: "2023", o: 26, h: 30, l: 22, c: 24, vol: 46 },
  { q: "Q4", year: "2023", o: 24, h: 34, l: 23, c: 32, vol: 68 },
  { q: "Q1", year: "2024", o: 32, h: 40, l: 30, c: 38, vol: 58 },
  { q: "Q2", year: "2024", o: 38, h: 44, l: 33, c: 35, vol: 44 },
  { q: "Q3", year: "2024", o: 35, h: 48, l: 34, c: 46, vol: 72 },
  { q: "Q4", year: "2024", o: 46, h: 54, l: 43, c: 52, vol: 64 },
  { q: "Q1", year: "2025", o: 52, h: 62, l: 50, c: 60, vol: 70 },
  { q: "Q2", year: "2025", o: 60, h: 66, l: 52, c: 56, vol: 48 },
  { q: "Q3", year: "2025", o: 56, h: 72, l: 55, c: 70, vol: 78 },
  { q: "Q4", year: "2025", o: 70, h: 80, l: 66, c: 78, vol: 66 },
  { q: "Q1", year: "2026", o: 78, h: 88, l: 75, c: 86, vol: 74 },
  { q: "Q2", year: "2026", o: 86, h: 92, l: 80, c: 84, vol: 50 },
  { q: "Q3", year: "2026", o: 84, h: 98, l: 82, c: 96, vol: 88 },
  { q: "Q4", year: "2026", o: 96, h: 102, l: 94, c: 100, vol: 96 },
];

const MILESTONES: Record<string, { label: string; detail: string }> = {
  "2023": {
    label: "IPO — pierwsze projekty",
    detail: "HTML / CSS / JS — fundamenty",
  },
  "2024": {
    label: "Ekspansja: React / Frontend",
    detail: "Komponenty, hooki, ekosystem",
  },
  "2025": {
    label: "Breakout: większe aplikacje, dane",
    detail: "Next.js, TypeScript, data viz",
  },
  "2026": {
    label: "ATH — Portfolio & Nowa Praca",
    detail: "All time high",
  },
};

// Geometria wykresu (viewBox 1000x350)
const X0 = 113;
const STEP = 53;
const CANDLE_W = 24;
const priceY = (p: number) => 270 - (p / 105) * 240;
const candleX = (i: number) => X0 + i * STEP;

export default function GrowthChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 1000;
    let nearest = 0;
    let minDist = Infinity;
    CANDLES.forEach((_, i) => {
      const d = Math.abs(candleX(i) - x);
      if (d < minDist) {
        minDist = d;
        nearest = i;
      }
    });
    setHovered(nearest);
  };

  const active = hovered !== null ? CANDLES[hovered] : null;
  const activeX = hovered !== null ? candleX(hovered) : 0;
  const last = CANDLES[CANDLES.length - 1];

  return (
    <section id="performance" className="reveal">
      <SectionHeader label="Historical Performance" title="$MIKOLAJ / Career Chart" />

      <div className="glass-panel border border-terminal-border rounded-xl p-4 sm:p-8 shadow-panel relative">
        {/* Pasek notowania nad wykresem */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-2 pb-4 font-mono text-[0.65rem] sm:text-xs uppercase tracking-wider">
          <span className="text-terminal-highlight font-bold">
            $MIKOLAJ · 1Q
          </span>
          <span className="text-bull font-bold">
            {last.c.toFixed(2)} ▲ +{(((last.c - CANDLES[0].o) / CANDLES[0].o) * 100).toFixed(0)}%
          </span>
          <span className="text-terminal-text/60">
            O <span className="text-terminal-text">{last.o.toFixed(2)}</span>
            {"  "}H <span className="text-terminal-text">{last.h.toFixed(2)}</span>
            {"  "}L <span className="text-terminal-text">{last.l.toFixed(2)}</span>
            {"  "}C <span className="text-bull">{last.c.toFixed(2)}</span>
          </span>
        </div>

        <div className="w-full overflow-x-auto overflow-y-hidden">
          <div
            className="min-w-[700px] h-[350px] relative"
            data-particle-anchor="growth-chart"
          >
            <svg
              ref={svgRef}
              className="w-full h-full cursor-crosshair"
              viewBox="0 0 1000 350"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setHovered(null)}
              role="img"
              aria-label="Świecowy wykres rozwoju kariery 2023-2026"
            >
              {/* Siatka pozioma */}
              <g stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4">
                {[95, 70, 45, 20].map((p) => (
                  <line key={p} x1="100" y1={priceY(p)} x2="950" y2={priceY(p)} />
                ))}
              </g>

              {/* Etykiety osi Y */}
              <g className="font-mono text-sm fill-terminal-text" textAnchor="end">
                <text x="88" y={priceY(95) + 5}>Senior</text>
                <text x="88" y={priceY(70) + 5}>Mid</text>
                <text x="88" y={priceY(45) + 5}>Junior</text>
                <text x="88" y={priceY(20) + 5}>Start</text>
              </g>

              {/* Wolumen */}
              <g>
                {CANDLES.map((cd, i) => {
                  const up = cd.c >= cd.o;
                  const h = (cd.vol / 100) * 30;
                  return (
                    <rect
                      key={`v-${i}`}
                      x={candleX(i) - CANDLE_W / 2}
                      y={318 - h}
                      width={CANDLE_W}
                      height={h}
                      fill={up ? "#10b981" : "#ef4444"}
                      opacity="0.25"
                    />
                  );
                })}
              </g>

              {/* Świece */}
              <g>
                {CANDLES.map((cd, i) => {
                  const up = cd.c >= cd.o;
                  const color = up ? "#10b981" : "#ef4444";
                  const x = candleX(i);
                  const bodyTop = priceY(Math.max(cd.o, cd.c));
                  const bodyH = Math.max(
                    Math.abs(priceY(cd.o) - priceY(cd.c)),
                    2
                  );
                  const isActive = hovered === i;
                  return (
                    <g
                      key={`c-${i}`}
                      className="candle-anim"
                      style={{
                        transitionDelay: `${i * 60}ms`,
                        ...(hovered !== null && !isActive
                          ? { opacity: 0.45 }
                          : {}),
                      }}
                    >
                      {/* Knot */}
                      <line
                        x1={x}
                        y1={priceY(cd.h)}
                        x2={x}
                        y2={priceY(cd.l)}
                        stroke={color}
                        strokeWidth="2"
                      />
                      {/* Korpus */}
                      <rect
                        x={x - CANDLE_W / 2}
                        y={bodyTop}
                        width={CANDLE_W}
                        height={bodyH}
                        fill={up ? color : "#030712"}
                        stroke={color}
                        strokeWidth="2"
                        rx="2"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Pulsujący punkt ATH na ostatniej świecy */}
              <circle
                cx={candleX(CANDLES.length - 1)}
                cy={priceY(last.c)}
                r="6"
                fill="#10b981"
                className="animate-pulse"
                pointerEvents="none"
              />

              {/* Crosshair z etykietami jak w terminalu */}
              {active && (
                <g pointerEvents="none">
                  <line
                    x1={activeX}
                    y1="20"
                    x2={activeX}
                    y2="320"
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />
                  <line
                    x1="100"
                    y1={priceY(active.c)}
                    x2="950"
                    y2={priceY(active.c)}
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  {/* Etykieta ceny przy prawej osi */}
                  <g
                    transform={`translate(952, ${priceY(active.c) - 10})`}
                    className="font-mono"
                  >
                    <rect
                      width="46"
                      height="20"
                      rx="3"
                      fill="#10b981"
                    />
                    <text
                      x="23"
                      y="14"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="bold"
                      fill="#030712"
                    >
                      {active.c.toFixed(0)}.00
                    </text>
                  </g>
                  {/* Etykieta okresu przy osi X */}
                  <g
                    transform={`translate(${activeX - 34}, 322)`}
                    className="font-mono"
                  >
                    <rect width="68" height="20" rx="3" fill="#1e293b" />
                    <text
                      x="34"
                      y="14"
                      textAnchor="middle"
                      fontSize="12"
                      fill="#f8fafc"
                    >
                      {active.q} '{active.year.slice(2)}
                    </text>
                  </g>
                </g>
              )}

              {/* Etykiety lat */}
              <g className="font-mono text-sm fill-terminal-text" textAnchor="middle">
                {["2023", "2024", "2025", "2026"].map((year, yi) => (
                  <text
                    key={year}
                    x={candleX(yi * 4 + 1.5)}
                    y="345"
                    fill={year === "2026" ? "#10b981" : undefined}
                    fontWeight={year === "2026" ? "bold" : undefined}
                  >
                    {year}
                  </text>
                ))}
              </g>
            </svg>

            {/* Tooltip OHLC + kamień milowy — flipuje pod świecę przy wysokich
                świecach i dosuwa się do krawędzi przy skrajnych, żeby nie
                uciął go overflow kontenera */}
            {active && (
              <div
                className={`absolute pointer-events-none z-10 ${
                  activeX > 760
                    ? "-translate-x-full"
                    : activeX < 240
                      ? ""
                      : "-translate-x-1/2"
                } ${priceY(active.h) < 130 ? "" : "-translate-y-full"}`}
                style={{
                  left: `${(activeX / 1000) * 100}%`,
                  top: `${
                    (priceY(active.h) < 130
                      ? priceY(active.l) / 350
                      : priceY(active.h) / 350) * 100
                  }%`,
                  marginTop: priceY(active.h) < 130 ? "14px" : "-12px",
                  marginLeft:
                    activeX > 760 ? "16px" : activeX < 240 ? "-16px" : "0",
                }}
              >
                <div className="glass-panel border border-bull/40 rounded-lg px-4 py-2.5 shadow-neon-green whitespace-nowrap">
                  <div className="font-mono text-xs text-bull font-bold uppercase tracking-wider">
                    {active.q} {active.year} ·{" "}
                    <span className={active.c >= active.o ? "" : "text-bear"}>
                      {active.c >= active.o ? "▲" : "▼"}{" "}
                      {(((active.c - active.o) / active.o) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="text-sm font-bold text-terminal-highlight">
                    {MILESTONES[active.year].label}
                  </div>
                  <div className="font-mono text-xs text-terminal-text">
                    O {active.o} · H {active.h} · L {active.l} · C {active.c} ·
                    VOL {active.vol}K
                  </div>
                  <div className="font-mono text-xs text-terminal-text/70">
                    {MILESTONES[active.year].detail}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="font-mono text-xs text-terminal-text/60 mt-4 uppercase tracking-wider text-center">
          Najedź na wykres, aby zobaczyć szczegóły · dane kwartalne · skala: seniority
        </p>
      </div>
    </section>
  );
}
