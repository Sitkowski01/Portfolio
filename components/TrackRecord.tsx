"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useTr } from "./i18n";

// ── Ikony (Heroicons solid, wypełnione, tint przez currentColor) ──
function SolidIcon({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "w-6 h-6"}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function BriefcaseSolid({ className }: { className?: string }) {
  return (
    <SolidIcon className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 5.25C7.5 3.59315 8.84315 2.25 10.5 2.25H13.5C15.1569 2.25 16.5 3.59315 16.5 5.25V5.45498C17.4325 5.54034 18.3574 5.65196 19.274 5.78912C20.7281 6.00668 21.75 7.27163 21.75 8.70569V11.7389C21.75 12.95 21.0164 14.0913 19.8137 14.4911C17.3566 15.308 14.7292 15.75 12 15.75C9.27087 15.75 6.64342 15.308 4.18627 14.4911C2.98364 14.0912 2.25 12.95 2.25 11.7389V8.70569C2.25 7.27163 3.27191 6.00668 4.72596 5.78912C5.6426 5.65196 6.56753 5.54034 7.5 5.45498V5.25ZM15 5.25V5.34082C14.0077 5.28056 13.0074 5.25 12 5.25C10.9927 5.25 9.99235 5.28056 9 5.34082V5.25C9 4.42157 9.67157 3.75 10.5 3.75H13.5C14.3284 3.75 15 4.42157 15 5.25ZM12 13.5C12.4142 13.5 12.75 13.1642 12.75 12.75C12.75 12.3358 12.4142 12 12 12C11.5858 12 11.25 12.3358 11.25 12.75C11.25 13.1642 11.5858 13.5 12 13.5Z"
      />
      <path d="M3 18.4V15.6039C3.22304 15.7263 3.46097 15.8307 3.71303 15.9145C6.32087 16.7815 9.10801 17.25 12 17.25C14.892 17.25 17.6791 16.7815 20.287 15.9145C20.539 15.8307 20.777 15.7263 21 15.604V18.4C21 19.8519 19.9528 21.1275 18.4769 21.3234C16.3575 21.6048 14.1955 21.75 12 21.75C9.80447 21.75 7.64246 21.6048 5.52314 21.3234C4.04724 21.1275 3 19.8519 3 18.4Z" />
    </SolidIcon>
  );
}

function AcademicCapSolid({ className }: { className?: string }) {
  return (
    <SolidIcon className={className}>
      <path d="M11.6998 2.80529C11.8912 2.72164 12.1089 2.72164 12.3003 2.80529C16.0192 4.43011 19.5437 6.41637 22.8295 8.71956C23.0673 8.88623 23.1875 9.1752 23.1381 9.46135C23.0887 9.7475 22.8785 9.97941 22.5986 10.0567C21.9137 10.2457 21.2347 10.4494 20.5618 10.6663C17.8307 11.5471 15.2018 12.6554 12.6972 13.9688L12.6939 13.9705C12.5803 14.0301 12.467 14.09 12.354 14.1504C12.1331 14.2684 11.8679 14.2684 11.6471 14.1504C11.533 14.0895 11.4186 14.0289 11.3039 13.9688C10.0655 13.3193 8.79658 12.7201 7.5 12.1736V11.95C7.5 11.8186 7.56742 11.702 7.67173 11.6389C9.17685 10.727 10.7294 9.88565 12.3247 9.11936C12.6981 8.94002 12.8554 8.49195 12.6761 8.11858C12.4967 7.7452 12.0486 7.58791 11.6753 7.76725C10.036 8.55463 8.44086 9.41909 6.89449 10.3559C6.44111 10.6306 6.13632 11.0801 6.03607 11.5838C5.18115 11.2549 4.31499 10.9486 3.43829 10.6659C2.76546 10.4489 2.08644 10.2457 1.40154 10.0567C1.12162 9.9794 0.911461 9.74749 0.86204 9.46134C0.812619 9.17519 0.932824 8.88622 1.17061 8.71955C4.45645 6.41636 7.98097 4.43011 11.6998 2.80529Z" />
      <path d="M13.0609 15.4734C15.4997 14.1703 18.0621 13.0687 20.7258 12.1906C20.8601 13.6054 20.9458 15.0343 20.9813 16.4755C20.9889 16.7847 20.8059 17.0669 20.5205 17.1861C17.6693 18.3764 14.9574 19.834 12.4159 21.5277C12.1641 21.6955 11.836 21.6955 11.5841 21.5277C9.04267 19.834 6.33073 18.3764 3.4796 17.1861C3.19416 17.0669 3.01116 16.7847 3.01878 16.4755C3.05429 15.0342 3.14001 13.6052 3.27427 12.1903C4.19527 12.4938 5.10415 12.8242 6 13.1803V14.4507C5.55165 14.71 5.25 15.1948 5.25 15.75C5.25 16.2453 5.49008 16.6846 5.86022 16.9577C5.7707 17.3383 5.63822 17.7108 5.46277 18.0675C5.91546 18.2811 6.36428 18.5017 6.8091 18.7289C7.06243 18.2137 7.24612 17.6729 7.36014 17.1207C7.88449 16.887 8.25 16.3612 8.25 15.75C8.25 15.1948 7.94835 14.71 7.5 14.4507V13.8059C8.6714 14.3177 9.81885 14.8743 10.9402 15.4734C11.6028 15.8274 12.3983 15.8274 13.0609 15.4734Z" />
      <path d="M4.46222 19.4623C4.88136 19.0432 5.21502 18.5711 5.46277 18.0675C5.91546 18.2811 6.36428 18.5017 6.8091 18.7289C6.49055 19.3768 6.06164 19.9842 5.52288 20.523C5.22999 20.8158 4.75512 20.8158 4.46222 20.523C4.16933 20.2301 4.16933 19.7552 4.46222 19.4623Z" />
    </SolidIcon>
  );
}

function CpuChipSolid({ className }: { className?: string }) {
  return (
    <SolidIcon className={className}>
      <path d="M16.5 7.5H7.5V16.5H16.5V7.5Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.25 2.25C8.66421 2.25 9 2.58579 9 3V3.75H11.25V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V3.75H15V3C15 2.58579 15.3358 2.25 15.75 2.25C16.1642 2.25 16.5 2.58579 16.5 3V3.75H17.25C18.9069 3.75 20.25 5.09315 20.25 6.75V7.5H21C21.4142 7.5 21.75 7.83579 21.75 8.25C21.75 8.66421 21.4142 9 21 9H20.25V11.25H21C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75H20.25V15H21C21.4142 15 21.75 15.3358 21.75 15.75C21.75 16.1642 21.4142 16.5 21 16.5H20.25V17.25C20.25 18.9069 18.9069 20.25 17.25 20.25H16.5V21C16.5 21.4142 16.1642 21.75 15.75 21.75C15.3358 21.75 15 21.4142 15 21V20.25H12.75V21C12.75 21.4142 12.4142 21.75 12 21.75C11.5858 21.75 11.25 21.4142 11.25 21V20.25H9V21C9 21.4142 8.66421 21.75 8.25 21.75C7.83579 21.75 7.5 21.4142 7.5 21V20.25H6.75C5.09315 20.25 3.75 18.9069 3.75 17.25V16.5H3C2.58579 16.5 2.25 16.1642 2.25 15.75C2.25 15.3358 2.58579 15 3 15H3.75V12.75H3C2.58579 12.75 2.25 12.4142 2.25 12C2.25 11.5858 2.58579 11.25 3 11.25H3.75V9H3C2.58579 9 2.25 8.66421 2.25 8.25C2.25 7.83579 2.58579 7.5 3 7.5H3.75V6.75C3.75 5.09315 5.09315 3.75 6.75 3.75H7.5V3C7.5 2.58579 7.83579 2.25 8.25 2.25ZM6 6.75C6 6.33579 6.33579 6 6.75 6H17.25C17.6642 6 18 6.33579 18 6.75V17.25C18 17.6642 17.6642 18 17.25 18H6.75C6.33579 18 6 17.6642 6 17.25V6.75Z"
      />
    </SolidIcon>
  );
}

function CodeBracketSolid({ className }: { className?: string }) {
  return (
    <SolidIcon className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.4473 3.02637C14.847 3.13536 15.0826 3.54766 14.9736 3.94728L10.4736 20.4473C10.3646 20.8469 9.95228 21.0825 9.55266 20.9735C9.15304 20.8645 8.91744 20.4522 9.02643 20.0526L13.5264 3.55261C13.6354 3.15299 14.0477 2.91738 14.4473 3.02637ZM16.7197 6.21961C17.0126 5.92672 17.4874 5.92672 17.7803 6.21961L23.0303 11.4696C23.3232 11.7625 23.3232 12.2374 23.0303 12.5303L17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803C16.4268 17.4874 16.4268 17.0125 16.7197 16.7196L21.4393 11.9999L16.7197 7.28027C16.4268 6.98738 16.4268 6.51251 16.7197 6.21961ZM7.28033 6.21961C7.57322 6.51251 7.57322 6.98738 7.28033 7.28027L2.56066 11.9999L7.28033 16.7196C7.57322 17.0125 7.57322 17.4874 7.28033 17.7803C6.98744 18.0732 6.51256 18.0732 6.21967 17.7803L0.96967 12.5303C0.676777 12.2374 0.676777 11.7625 0.96967 11.4696L6.21967 6.21961C6.51256 5.92672 6.98744 5.92672 7.28033 6.21961Z"
      />
    </SolidIcon>
  );
}

// ── EDYTUJ TUTAJ ──────────────────────────────────────────────
type Loc = { pl: string; en: string };
type Entry = {
  period: Loc;
  role: Loc;
  org: Loc;
  points: Loc[];
  tag: "now" | "past" | "edu";
  icon: React.ReactNode;
};

const ENTRIES: Entry[] = [
  {
    period: { pl: "2025 — teraz", en: "2025 — now" },
    role: { pl: "Specjalista IT", en: "IT Specialist" },
    org: { pl: "Leroy Merlin", en: "Leroy Merlin" },
    points: [
      { pl: "Wsparcie techniczne oraz utrzymanie sprzętu i oprogramowania", en: "Technical support and maintenance of hardware and software" },
      { pl: "Diagnostyka i rozwiązywanie problemów IT użytkowników", en: "Diagnosing and resolving users' IT issues" },
      { pl: "Równolegle: budowa własnych produktów web/mobile/AI (portfolio obok)", en: "In parallel: building my own web/mobile/AI products (this portfolio)" },
    ],
    tag: "now",
    icon: <BriefcaseSolid className="w-full h-full" />,
  },
  {
    period: { pl: "paźdz. 2024 — 30.06.2025", en: "Oct 2024 — 30 Jun 2025" },
    role: { pl: "Mgr inż. informatyki — Systemy zorientowane na użytkownika", en: "MSc Eng. in Computer Science — User-oriented systems" },
    org: { pl: "Zachodniopomorski Uniwersytet Technologiczny w Szczecinie", en: "West Pomeranian University of Technology in Szczecin" },
    points: [
      { pl: "Specjalizacja UX / human-centered design", en: "Specialization in UX / human-centered design" },
      { pl: "Praca mgr: prototyp AI do triage'u medycznego — 90% trafności na 698 formularzach", en: "Master's thesis: an AI prototype for medical triage — 90% accuracy on 698 forms" },
      { pl: "Front (Angular/TypeScript) + backend (Node.js, REST API, MongoDB)", en: "Frontend (Angular/TypeScript) + backend (Node.js, REST API, MongoDB)" },
    ],
    tag: "edu",
    icon: <AcademicCapSolid className="w-full h-full" />,
  },
  {
    period: { pl: "2024", en: "2024" },
    role: { pl: "Stażysta ds. Embedded Software", en: "Embedded Software Intern" },
    org: { pl: "GlobalLogic · staż w trakcie studiów magisterskich", en: "GlobalLogic · internship during master's studies" },
    points: [
      { pl: "Wdrażanie i debugowanie modułów C/C++ dla urządzeń ARM", en: "Implementing and debugging C/C++ modules for ARM devices" },
      { pl: "Testy jednostkowe i integracyjne + dokumentacja", en: "Unit and integration tests + documentation" },
      { pl: "Automatyzacja pipeline CI — czas budowania krótszy o ~15%", en: "CI pipeline automation — build time cut by ~15%" },
      { pl: "Międzynarodowy zespół Agile (stand-upy, code review, demo)", en: "International Agile team (stand-ups, code reviews, demos)" },
    ],
    tag: "past",
    icon: <CpuChipSolid className="w-full h-full" />,
  },
  {
    period: { pl: "2021 — 2024", en: "2021 — 2024" },
    role: { pl: "Inż. inżynierii systemów informacyjnych", en: "BSc Eng. in Information Systems Engineering" },
    org: { pl: "Zachodniopomorski Uniwersytet Technologiczny w Szczecinie", en: "West Pomeranian University of Technology in Szczecin" },
    points: [
      { pl: "Programowanie: Python, JavaScript, PHP, C, C++, C#", en: "Programming: Python, JavaScript, PHP, C, C++, C#" },
      { pl: "Systemy operacyjne, sieci, bazy danych i technologie webowe", en: "Operating systems, networks, databases and web technologies" },
    ],
    tag: "edu",
    icon: <AcademicCapSolid className="w-full h-full" />,
  },
  {
    period: { pl: "2023 — 2024", en: "2023 — 2024" },
    role: { pl: "Stażysta Web Developer", en: "Web Developer Intern" },
    org: { pl: "Raven IT · staż w trakcie studiów inżynierskich", en: "Raven IT · internship during engineering studies" },
    points: [
      { pl: "Migracja strony na Bootstrap 5 — PageSpeed Mobile z 68 do 90", en: "Migrated the site to Bootstrap 5 — PageSpeed Mobile from 68 to 90" },
      { pl: "Refaktor legacy JavaScript → TypeScript, ESLint/Prettier (~30% mniej bugów)", en: "Refactored legacy JavaScript → TypeScript, ESLint/Prettier (~30% fewer bugs)" },
      { pl: "GitHub Actions: automatyczny linting i wdrożenia", en: "GitHub Actions: automated linting and deployments" },
    ],
    tag: "past",
    icon: <CodeBracketSolid className="w-full h-full" />,
  },
];
// ──────────────────────────────────────────────────────────────

const TAG_META: Record<
  Entry["tag"],
  { label: string; cls: string; ring: string; core: string }
> = {
  now: {
    label: "● LIVE",
    cls: "text-bull bg-bull/10 border-bull/40",
    ring: "border-bull shadow-neon-green",
    core: "bg-bull",
  },
  past: {
    label: "CLOSED",
    cls: "text-terminal-text bg-terminal-bg border-terminal-border",
    ring: "border-terminal-text/50",
    core: "bg-terminal-text/80",
  },
  edu: {
    label: "EDU",
    cls: "text-sky-400 bg-sky-400/10 border-sky-400/30",
    ring: "border-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]",
    core: "bg-sky-400",
  },
};

export default function TrackRecord() {
  const reduce = useReducedMotion();
  const tr = useTr();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Postęp scrolla przez sekcję → wysokość neonowego wypełniacza osi
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 80%", "end 55%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="track-record" className="reveal">
      <SectionHeader
        label={tr("Historia notowań", "Earnings History")}
        title={tr("Doświadczenie", "Track Record")}
      />

      <div ref={wrapRef} className="relative pl-8 sm:pl-10">
        {/* Oś czasu */}
        <div className="absolute left-[11px] sm:left-[15px] top-2 bottom-2 w-px">
          {/* przygaszony tor */}
          <span className="absolute inset-0 bg-gradient-to-b from-terminal-border/70 via-terminal-border/40 to-transparent" />
          {/* neonowy wypełniacz — zjeżdża ze scrollem */}
          <motion.span
            style={reduce ? { height: "100%" } : { height: fillHeight }}
            className="absolute top-0 left-0 w-px bg-gradient-to-b from-bull via-bull to-bull/30 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
          />
        </div>

        <div className="flex flex-col gap-6">
          {ENTRIES.map((e, i) => {
            const meta = TAG_META[e.tag];
            return (
              <motion.div
                key={i}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="relative"
              >
                {/* Węzeł na osi — pierścień z rdzeniem */}
                <span className="absolute -left-[27px] sm:-left-[31px] top-2 w-3.5 h-3.5">
                  {e.tag === "now" && (
                    <span className="absolute inset-0 rounded-full bg-bull/40 animate-ping" />
                  )}
                  <span
                    className={`absolute inset-0 rounded-full border-2 bg-terminal-bg ${meta.ring}`}
                  />
                  <span
                    className={`absolute inset-0 m-auto w-1.5 h-1.5 rounded-full ${meta.core}`}
                  />
                </span>

                <div className="group glass-panel border border-terminal-border rounded-xl p-5 sm:p-6 pr-24 sm:pr-40 relative overflow-hidden transition-colors hover:border-bull/40">
                  {/* Ikona typu wpisu — neonowa zieleń, wyśrodkowana pionowo, hover-animacja */}
                  <span
                    className="pointer-events-none absolute right-10 sm:right-20 top-1/2 w-12 h-12 sm:w-16 sm:h-16 text-bull/35 transition-all duration-300 ease-out -translate-y-1/2 group-hover:text-bull group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_0_14px_rgba(16,185,129,0.75)]"
                  >
                    {e.icon}
                  </span>

                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-mono text-xs text-bull">{tr(e.period.pl, e.period.en)}</span>
                    <span
                      className={`font-mono text-[0.55rem] uppercase tracking-widest px-2 py-0.5 rounded border ${meta.cls}`}
                    >
                      {meta.label}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{tr(e.role.pl, e.role.en)}</h3>
                  <div className="font-mono text-xs text-terminal-text uppercase tracking-wider mb-3">
                    {tr(e.org.pl, e.org.en)}
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {e.points.map((p) => (
                      <li
                        key={p.pl}
                        className="flex items-start gap-2 text-sm text-terminal-text leading-relaxed"
                      >
                        <span className="text-bull mt-0.5">▸</span>
                        {tr(p.pl, p.en)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
