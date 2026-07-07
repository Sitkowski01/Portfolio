"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { ScanIcon } from "./Icons";

export default function Card3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Tilt na sprężynach — naturalne dochodzenie do pozycji i powrót
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const scale = useSpring(1, spring);

  useEffect(() => {
    const card = cardRef.current;
    const cardInner = innerRef.current;
    if (!card || !cardInner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!reduce) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        rotateX.set(((y - centerY) / centerY) * -12);
        rotateY.set(((x - centerX) / centerX) * 12);
        scale.set(1.02);
      }

      const xp = (x / rect.width) * 100;
      const yp = (y / rect.height) * 100;

      cardInner.style.setProperty("--pointer-x", `${xp}%`);
      cardInner.style.setProperty("--pointer-y", `${yp}%`);
      cardInner.style.setProperty("--foil-x", `${50 + (xp - 50) * 0.5}%`);
      cardInner.style.setProperty("--foil-y", `${50 + (yp - 50) * 0.5}%`);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduce, rotateX, rotateY, scale]);

  return (
    <div className="card-3d-wrapper reveal">
      {/* Karta Kolekcjonerska 3D */}
      <motion.div
        className="collectible-card-3d"
        ref={cardRef}
        style={{ rotateX, rotateY, scale }}
      >
        <div className="card-inner-3d" ref={innerRef}>
          <div className="card-glare-3d"></div>
          <div className="card-foil-3d"></div>

          <div className="card-content-3d">
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4 font-mono text-xs uppercase tracking-wider">
              <span className="text-terminal-text flex items-center gap-2">
                <ScanIcon className="w-3.5 h-3.5" />
                MSX // FOUNDER EDITION
              </span>
              <span className="text-bull bg-bull/10 border border-bull/30 px-2 py-1 rounded">
                #0001
              </span>
            </div>

            {/* Card Image Container */}
            <div className="flex-grow relative rounded-xl overflow-hidden border border-terminal-border/50 mb-5 group bg-terminal-bg">
              <img
                src="/ja.webp"
                alt="Mikołaj Sitek"
                className="card-photo-3d object-cover object-top w-full h-full opacity-90 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity group-hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-terminal-bg to-transparent opacity-60"></div>
            </div>

            {/* Card Details */}
            <div className="border-t border-terminal-border/50 pt-4">
              <h2 className="text-3xl font-bold text-terminal-highlight font-mono mb-1">
                $MIKOLAJ
              </h2>
              <div className="text-sm text-terminal-text mb-4 font-mono flex items-center">
                <span className="inline-block w-2 h-2 bg-bull rounded-full mr-2 animate-pulse"></span>
                Fullstack Developer — Web & Mobile
              </div>

              {/* Traits as Stock Tickers */}
              <div className="flex flex-wrap gap-2 font-mono text-[0.65rem] uppercase tracking-wider">
                <span className="px-3 py-1.5 bg-terminal-panel border border-bull/30 rounded text-bull">
                  $REACT_NATIVE
                </span>
                <span className="px-3 py-1.5 bg-terminal-panel border border-blue-400/30 rounded text-blue-400">
                  $AI_INTEGRATIONS
                </span>
                <span className="px-3 py-1.5 bg-terminal-panel border border-purple-400/30 rounded text-purple-400">
                  $UI_UX_DESIGN
                </span>
                <span className="px-3 py-1.5 bg-terminal-panel border border-terminal-border rounded text-terminal-text">
                  $DATA_DRIVEN
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
