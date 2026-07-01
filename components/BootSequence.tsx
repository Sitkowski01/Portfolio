"use client";

import { useEffect, useRef, useState } from "react";
import { useTr } from "./i18n";

const TARGET = "$MIKOLAJ";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*/<>";
const DURATION = 950; // ms — całość do 100%
const HOLD = 250; // ms — pauza na „ACCESS GRANTED"

function statusFor(p: number) {
  if (p < 35) return "BOOT_SEQUENCE";
  if (p < 70) return "LINK · MARKET FEED";
  if (p < 100) return "DECRYPT · $MIKOLAJ";
  return "ACCESS GRANTED";
}

export default function BootSequence() {
  const tr = useTr();
  const [active, setActive] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [name, setName] = useState(TARGET);
  const [fading, setFading] = useState(false);
  const skippedRef = useRef(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const alreadyBooted = sessionStorage.getItem("msx-booted") === "1";

    if (reducedMotion || alreadyBooted) {
      setActive(false);
      return;
    }

    setActive(true);
    sessionStorage.setItem("msx-booted", "1");
    document.body.style.overflow = "hidden";

    let raf = 0;
    let endTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;
    const start = performance.now();

    const finish = () => {
      setFading(true);
      document.body.style.overflow = "";
      doneTimer = setTimeout(() => setActive(false), 500);
    };

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(Math.round(t * 100));

      // Nazwa „dekoduje się" w pierwszych 60% czasu
      const reveal = Math.min(1, t / 0.6);
      const locked = Math.floor(reveal * TARGET.length);
      setName(
        TARGET.split("")
          .map((ch, i) =>
            i < locked || ch === "$"
              ? ch
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          )
          .join("")
      );

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setName(TARGET);
        endTimer = setTimeout(finish, HOLD);
      }
    };
    raf = requestAnimationFrame(tick);

    const skip = () => {
      if (skippedRef.current) return;
      skippedRef.current = true;
      cancelAnimationFrame(raf);
      clearTimeout(endTimer);
      setProgress(100);
      setName(TARGET);
      finish();
    };

    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(endTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
      document.body.style.overflow = "";
    };
  }, []);

  if (!active) return null;

  const done = progress >= 100;

  return (
    <div
      className={`boot-overlay scanlines ${fading ? "boot-done" : ""}`}
      role="status"
      aria-label={tr("Ładowanie strony", "Loading page")}
    >
      <div className="w-full max-w-md px-8 font-mono">
        {/* mikro-label */}
        <div className="text-[0.65rem] uppercase tracking-[0.3em] text-terminal-text/50 mb-5">
          msx://terminal · boot
        </div>

        {/* Nazwa — dekodowanie */}
        <div
          className={`font-display text-5xl sm:text-6xl font-bold tracking-tight transition-colors duration-300 ${
            done ? "text-bull" : "text-terminal-highlight"
          }`}
          style={
            done
              ? { textShadow: "0 0 24px rgba(16,185,129,0.55)" }
              : undefined
          }
        >
          {name}
          <span className="cursor-blink text-bull ml-1">_</span>
        </div>

        {/* Pasek postępu */}
        <div className="mt-8 flex items-center gap-3">
          <div className="relative flex-1 h-1.5 rounded-full bg-terminal-border/60 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-bull"
              style={{
                width: `${progress}%`,
                boxShadow: "0 0 12px rgba(16,185,129,0.7)",
                transition: "width 90ms linear",
              }}
            />
          </div>
          <span className="text-sm tabular-nums text-terminal-highlight w-10 text-right">
            {progress}%
          </span>
        </div>

        {/* Status */}
        <div
          className={`mt-3 text-xs uppercase tracking-widest ${
            done ? "text-bull font-bold" : "text-terminal-text/60"
          }`}
        >
          {done && "▸ "}
          {statusFor(progress)}
        </div>
      </div>
    </div>
  );
}
