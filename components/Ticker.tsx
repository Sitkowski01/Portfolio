"use client";

import { useEffect, useState } from "react";
import LanguageToggle from "./LanguageToggle";

type TickerItem = {
  symbol: string;
  price: number;
  change: number;
  flash: "up" | "down" | null;
  flashKey: number;
};

const INITIAL_ITEMS: TickerItem[] = [
  {
    symbol: "$REACT_NATIVE",
    price: 142.5,
    change: 12.4,
    flash: null,
    flashKey: 0,
  },
  { symbol: "$REACT", price: 188.4, change: 9.6, flash: null, flashKey: 0 },
  { symbol: "$TYPESCRIPT", price: 98.2, change: 8.1, flash: null, flashKey: 0 },
  { symbol: "$NEXTJS", price: 215.7, change: 15.7, flash: null, flashKey: 0 },
  { symbol: "$ANGULAR", price: 76.8, change: 4.9, flash: null, flashKey: 0 },
  { symbol: "$NODE", price: 131.2, change: 11.3, flash: null, flashKey: 0 },
  { symbol: "$PYTHON", price: 154.6, change: 13.8, flash: null, flashKey: 0 },
  { symbol: "$FIREBASE", price: 64.3, change: 18.2, flash: null, flashKey: 0 },
  { symbol: "$DOCKER", price: 88.9, change: 6.7, flash: null, flashKey: 0 },
  { symbol: "$BASH_SH", price: 47.5, change: 3.2, flash: null, flashKey: 0 },
  { symbol: "$GEMINI_AI", price: 171.9, change: 24.5, flash: null, flashKey: 0 },
  { symbol: "$OPENAI", price: 203.4, change: 21.1, flash: null, flashKey: 0 },
  {
    symbol: "$PROBLEM_SOLVING",
    price: 999.9,
    change: 99.9,
    flash: null,
    flashKey: 0,
  },
];

function TickerGroup({ items }: { items: TickerItem[] }) {
  return (
    <div className="flex items-center gap-8 px-4 min-w-full">
      {items.map((item) => {
        const up = item.change >= 0;
        return (
          <span key={item.symbol} className="text-terminal-text">
            <span className={`mr-1 ${up ? "text-bull" : "text-bear"}`}>
              {up ? "▲" : "▼"}
            </span>
            {item.symbol}{" "}
            <span
              key={item.flashKey}
              className={
                item.flash === "up"
                  ? "flash-up"
                  : item.flash === "down"
                    ? "flash-down"
                    : ""
              }
            >
              {item.price.toFixed(2)}
            </span>{" "}
            <span className={up ? "text-bull" : "text-bear"}>
              {up ? "+" : ""}
              {item.change.toFixed(1)}%
            </span>
          </span>
        );
      })}
      <span className="text-terminal-text font-bold text-bull px-2 py-0.5 bg-bull/10 border border-bull/30 rounded">
        <span className="mr-1 animate-pulse">●</span> $OPEN_TO_WORK ACTIVE
      </span>
    </div>
  );
}

// Nazwa miasta wyciągnięta ze strefy czasowej przeglądarki,
// np. "Europe/Warsaw" -> "WARSAW", "America/New_York" -> "NEW YORK"
function cityFromTimeZone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const city = tz.split("/").pop();
    if (!city) return "LOCAL";
    return city.replace(/_/g, " ").toUpperCase();
  } catch {
    return "LOCAL";
  }
}

function Clock() {
  const [time, setTime] = useState<string | null>(null);
  // Ustawiane dopiero po stronie klienta — unikamy niezgodności hydracji
  const [city, setCity] = useState<string>("--");

  useEffect(() => {
    setCity(cityFromTimeZone());

    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden sm:flex items-center gap-2 h-full px-4 bg-terminal-bg border-l border-terminal-border font-mono text-xs text-terminal-text shrink-0 relative z-10">
      <span className="text-bull animate-pulse">●</span>
      <span className="uppercase tracking-wider">{city}</span>
      <span className="text-terminal-highlight font-bold tabular-nums">
        {time ?? "--:--:--"}
      </span>
    </div>
  );
}

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>(INITIAL_ITEMS);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setItems((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        return prev.map((item, i) => {
          if (i !== idx) return item.flash ? { ...item, flash: null } : item;
          const deltaPct = (Math.random() - 0.45) * 0.6; // lekki dryf w górę
          const newPrice = Math.max(1, item.price * (1 + deltaPct / 100));
          const dir = newPrice >= item.price ? "up" : "down";
          return {
            ...item,
            price: newPrice,
            change: item.change + deltaPct * 0.5,
            flash: dir,
            flashKey: item.flashKey + 1,
          };
        });
      });
    }, 1800);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-terminal-bg border-b border-terminal-border z-50 h-10 flex items-stretch font-mono text-sm shadow-md">
      <div className="flex-1 flex items-center overflow-hidden relative">
        <div className="flex whitespace-nowrap animate-marquee w-[200%]">
          <TickerGroup items={items} />
          {/* Duplicated for seamless loop */}
          <TickerGroup items={items} />
        </div>
        {/* Fade na krawędzi przed zegarem */}
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-terminal-bg to-transparent pointer-events-none"></div>
      </div>
      <LanguageToggle />
      <Clock />
    </div>
  );
}
