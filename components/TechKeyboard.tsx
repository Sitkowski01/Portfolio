"use client";

import { useState, type CSSProperties } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import SectionHeader from "./SectionHeader";
import SkillsList from "./SkillsList";
import { useTr } from "./i18n";

// Kategorie keycapów PL → EN (tłumaczone tylko one; nazwy technologii zostają)
const CAT_EN: Record<string, string> = {
  Język: "Language",
  Web: "Web",
  "Bazy danych": "Databases",
  Frontend: "Frontend",
  Mobile: "Mobile",
  Framework: "Framework",
  "3D": "3D",
  "Build tool": "Build tool",
  "WebGL / 3D": "WebGL / 3D",
  Styling: "Styling",
  Animacja: "Animation",
  UI: "UI",
  Design: "Design",
  Backend: "Backend",
  "Backend / BaaS": "Backend / BaaS",
  AI: "AI",
  DevOps: "DevOps",
  "AI / Media": "AI / Media",
  Narzędzia: "Tools",
};

// Gdzie i do czego realnie używam danej technologii (po najechaniu na klawisz).
type UseNote = { pl: string; en: string };
const USE: Record<string, UseNote> = {
  TypeScript: { pl: "Skaner Biznesowy, magisterka i ta strona — typowanie całego kodu", en: "Business Scanner, thesis and this site — typing across the codebase" },
  JavaScript: { pl: "Bazowy język front/back we wszystkich projektach", en: "Core front/back language across all projects" },
  Python: { pl: "Backend Eksploruj Polskę (FastAPI) + modele ML w magisterce", en: "Explore Poland backend (FastAPI) + ML models in the thesis" },
  HTML: { pl: "Struktura landingów: Pixel Bites, Bistro", en: "Structure of landings: Pixel Bites, Bistro" },
  CSS: { pl: "Stylowanie i animacje landingów restauracyjnych", en: "Styling and animating the restaurant landings" },
  SQL: { pl: "Baza PostgreSQL/PostGIS w Eksploruj Polskę", en: "PostgreSQL/PostGIS database in Explore Poland" },
  React: { pl: "Pixel Bites, Bistro, System rezerwacji", en: "Pixel Bites, Bistro, reservation system" },
  "React Native": { pl: "Skaner Biznesowy, SplitDeBill i koncepty mobilne", en: "Business Scanner, SplitDeBill and mobile concepts" },
  "Next.js": { pl: "Eksploruj Polskę + to portfolio", en: "Explore Poland + this portfolio" },
  Blender: { pl: "Modele 3D i animacje avatara na tej stronie", en: "3D models and avatar animations on this site" },
  Expo: { pl: "Buildy i development aplikacji React Native", en: "Builds and development of the React Native apps" },
  Vite: { pl: "Bundler: Pixel Bites, Bistro, System rezerwacji", en: "Bundler: Pixel Bites, Bistro, reservation system" },
  "Three.js": { pl: "Tło 3D WebGL: Pixel Bites + intro tej strony", en: "3D WebGL background: Pixel Bites + this site's intro" },
  Angular: { pl: "Front pracy magisterskiej (AI triage medyczny)", en: "Frontend of the master's thesis (medical AI triage)" },
  "Tailwind CSS": { pl: "Stylowanie: Bistro, rezerwacje i to portfolio", en: "Styling: Bistro, reservations and this portfolio" },
  NativeWind: { pl: "Stylowanie warstwy mobilnej w SplitDeBill", en: "Styling the mobile layer in SplitDeBill" },
  GSAP: { pl: "Animacje scroll-triggered w Pixel Bites", en: "Scroll-triggered animations in Pixel Bites" },
  "Framer Motion": { pl: "Animacje UI w tym portfolio", en: "UI animations in this portfolio" },
  "Radix UI": { pl: "Komponenty UI: Bistro, System rezerwacji", en: "UI components: Bistro, reservation system" },
  Figma: { pl: "Projekty źródłowe Bistro i Systemu rezerwacji", en: "Source designs for Bistro and the reservation system" },
  "Node.js": { pl: "Backend / REST API pracy magisterskiej", en: "Backend / REST API of the master's thesis" },
  Express: { pl: "Warstwa API w projektach opartych o Node", en: "API layer in Node-based projects" },
  FastAPI: { pl: "Backend web app Eksploruj Polskę", en: "Backend of the Explore Poland web app" },
  Firebase: { pl: "Auth, baza i Cloud Functions w Skanerze Biznesowym", en: "Auth, DB and Cloud Functions in Business Scanner" },
  Supabase: { pl: "Backend i autoryzacja Systemu rezerwacji", en: "Backend and auth of the reservation system" },
  PostgreSQL: { pl: "Baza z PostGIS w Eksploruj Polskę", en: "Database with PostGIS in Explore Poland" },
  "Gemini AI": { pl: "Analiza zdjęć wykresów w Skanerze Biznesowym", en: "Analyzing chart photos in Business Scanner" },
  OpenAI: { pl: "Generowanie opisów atrakcji w Eksploruj Polskę", en: "Generating attraction descriptions in Explore Poland" },
  Docker: { pl: "Konteneryzacja: OCR w SplitDeBill, Eksploruj Polskę", en: "Containerization: OCR in SplitDeBill, Explore Poland" },
  "Claude AI": { pl: "Wsparcie przy briefach i budowie tej strony", en: "Support for product briefs and building this site" },
  Highsfield: { pl: "Generowanie mediów 3D/wideo do intro strony", en: "Generating 3D/video media for the site intro" },
  Git: { pl: "Wersjonowanie wszystkich projektów (30+ repozytoriów)", en: "Version control across all projects (30+ repos)" },
};

// Stack technologiczny jako MECHANICZNA KLAWIATURA 60%. Pełny layout klawiatury:
// klawisze specjalne (Esc/Tab/Caps/Shift/Ctrl/Enter/Backspace/Space…) o własnych
// szerokościach + keycapy skillowe z legendami technologii. Każdy rząd ma tę samą
// szerokość → sylwetka prawdziwej klawiatury (równe lewa i prawa krawędź).
//
// Keycapy: rzeźbiony kształt (góra węższa od bazy, ścianki, grubość, cień) —
// styl w globals.css → .keycap. Cała plansza lekko przechylona (rotateX) dla
// fizycznej głębi.
//
// ANIMACJA WEJŚCIA (framer-motion): deck pojawia się pierwszy, potem keycapy
// SPADAJĄ z góry pojedynczo (stagger + miękki spring) i składają się w klawiaturę.

type SkillKey = {
  kind: "skill";
  cap: string;
  name: string;
  cat: string;
  color: string;
  w: number;
};
type SpecialKey = { kind: "special"; cap: string; w: number };
type Key = SkillKey | SpecialKey;

const k = (cap: string, name: string, cat: string, color: string, w = 1): SkillKey => ({
  kind: "skill",
  cap,
  name,
  cat,
  color,
  w,
});
const sp = (cap: string, w: number): SpecialKey => ({ kind: "special", cap, w });

// Każdy rząd sumuje się do tej samej szerokości (9.5u) → równe krawędzie.
const ROWS: Key[][] = [
  [
    sp("Esc", 1),
    k("TS", "TypeScript", "Język", "#4fa3ff"),
    k("JS", "JavaScript", "Język", "#f7df1e"),
    k("PY", "Python", "Język", "#ffd343"),
    k("HTML", "HTML", "Web", "#ff7043"),
    k("CSS", "CSS", "Web", "#5b8def"),
    k("SQL", "SQL", "Bazy danych", "#f7a23b"),
    sp("Backspace", 2.5),
  ],
  [
    sp("Tab", 1.5),
    k("React", "React", "Frontend", "#61dafb"),
    k("RN", "React Native", "Mobile", "#61dafb"),
    k("Next", "Next.js", "Framework", "#e5e7eb"),
    k("Blend", "Blender", "3D", "#f5792a"),
    k("Expo", "Expo", "Mobile", "#e5e7eb"),
    k("Vite", "Vite", "Build tool", "#b97bff"),
    k("Three", "Three.js", "WebGL / 3D", "#e5e7eb"),
    k("NG", "Angular", "Framework", "#dd0031"),
  ],
  [
    sp("Caps", 1.75),
    k("TW", "Tailwind CSS", "Styling", "#38bdf8"),
    k("NW", "NativeWind", "Styling", "#38bdf8"),
    k("GSAP", "GSAP", "Animacja", "#8ae000"),
    k("Motion", "Framer Motion", "Animacja", "#ff4d8d"),
    k("Radix", "Radix UI", "UI", "#e5e7eb"),
    k("Figma", "Figma", "Design", "#f24e1e"),
    sp("Enter", 1.75),
  ],
  [
    sp("Shift", 2),
    k("Node", "Node.js", "Backend", "#83cd29"),
    k("Exp", "Express", "Backend", "#a3b1c2"),
    k("Fast", "FastAPI", "Backend", "#05c3b1"),
    k("Fire", "Firebase", "Backend / BaaS", "#ffca28"),
    k("Supa", "Supabase", "Backend / BaaS", "#3ecf8e"),
    k("PG", "PostgreSQL", "Bazy danych", "#6ea8ff"),
    sp("Shift", 1.5),
  ],
  [
    sp("Ctrl", 1),
    k("Gemini", "Gemini AI", "AI", "#a78bff"),
    k("OpenAI", "OpenAI", "AI", "#19c39c"),
    k("Docker", "Docker", "DevOps", "#2496ed"),
    sp("Space", 2.5),
    k("Claude", "Claude AI", "AI", "#d97757"),
    k("Highs", "Highsfield", "AI / Media", "#e879f9"),
    k("Git", "Git", "Narzędzia", "#f05032"),
  ],
];

// Szerokość rzędu w jednostkach (suma w) — do wymiarów warstwy klawiszy.
const SPAN_X = Math.max(...ROWS.map((r) => r.reduce((s, key) => s + key.w, 0)));
const SPAN_Y = ROWS.length;

// Spłaszczenie do listy keycapów z pozycją (kursor kumulowany w obrębie rzędu).
type Placed = { key: Key; left: number; w: number; row: number; i: number };
const KEYS: Placed[] = [];
ROWS.forEach((row, r) => {
  let cursor = 0;
  row.forEach((key) => {
    KEYS.push({ key, left: cursor, w: key.w, row: r, i: KEYS.length });
    cursor += key.w;
  });
});

// Kontener orkiestruje stagger keycapów (po pojawieniu się decka).
const container: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.3, staggerChildren: 0.025 } },
};
const deckVar: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 22 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};
// Keycap: spada z góry, lekko obrócony — „precision assembly", nie chaos.
// transformPerspective sprawia, że rotateX czyta się jako lekki tumble 3D
// per klawisz (bez globalnego preserve-3d, które psułoby pointer-events).
const keyVar: Variants = {
  hidden: (tiltZ: number) => ({
    y: -340,
    opacity: 0,
    rotateX: -32,
    rotateZ: tiltZ,
    scale: 0.9,
    transformPerspective: 800,
  }),
  show: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    transformPerspective: 800,
    transition: { type: "spring", stiffness: 380, damping: 22, mass: 0.8 },
  },
};

export default function TechKeyboard() {
  const reduce = useReducedMotion();
  const tr = useTr();
  const [hover, setHover] = useState<SkillKey | null>(null);
  // Ostatnia pokazana technologia — trzymana też podczas zanikania pigułki,
  // żeby przy zejściu z klawisza nie zapadała się do pustego „—" (migający artefakt).
  const [shown, setShown] = useState<SkillKey | null>(null);
  const catLabel = (c: string) => tr(c, CAT_EN[c] ?? c);
  const showKey = (key: SkillKey) => {
    setHover(key);
    setShown(key);
  };

  return (
    // Bez klasy `reveal` — to wejście robi framer-motion (inaczej reveal
    // ukrywa sekcję opacity:0, a drop wykonuje się niewidocznie).
    <section id="keyboard">
      <SectionHeader
        label={tr("Stack technologiczny", "Tech Stack")}
        title={tr("Klawiatura technologii", "Technology keyboard")}
      />

      <div className="flex flex-col items-center py-6 sm:py-10">
        {/* Na telefonie klawiatura jest przewijana w poziomie (kb-scroll) —
            keycapy są większe i czytelne zamiast ściśnięte do nieczytelności. */}
        <div className="kb-scroll">
        <motion.div
          className="kb-board"
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="kb-underglow" aria-hidden="true" />

          <motion.div
            className="kb-deck"
            data-particle-anchor="keyboard-deck"
            variants={deckVar}
          >
            <motion.div
              className="kb-keys"
              variants={container}
              style={{
                width: `calc(${SPAN_X} * var(--U) - var(--g))`,
                height: `calc(${SPAN_Y} * var(--V) - var(--g))`,
              }}
            >
              {KEYS.map(({ key, left, w, row, i }) => {
                const tiltZ = (i % 2 === 0 ? 1 : -1) * 1.5;
                const isSkill = key.kind === "skill";
                return (
                  <motion.button
                    key={`${row}-${left}-${key.cap}`}
                    type="button"
                    className={`keycap ${isSkill ? "keycap--skill" : "keycap--special"}`}
                    style={
                      {
                        left: `calc(${left} * var(--U))`,
                        top: `calc(${row} * var(--V))`,
                        width: `calc(${w} * var(--U) - var(--g))`,
                        "--accent": isSkill ? key.color : "#7f8ea3",
                      } as CSSProperties
                    }
                    variants={keyVar}
                    custom={tiltZ}
                    onMouseEnter={() => isSkill && showKey(key)}
                    onMouseLeave={() =>
                      isSkill && setHover((h) => (h === key ? null : h))
                    }
                    onFocus={() => isSkill && showKey(key)}
                    onBlur={() => setHover(null)}
                    aria-label={isSkill ? `${key.name} — ${catLabel(key.cat)}` : key.cap}
                  >
                    <span className="keycap-top">
                      <span className="keycap-face">
                        <span className="keycap-cap">{key.cap}</span>
                      </span>
                    </span>
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
        </div>

        {/* Podpowiedź przewijania — tylko telefon (czytelny pill = celowa interakcja) */}
        <div className="sm:hidden -mt-1 flex items-center gap-2 rounded-full border border-terminal-border bg-terminal-bg/70 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-terminal-text/60">
          <span aria-hidden="true" className="text-bull">⇄</span>
          {tr("przesuń, by zobaczyć całość", "swipe to see all")}
        </div>

        {/* Etykieta najechanej technologii (poza obszarem scrolla — zawsze wyśrodkowana).
            Druga linia: w jakim projekcie i do czego realnie tę technologię używam. */}
        <div className="pointer-events-none mt-5 sm:mt-7 flex min-h-[4.25rem] items-start justify-center px-4">
            <motion.div
              initial={false}
              animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 6 }}
              transition={{ duration: 0.18 }}
              className="flex max-w-md flex-col items-center gap-1.5 rounded-2xl border border-terminal-border bg-terminal-bg/95 px-4 py-2.5 text-center shadow-panel backdrop-blur-sm"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: shown?.color ?? "transparent" }}
                />
                <span
                  className="font-mono text-sm font-bold"
                  style={{ color: shown?.color ?? "transparent" }}
                >
                  {shown?.name ?? "—"}
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-terminal-text">
                  {shown ? catLabel(shown.cat) : ""}
                </span>
              </div>
              <span className="font-mono text-[0.7rem] leading-snug text-terminal-text/80">
                {shown && USE[shown.name]
                  ? tr(USE[shown.name].pl, USE[shown.name].en)
                  : ""}
              </span>
            </motion.div>
          </div>
      </div>

      {/* Skanowalna lista — to, co recruiter czyta naprawdę */}
      <SkillsList />
    </section>
  );
}
