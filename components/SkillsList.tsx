"use client";

// Skanowalna, grupowana lista technologii — pod klawiaturą w sekcji Tech Stack.
// Klawiatura = efekt, lista = to, co recruiter skanuje w 5 sekund.
import { useTr } from "./i18n";

type Loc = { pl: string; en: string };
// Kafelek: albo uniwersalna nazwa (React, Docker…), albo para PL/EN
// dla pozycji, które trzeba przetłumaczyć (np. terminy sieciowe).
type Item = string | Loc;
type Group = { title: Loc; items: Item[] };

const GROUPS: Group[] = [
  {
    title: { pl: "Frontend", en: "Frontend" },
    items: [
      "React",
      "React Native",
      "Next.js",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "NativeWind",
      "HTML / CSS",
      "Expo",
    ],
  },
  {
    title: { pl: "UI · Animacja · 3D", en: "UI · Animation · 3D" },
    items: ["Framer Motion", "GSAP", "Three.js", "Radix UI", "Blender", "Figma"],
  },
  {
    title: { pl: "Backend · Bazy", en: "Backend · Databases" },
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "FastAPI",
      "REST API",
      "PostgreSQL",
      "MongoDB",
      "Firebase / Supabase",
    ],
  },
  {
    title: { pl: "AI · Data", en: "AI · Data" },
    items: ["Gemini AI", "OpenAI", "Claude AI", "Machine Learning", "Python", "SQL", "PostGIS"],
  },
  {
    title: { pl: "Narzędzia · DevOps", en: "Tools · DevOps" },
    items: ["Git", "GitHub Actions", "Docker", "Jest", "Vite", "Linux"],
  },
  {
    title: { pl: "Systemy · Sieć · IT", en: "Systems · Network · IT" },
    items: [
      "Bash",
      "PowerShell",
      { pl: "Sieci LAN", en: "LAN networks" },
      { pl: "Firewalle", en: "Firewalls" },
      { pl: "Switche", en: "Switches" },
      { pl: "Krosowanie portów", en: "Port patching" },
      "Jira",
      "ServiceNow",
    ],
  },
];

// Akcentujemy technologie, które realnie dominują w moich projektach
// (najczęściej używane + flagowe), a nie te z pojedynczych realizacji.
const PRIMARY = new Set([
  "React Native", // 5 projektów mobile (Skaner flagowy, diabetyk, pary, milio, ClipSell)
  "React", // Pixel Bites, Bistro, System rezerwacji
  "TypeScript", // rdzeń większości projektów
  "Next.js", // Eksploruj Polskę + to portfolio
  "Node.js", // backend magisterki + NestJS w SplitDeBill
  "Firebase / Supabase", // Skaner (Firebase) + rezerwacje (Supabase)
  "Gemini AI", // analiza wykresów w Skanerze Biznesowym
  "Docker", // SplitDeBill (OCR) + Eksploruj Polskę
]);

export default function SkillsList() {
  const tr = useTr();
  return (
    <div className="mt-6">
      {/* Kontekst dla kafelków: to ten sam stack co na klawiaturze, tylko
          pogrupowany tematycznie i podany w wersji do szybkiego skanowania. */}
      <div className="mb-3 flex items-center gap-3 font-mono text-[0.65rem] uppercase tracking-widest text-terminal-text/60">
        <span className="h-px flex-1 bg-terminal-border/60" />
        <span className="text-center">
          {tr(
            "Ten sam stack, pogrupowany — do szybkiego skanowania",
            "The same stack, grouped — for quick scanning"
          )}
        </span>
        <span className="h-px flex-1 bg-terminal-border/60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GROUPS.map((g) => (
          <div
            key={g.title.pl}
            className="glass-panel border border-terminal-border rounded-xl p-5 transition-colors hover:border-bull/40"
          >
            <div className="font-mono text-[0.65rem] uppercase tracking-widest text-bull border-b border-bull/20 pb-2 mb-3">
              {tr(g.title.pl, g.title.en)}
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((item) => {
                const label = typeof item === "string" ? item : tr(item.pl, item.en);
                const primary = typeof item === "string" && PRIMARY.has(item);
                return (
                  <li
                    key={typeof item === "string" ? item : item.pl}
                    className={`font-mono text-xs px-2 py-1 rounded border ${
                      primary
                        ? "text-terminal-highlight bg-bull/10 border-bull/30"
                        : "text-terminal-text bg-terminal-bg border-terminal-border"
                    }`}
                  >
                    {label}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
