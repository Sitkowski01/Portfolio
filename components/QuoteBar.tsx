"use client";

import { useEffect, useRef, useState } from "react";

// Pasek notowania $MIKOLAJ w hero — cena delikatnie "żyje" jak na tickerze
const BASE_PRICE = 184.2;
const WEEK52_LOW = 96.4;
const WEEK52_HIGH = 191.0;

export default function QuoteBar() {
  const [price, setPrice] = useState(BASE_PRICE);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);
  const prevRef = useRef(BASE_PRICE);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setPrice((prev) => {
        // Błądzenie wokół ceny bazowej, żeby nie odpłynęła
        const drift = (BASE_PRICE - prev) * 0.1;
        const next = +(prev + drift + (Math.random() - 0.48) * 0.6).toFixed(2);
        prevRef.current = prev;
        setFlash(next >= prev ? "up" : "down");
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const changePct = ((price - 164.0) / 164.0) * 100;

  return (
    <div className="glass-panel border border-terminal-border rounded-lg px-5 py-3 w-max max-w-full font-mono text-xs sm:text-sm flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="text-terminal-highlight font-bold">$MIKOLAJ</span>
      <span
        key={price}
        className={`font-bold text-bull ${
          flash === "up" ? "flash-up" : flash === "down" ? "flash-down" : ""
        }`}
      >
        {price.toFixed(2)} ▲ +{changePct.toFixed(1)}%
      </span>
      <span className="text-terminal-text/60 hidden sm:inline">
        BID <span className="text-terminal-text">{(price - 0.1).toFixed(2)}</span>{" "}
        / ASK <span className="text-terminal-text">{(price + 0.1).toFixed(2)}</span>
      </span>
      <span className="text-terminal-text/60 hidden md:inline">
        52W{" "}
        <span className="text-bear">{WEEK52_LOW.toFixed(2)}</span> –{" "}
        <span className="text-bull">{WEEK52_HIGH.toFixed(2)}</span>
      </span>
      <span className="text-terminal-text/60 hidden lg:inline">
        VOL <span className="text-terminal-text">1.24M</span>
      </span>
    </div>
  );
}
