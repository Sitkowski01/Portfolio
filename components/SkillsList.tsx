"use client";

// Skanowalna, grupowana lista technologii — pod klawiaturą w sekcji Tech Stack.
// Klawiatura = efekt, lista = to, co recruiter skanuje w 5 sekund.
import { useTr } from "./i18n";

type Group = { title: { pl: string; en: string }; items: string[] };

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
      "HTML / CSS",
    ],
  },
  {
    title: { pl: "Backend", en: "Backend" },
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
    items: ["Gemini AI", "OpenAI", "Machine Learning", "Python", "SQL", "PostGIS"],
  },
  {
    title: { pl: "Narzędzia · DevOps", en: "Tools · DevOps" },
    items: ["Git", "GitHub Actions", "Docker", "Jest", "Vite", "Linux"],
  },
];

// Akcentujemy kluczowe technologie (mocniejszy chip)
const PRIMARY = new Set([
  "React",
  "Angular",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Machine Learning",
]);

export default function SkillsList() {
  const tr = useTr();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
      {GROUPS.map((g) => (
        <div
          key={g.title.pl}
          className="glass-panel border border-terminal-border rounded-xl p-5 transition-colors hover:border-bull/40"
        >
          <div className="font-mono text-[0.65rem] uppercase tracking-widest text-bull border-b border-bull/20 pb-2 mb-3">
            {tr(g.title.pl, g.title.en)}
          </div>
          <ul className="flex flex-wrap gap-1.5">
            {g.items.map((item) => (
              <li
                key={item}
                className={`font-mono text-xs px-2 py-1 rounded border ${
                  PRIMARY.has(item)
                    ? "text-terminal-highlight bg-bull/10 border-bull/30"
                    : "text-terminal-text bg-terminal-bg border-terminal-border"
                }`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
