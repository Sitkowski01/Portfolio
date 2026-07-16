"use client";

import { useEffect, useRef } from "react";
import { useTr } from "./i18n";

export default function HangingBadge() {
  const tr = useTr();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    const svgLine = lineRef.current;
    const badgeWrapper = wrapperRef.current;
    if (!badge || !svgLine || !badgeWrapper) return;

    // Bez fizyki przy reduced motion — badge wisi statycznie
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let isDragging = false;
    const anchorX = 140; // Center of the 280px wrapper
    const anchorY = 0; // Top of the wrapper

    const pos = { x: 140, y: 120 }; // Starting pos
    const vel = { x: 0, y: 0 };

    const restLength = 120;
    const k = 0.05; // Stiffness
    const friction = 0.92; // Damping
    const gravity = 0.8;

    const mouseOffset = { x: 0, y: 0 };
    let rafId = 0;

    // Pointer Events — jedna ścieżka dla myszy i dotyku. `touch-action: none`
    // na badge (patrz JSX) sprawia, że dotykowe przeciąganie karty nie scrolluje
    // strony, a scroll poza kartą działa normalnie.
    const startDrag = (e: PointerEvent) => {
      isDragging = true;
      const rect = badgeWrapper.getBoundingClientRect();
      mouseOffset.x = e.clientX - rect.left - pos.x;
      mouseOffset.y = e.clientY - rect.top - pos.y;
      badge.style.cursor = "grabbing";
      try {
        badge.setPointerCapture(e.pointerId);
      } catch {}
    };

    const doDrag = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const rect = badgeWrapper.getBoundingClientRect();
      let nx = e.clientX - rect.left - mouseOffset.x;
      let ny = e.clientY - rect.top - mouseOffset.y;

      // Ogranicz badge do widocznego ekranu w POZIOMIE. Bez tego można było
      // wyciągnąć kartę poza viewport → powstawał poziomy overflow, a na mobile
      // (gdzie tylko <body> ma overflow-x:hidden) przeglądarka przesuwała widok
      // w bok, przez co fixed ticker „dryfował" razem z przeciąganiem karty.
      const half = badge.offsetWidth / 2;
      const minX = half + 4 - rect.left;
      const maxX = window.innerWidth - half - 4 - rect.left;
      nx = Math.min(maxX, Math.max(minX, nx));
      // Pion — trzymaj w obrębie sznurka (bez wyciągania nad kotwicę / za nisko).
      ny = Math.max(20, Math.min(ny, rect.height - 40));

      pos.x = nx;
      pos.y = ny;

      vel.x = 0;
      vel.y = 0;
    };

    const endDrag = () => {
      isDragging = false;
      badge.style.cursor = "grab";
    };

    badge.addEventListener("pointerdown", startDrag);
    window.addEventListener("pointermove", doDrag, { passive: false });
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    const updatePhysics = () => {
      if (!isDragging) {
        const dx = pos.x - anchorX;
        const dy = pos.y - anchorY;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;

        const force = (distance - restLength) * k;
        const fx = -(dx / distance) * force;
        const fy = -(dy / distance) * force;

        vel.x += fx;
        vel.y += fy + gravity;

        vel.x *= friction;
        vel.y *= friction;

        pos.x += vel.x;
        pos.y += vel.y;
      }

      // Calculate rotation to make it swing
      const angle = Math.atan2(pos.y - anchorY, pos.x - anchorX) - Math.PI / 2;
      const swing = isDragging ? 0 : vel.x * 0.04;

      badge.style.left = `${pos.x}px`;
      badge.style.top = `${pos.y}px`;
      badge.style.transform = `translate(-50%, 0) rotate(${angle + swing}rad)`;

      svgLine.setAttribute("x2", String(pos.x));
      svgLine.setAttribute("y2", String(pos.y));

      rafId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      cancelAnimationFrame(rafId);
      badge.removeEventListener("pointerdown", startDrag);
      window.removeEventListener("pointermove", doDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-start min-h-[450px] w-full xl:w-[280px] shrink-0 z-20">
      <div ref={wrapperRef} className="relative w-[280px] h-[450px] pointer-events-none">
        {/* SVG String */}
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible">
          <circle cx="140" cy="0" r="3" fill="#1e293b" />
          <line
            ref={lineRef}
            x1="140"
            y1="0"
            x2="140"
            y2="120"
            stroke="#10b981"
            strokeWidth="2"
            strokeDasharray="4 2"
            opacity="0.6"
          />
        </svg>

        {/* The Badge Body */}
        <div
          ref={badgeRef}
          className="absolute top-[120px] left-[140px] w-[220px] bg-terminal-panel/80 backdrop-blur-md border border-terminal-border rounded-xl shadow-panel flex flex-col items-center p-4 pointer-events-auto cursor-grab select-none transition-shadow hover:shadow-neon-green"
          style={{
            transformOrigin: "50% 0%",
            transform: "translate(-50%, 0)",
            touchAction: "none", // przeciąganie karty na dotyku nie scrolluje strony
          }}
        >
          {/* Hole */}
          <div className="w-3 h-2 bg-terminal-bg rounded-full shadow-inner mb-4 mt-1 border border-terminal-border"></div>

          {/* ID Photo */}
          <div className="w-full h-[140px] rounded-lg bg-terminal-bg border border-terminal-border relative overflow-hidden group">
            <img
              src="/ja.webp"
              alt={tr("Mikołaj Sitek — zdjęcie na identyfikatorze", "Mikołaj Sitek — ID badge photo")}
              className="w-full h-full object-cover mix-blend-luminosity opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          </div>

          {/* ID Info */}
          <div className="w-full mt-4 flex flex-col items-center text-center">
            <span className="font-mono text-[0.65rem] text-[#030712] bg-bull font-bold px-2 py-0.5 rounded-sm mb-2 uppercase tracking-wider">
              Level 5 Access
            </span>
            <span className="font-bold text-terminal-highlight text-lg leading-tight">
              Mikołaj Sitek
            </span>
            <span className="font-mono text-[0.65rem] text-terminal-text mt-1">
              ID: 0x9A4F...B2C1
            </span>

            {/* Barcode Simulation */}
            <div className="w-full h-5 flex gap-[2px] mt-4 opacity-40 justify-center overflow-hidden">
              <div className="w-1 h-full bg-terminal-highlight"></div>
              <div className="w-2 h-full bg-terminal-highlight"></div>
              <div className="w-1 h-full bg-terminal-highlight"></div>
              <div className="w-[1px] h-full bg-terminal-highlight"></div>
              <div className="w-3 h-full bg-terminal-highlight"></div>
              <div className="w-1 h-full bg-terminal-highlight"></div>
              <div className="w-2 h-full bg-terminal-highlight"></div>
              <div className="w-1 h-full bg-terminal-highlight"></div>
              <div className="w-[1px] h-full bg-terminal-highlight"></div>
              <div className="w-2 h-full bg-terminal-highlight"></div>
              <div className="w-1 h-full bg-terminal-highlight"></div>
              <div className="w-3 h-full bg-terminal-highlight"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
