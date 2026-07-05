"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { AvatarController } from "./AvatarController";
import { SCENES, SCENE_COUNT, buildCaptions, type Caption } from "./scenes";
import { useTr } from "../i18n";

const CAPTIONS = buildCaptions();

// Szerokość strefy crossfade między sąsiednimi tłami (w jednostkach sceny).
const EDGE = 0.22;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Krycie tła sceny i przy postępie local = p * liczba_scen. */
function videoOpacity(i: number, local: number): number {
  const d = local - i;
  const up = i === 0 ? 1 : (d + EDGE) / (2 * EDGE);
  const down = i === SCENE_COUNT - 1 ? 1 : (1 + EDGE - d) / (2 * EDGE);
  return clamp01(Math.min(up, down, 1));
}

/** Krycie bloku tekstu w jego globalnym zakresie [r0, r1]. */
function captionOpacity(p: number, [r0, r1]: [number, number]): number {
  const local = (p - r0) / (r1 - r0);
  if (local <= 0 || local >= 1) return 0;
  return clamp01(Math.min(local / 0.22, (1 - local) / 0.22, 1));
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

// ── Fallback: prefers-reduced-motion / brak WebGL ────────────────────────────
function StaticStory() {
  const tr = useTr();
  return (
    <section id="intro" className="relative z-10">
      <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 pt-28 pb-8 flex flex-col gap-12">
        {CAPTIONS.map((c, i) => (
          <div
            key={i}
            className="glass-panel border border-terminal-border rounded-xl p-6"
          >
            <div className="font-mono text-bull text-xs uppercase tracking-widest mb-2">
              {tr(c.sceneLabel.pl, c.sceneLabel.en)}
            </div>
            <h3 className="font-display text-2xl font-bold text-terminal-highlight mb-2">
              {tr(c.title.pl, c.title.en)}
            </h3>
            <p className="text-terminal-text leading-relaxed">{tr(c.body.pl, c.body.en)}</p>
            {c.cta && (
              <a
                href="#hero"
                className="inline-block mt-4 font-mono text-xs uppercase tracking-widest text-terminal-bg bg-bull rounded-md px-5 py-2.5 hover:shadow-neon-green-intense transition-shadow"
              >
                {tr(c.cta.pl, c.cta.en)} →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ScrollStoryImpl() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const mediaRefs = useRef<(HTMLVideoElement | HTMLImageElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Postęp scrolla współdzielony z Avatarem (czytany w useFrame R3F).
  const progress = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const tr = useTr();

  const [mode] = useState<"3d" | "static">(() => {
    if (typeof window === "undefined") return "3d";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return "static";
    if (!hasWebGL()) return "static";
    return "3d";
  });

  useEffect(() => {
    if (mode !== "3d") return;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    let raf = 0;
    let smooth = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) return;

      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const scrollable = rect.height - window.innerHeight;
      const target = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;
      // Tłumienie — scroll „dopływa" do celu zamiast skakać.
      smooth += (target - smooth) * 0.12;
      progress.current = smooth;

      const local = smooth * SCENE_COUNT;

      // Tła — crossfade; wideo dodatkowo play/pause (oszczędność dekodera).
      mediaRefs.current.forEach((el, i) => {
        if (!el) return;
        const o = videoOpacity(i, local);
        el.style.opacity = o.toFixed(3);
        if (el instanceof HTMLVideoElement) {
          if (o > 0.02 && el.paused) el.play().catch(() => {});
          else if (o <= 0.02 && !el.paused) el.pause();
        }
      });

      // Teksty — fade + translateY, sterowane bezpośrednio na DOM.
      CAPTIONS.forEach((c, i) => {
        const el = captionRefs.current[i];
        if (!el) return;
        const o = captionOpacity(smooth, c.range);
        el.style.opacity = o.toFixed(3);
        el.style.transform = `translateY(${(1 - o) * 22}px)`;
        el.style.visibility = o > 0.001 ? "visible" : "hidden";
      });

      // Przejścia: teal glow na granicach scen.
      const nearest = Math.round(local);
      const dist = Math.abs(local - nearest); // 0 na granicy sceny
      const closeness = clamp01(1 - dist / 0.5);
      if (glowRef.current) {
        glowRef.current.style.opacity = (closeness * closeness * 0.5).toFixed(3);
      }

      // Portal flash — tylko przy wejściu w scenę „portalową".
      if (flashRef.current) {
        const k = Math.round(local);
        const portal =
          k > 0 && k < SCENE_COUNT && SCENES[k]?.transition === "portal";
        const f =
          portal && dist < 0.12 ? clamp01(1 - dist / 0.12) : 0;
        flashRef.current.style.opacity = (f * 0.8).toFixed(3);
      }

      // Pasek postępu.
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${smooth.toFixed(4)})`;
      }

      // Podpowiedź scrolla znika po starcie.
      if (hintRef.current) {
        hintRef.current.style.opacity = clamp01(1 - smooth / 0.03).toFixed(3);
      }

      // Wyciszenie całej sekcji tuż przed kolejną treścią.
      sticky.style.opacity = (smooth > 0.97
        ? clamp01(1 - (smooth - 0.97) / 0.03)
        : 1
      ).toFixed(3);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  if (mode === "static") return <StaticStory />;

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="relative z-10"
      style={{ height: `${SCENE_COUNT * 75}vh` }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-terminal-bg"
      >
        {/* ── Warstwa teł (grafiki 1–5 + wideo finału, crossfade) ─────── */}
        <div className="absolute inset-0" aria-hidden="true">
          {SCENES.map((s, i) =>
            s.media.kind === "video" ? (
              <video
                key={s.id}
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
                src={s.media.src}
                muted
                loop
                playsInline
                preload="metadata"
                style={{ opacity: i === 0 ? 1 : 0 }}
                className="absolute inset-0 w-full h-full object-cover will-change-[opacity]"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.id}
                ref={(el) => {
                  mediaRefs.current[i] = el;
                }}
                src={s.media.src}
                alt=""
                loading={i < 2 ? "eager" : "lazy"}
                style={{ opacity: i === 0 ? 1 : 0 }}
                className="absolute inset-0 w-full h-full object-cover will-change-[opacity]"
              />
            )
          )}
          {/* Przyciemnienie + winieta dla czytelności modelu i tekstu. */}
          <div className="absolute inset-0 bg-terminal-bg/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-terminal-bg via-terminal-bg/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg/80 via-transparent to-terminal-bg/40" />
        </div>

        {/* ── Avatar 3D (nad tłem) ────────────────────────────────────── */}
        <Canvas
          aria-hidden="true"
          className="absolute inset-0 !pointer-events-none"
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 1.6, 9], fov: 34 }}
          onCreated={({ camera }) => {
            // Kamera POZIOMA (lookAt na tej samej wysokości) — stopy lądują
            // w dolnej strefie kadru (~80% wysokości), cała postać widoczna.
            // Przechył w dół podnosiłby postać → dlatego patrzymy prosto.
            camera.lookAt(new THREE.Vector3(0, 1.6, 0));
          }}
        >
          <hemisphereLight args={["#94a3b8", "#030712", 1.0]} />
          <directionalLight position={[3, 5, 4]} intensity={2.0} color="#f8fafc" />
          <directionalLight position={[-3, 3, -3]} intensity={2.4} color="#10b981" />
          <Suspense fallback={null}>
            <AvatarController progress={progress} onReady={() => setLoaded(true)} />
          </Suspense>
        </Canvas>

        {/* ── Overlaye przejść ────────────────────────────────────────── */}
        <div
          ref={glowRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        >
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-bull/25 to-transparent" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-gradient-to-r from-transparent via-bull/60 to-transparent" />
        </div>
        <div
          ref={flashRef}
          aria-hidden="true"
          style={{ opacity: 0 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,rgba(16,185,129,0.5),rgba(248,250,252,0.25)_30%,transparent_65%)]" />
        </div>

        {/* ── Loader avatara ──────────────────────────────────────────── */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-mono text-xs text-terminal-text uppercase tracking-widest">
              {tr("Ładowanie avatara", "Loading avatar")}<span className="cursor-blink">█</span>
            </span>
          </div>
        )}

        {/* ── Teksty (lewa strona) ────────────────────────────────────── */}
        {CAPTIONS.map((c: Caption, i) => (
          <div
            key={i}
            ref={(el) => {
              captionRefs.current[i] = el;
            }}
            style={{ opacity: 0, visibility: "hidden" }}
            className="absolute left-4 sm:left-12 lg:left-24 top-1/2 -translate-y-1/2 max-w-md px-6 pointer-events-none will-change-transform"
          >
            <div className="webgl-text-mask" />
            <div className="font-mono text-bull text-xs uppercase tracking-widest mb-3">
              {tr(c.sceneLabel.pl, c.sceneLabel.en)}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-terminal-highlight leading-tight mb-3">
              {tr(c.title.pl, c.title.en)}
            </h2>
            <p className="text-terminal-text leading-relaxed text-base sm:text-lg">
              {tr(c.body.pl, c.body.en)}
            </p>
            {c.cta && (
              <a
                href="#hero"
                className="inline-block mt-6 font-mono text-sm uppercase tracking-widest text-terminal-bg bg-bull rounded-md px-6 py-3 pointer-events-auto hover:shadow-neon-green-intense transition-shadow"
              >
                {tr(c.cta.pl, c.cta.en)} →
              </a>
            )}
          </div>
        ))}

        {/* ── Pasek postępu ───────────────────────────────────────────── */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-terminal-border/40">
          <div
            ref={barRef}
            style={{ transform: "scaleX(0)" }}
            className="h-full w-full origin-left bg-bull"
          />
        </div>

        {/* ── Podpowiedź scrolla ──────────────────────────────────────── */}
        <div
          ref={hintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-xs text-terminal-text uppercase tracking-widest">
            {tr("Scrolluj, żeby ruszyć", "Scroll to begin")}
          </span>
          <span className="text-bull animate-bounce">▼</span>
        </div>

        {/* ── Pomiń intro (lewy dół — prawy zajmuje chip „Terminal" Ctrl+K) ──
            Skok natychmiastowy: html ma scroll-smooth, więc zwykła kotwica
            przewijałaby płynnie przez całe 450vh scrollytellingu. */}
        <button
          type="button"
          onClick={() =>
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "instant" })
          }
          className="absolute bottom-8 left-6 z-40 font-mono text-xs text-terminal-text uppercase tracking-widest border border-terminal-border rounded-md px-4 py-2 hover:text-terminal-highlight hover:border-terminal-text transition-colors bg-terminal-bg/60 cursor-pointer"
        >
          {tr("Pomiń intro", "Skip intro")} ↓
        </button>
      </div>
    </section>
  );
}
