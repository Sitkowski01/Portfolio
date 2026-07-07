"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import HangingBadge from "./HangingBadge";
import SectionHeader from "./SectionHeader";
import { useLang, useTr } from "./i18n";

type TabId = "fundamentals" | "strategy" | "now" | "edge";

const TABS: { id: TabId; file: string }[] = [
  { id: "fundamentals", file: "fundamentals.json" },
  { id: "strategy", file: "strategy.md" },
  { id: "now", file: "now.md" },
  { id: "edge", file: "edge.md" },
];

const hl = "text-terminal-highlight";

// Podświetlanie składni dla „fundamentals.json" — render jak w edytorze kodu
const jPunct = "text-terminal-text/40";
const jKey = (name: string) => (
  <span className="text-terminal-highlight">{`"${name}"`}</span>
);
const jStr = (v: string) => <span className="text-bull">{`"${v}"`}</span>;
const jNum = (v: string | number) => <span className="text-sky-400">{v}</span>;

// Kolumna klucza z wyrównaniem dwukropków (monospace → padding spacjami)
function keyCol(name: string, width: number) {
  const pad = " ".repeat(Math.max(1, width - (name.length + 3)));
  return (
    <>
      {jKey(name)}
      <span className={jPunct}>{`:${pad}`}</span>
    </>
  );
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="select-none w-6 sm:w-9 shrink-0 pl-1 pr-2 sm:pr-3 text-right text-terminal-text/25 tabular-nums border-r border-terminal-border/40">
        {n}
      </span>
      <div className="whitespace-pre flex-1 pl-2 sm:pl-3">{children}</div>
    </div>
  );
}

function FundamentalsContent() {
  const { lang } = useLang();
  const t = (pl: string, en: string) => (lang === "en" ? en : pl);
  const comment = (txt: string) => (
    <span className={`${jPunct} italic`}>{`   // ${txt}`}</span>
  );

  return (
    <div
      className="rounded-lg border border-terminal-border/70 bg-terminal-bg/40 py-2.5 pr-2 sm:pr-4 leading-[1.6] overflow-x-auto"
      // Font skaluje się z szerokością — cały JSON mieści się na telefonie
      // bez poziomego przewijania (na desktopie cap 0.8rem).
      style={{ fontSize: "clamp(0.55rem, 2.45vw, 0.8rem)" }}
    >
      <CodeLine n={1}>
        <span className={jPunct}>{"{"}</span>
      </CodeLine>
      <CodeLine n={2}>
        {"  "}
        {keyCol("developer", 16)}
        {jStr("Mikołaj Sitek")}
        <span className={jPunct}>,</span>
      </CodeLine>
      <CodeLine n={3}>
        {"  "}
        {keyCol("years_coding", 16)}
        {jNum(7)}
        <span className={jPunct}>,</span>
        {comment(t("od 2019", "since 2019"))}
      </CodeLine>
      <CodeLine n={4}>
        {"  "}
        {keyCol("focus", 16)}
        <span className={jPunct}>[</span>
        {jStr("web")}
        <span className={jPunct}>, </span>
        {jStr("mobile")}
        <span className={jPunct}>, </span>
        {jStr("AI")}
        <span className={jPunct}>]</span>
        <span className={jPunct}>,</span>
      </CodeLine>
      <CodeLine n={5}>
        {"  "}
        {keyCol("projects", 16)}
        {jNum(10)}
        <span className={jPunct}>,</span>
        {comment(t("6 zbudowanych", "6 shipped"))}
      </CodeLine>
      <CodeLine n={6}>
        {"  "}
        {keyCol("internships", 16)}
        {jNum(2)}
        <span className={jPunct}>,</span>
        {comment("GlobalLogic · Raven")}
      </CodeLine>
      <CodeLine n={7}>
        {"  "}
        {keyCol("technologies", 16)}
        {jStr("15+")}
        <span className={jPunct}>,</span>
        {comment(t("front · back · AI", "front · back · AI"))}
      </CodeLine>
      <CodeLine n={8}>
        {"  "}
        {keyCol("repositories", 16)}
        {jStr("30+")}
        <span className={jPunct}>,</span>
        <span className={`${jPunct} italic`}>
          {"   // "}
          <a
            href="https://github.com/sitkowski01"
            target="_blank"
            rel="noopener noreferrer"
            className="not-italic hover:text-bull transition-colors"
          >
            @sitkowski01 ↗
          </a>
        </span>
      </CodeLine>
      <CodeLine n={9}>
        {"  "}
        {jKey("journey")}
        <span className={jPunct}>: {"{"}</span>
      </CodeLine>
      <CodeLine n={10}>
        {"    "}
        {keyCol("2019", 8)}
        {jStr(t("Start kodowania", "Started coding"))}
        <span className={jPunct}>,</span>
      </CodeLine>
      <CodeLine n={11}>
        {"    "}
        {keyCol("2023", 8)}
        {jStr(t("Staż — Raven IT", "Internship — Raven IT"))}
        <span className={jPunct}>,</span>
      </CodeLine>
      <CodeLine n={12}>
        {"    "}
        {keyCol("2024", 8)}
        {jStr(t("Staż — GlobalLogic", "Internship — GlobalLogic"))}
        <span className={jPunct}>,</span>
      </CodeLine>
      <CodeLine n={13}>
        {"    "}
        {keyCol("2025", 8)}
        {jStr(t("Dyplom magistra — ZUT", "Master's degree — ZUT"))}
        <span className={jPunct}>,</span>
      </CodeLine>
      <CodeLine n={14}>
        {"    "}
        {keyCol("now", 8)}
        {jStr(t("Specjalista IT @ Leroy Merlin", "IT Specialist @ Leroy Merlin"))}
      </CodeLine>
      <CodeLine n={15}>
        {"  "}
        <span className={jPunct}>{"}"}</span>
      </CodeLine>
      <CodeLine n={16}>
        <span className={jPunct}>{"}"}</span>
      </CodeLine>
    </div>
  );
}

function StrategyContent() {
  const { lang } = useLang();
  if (lang === "en") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-bull font-bold text-sm sm:text-lg"># Work philosophy</p>
        <div className="border-l-2 border-bull/60 pl-4 text-terminal-highlight italic leading-relaxed">
          <span className="text-terminal-text/50 not-italic">&gt; </span>
          &quot;A good app isn&apos;t just code that works — it&apos;s a thoughtful
          structure, a clear interface and decisions I can justify, not ones I just
          &bdquo;felt&rdquo;.&quot;
        </div>
        <ul className="flex flex-col gap-2 leading-relaxed">
          <li>
            <span className="text-bull mr-2">-</span>Problem and user first,
            technology second
          </li>
          <li>
            <span className="text-bull mr-2">-</span>Simple, readable code — it&apos;s
            read more often than written
          </li>
          <li>
            <span className="text-bull mr-2">-</span>Instead of guessing — I measure,
            verify and draw conclusions
          </li>
          <li>
            <span className="text-bull mr-2">-</span>I ship working versions and
            iterate, rather than waiting for the &bdquo;perfect&rdquo; one
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-bull font-bold text-sm sm:text-lg"># Filozofia pracy</p>
      <div className="border-l-2 border-bull/60 pl-4 text-terminal-highlight italic leading-relaxed">
        <span className="text-terminal-text/50 not-italic">&gt; </span>
        &quot;Dobra aplikacja to nie tylko kod, który działa — to przemyślana
        struktura, czytelny interfejs i decyzje, które potrafię uzasadnić, a nie
        tylko „wyczułem”.&quot;
      </div>
      <ul className="flex flex-col gap-2 leading-relaxed">
        <li>
          <span className="text-bull mr-2">-</span>Najpierw problem i użytkownik,
          potem technologia
        </li>
        <li>
          <span className="text-bull mr-2">-</span>Prosty, czytelny kod — czyta
          się go częściej, niż pisze
        </li>
        <li>
          <span className="text-bull mr-2">-</span>Zamiast zgadywać — mierzę,
          sprawdzam, wyciągam wnioski
        </li>
        <li>
          <span className="text-bull mr-2">-</span>Dowożę działające wersje i
          iteruję, zamiast czekać na „idealną”
        </li>
      </ul>
    </div>
  );
}

function NowContent() {
  const { lang } = useLang();
  if (lang === "en") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-bull font-bold text-sm sm:text-lg"># What I&apos;m focused on now</p>
        <p className="leading-relaxed">
          Updated: <span className={hl}>2026 / Q2</span> — after graduating, I combine
          work, learning and my own projects to keep pushing my craft forward.
        </p>
        <ul className="flex flex-col gap-2 leading-relaxed">
          <li>
            <span className="text-bull mr-2">-</span>I work as an{" "}
            <span className={hl}>IT Specialist</span> at Leroy Merlin
          </li>
          <li>
            <span className="text-bull mr-2">-</span>I develop my own apps —
            above all <span className={hl}>Business Scanner</span> and{" "}
            <span className={hl}>SplitDeBill</span>
          </li>
          <li>
            <span className="text-bull mr-2">-</span>I take{" "}
            <span className={hl}>AI courses</span> to use models in products in
            practice
          </li>
          <li>
            <span className="text-bull mr-2">-</span>After hours I&apos;m learning{" "}
            <span className={hl}>Spanish</span>
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-bull font-bold text-sm sm:text-lg"># Na czym teraz skupiam</p>
      <p className="leading-relaxed">
        Aktualizacja:{" "}
        <span className={hl}>2026 / Q2</span> — po studiach,
        łączę pracę, naukę i własne projekty, żeby cały czas pchać warsztat do
        przodu.
      </p>
      <ul className="flex flex-col gap-2 leading-relaxed">
        <li>
          <span className="text-bull mr-2">-</span>Pracuję jako{" "}
          <span className={hl}>Specjalista IT</span> w
          Leroy Merlin
        </li>
        <li>
          <span className="text-bull mr-2">-</span>Rozwijam własne aplikacje —
          przede wszystkim{" "}
          <span className={hl}>Skaner Biznesowy</span> i{" "}
          <span className={hl}>SplitDeBill</span>
        </li>
        <li>
          <span className="text-bull mr-2">-</span>Robię{" "}
          <span className={hl}>kursy z AI</span>, żeby
          praktycznie wykorzystywać modele w produktach
        </li>
        <li>
          <span className="text-bull mr-2">-</span>Po godzinach uczę się{" "}
          <span className={hl}>hiszpańskiego</span>
        </li>
      </ul>
    </div>
  );
}

function EdgeContent() {
  const { lang } = useLang();
  if (lang === "en") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-bull font-bold text-sm sm:text-lg"># What sets me apart</p>
        <p className="leading-relaxed">
          I don&apos;t stop at the visual layer — I take responsibility for the
          whole product, until it runs in production.
        </p>
        <ul className="flex flex-col gap-2 leading-relaxed">
          <li>
            <span className="text-bull mr-2">▸</span>
            <span className={hl}>Full cycle</span> — I handle design, frontend,
            backend and deploy myself
          </li>
          <li>
            <span className="text-bull mr-2">▸</span>
            <span className={hl}>Code + data + AI</span> — I combine technologies so
            they make business sense, not just work
          </li>
          <li>
            <span className="text-bull mr-2">▸</span>
            <span className={hl}>Product thinking</span> — I ask &quot;what&apos;s this
            for the user&quot; before I write the first line
          </li>
          <li>
            <span className="text-bull mr-2">▸</span>
            <span className={hl}>Fast adaptation</span> — I pick up new tech and tools
            without a long ramp-up
          </li>
        </ul>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-bull font-bold text-sm sm:text-lg"># Co mnie wyróżnia</p>
      <p className="leading-relaxed">
        Nie zatrzymuję się na warstwie wizualnej — biorę odpowiedzialność za
        cały produkt, aż działa na produkcji.
      </p>
      <ul className="flex flex-col gap-2 leading-relaxed">
        <li>
          <span className="text-bull mr-2">▸</span>
          <span className={hl}>Pełny cykl</span> — projekt,
          frontend, backend i deploy ogarniam samodzielnie
        </li>
        <li>
          <span className="text-bull mr-2">▸</span>
          <span className={hl}>Kod + dane + AI</span> —
          łączę technologie tak, by miały sens biznesowy, nie tylko działały
        </li>
        <li>
          <span className="text-bull mr-2">▸</span>
          <span className={hl}>Myślenie produktowe</span> —
          pytam „po co to użytkownikowi", zanim napiszę pierwszą linię
        </li>
        <li>
          <span className="text-bull mr-2">▸</span>
          <span className={hl}>Szybka adaptacja</span> —
          wchodzę w nowe technologie i narzędzia bez długiego rozbiegu
        </li>
      </ul>
    </div>
  );
}

const TAB_CONTENT: Record<TabId, React.ReactNode> = {
  fundamentals: <FundamentalsContent />,
  strategy: <StrategyContent />,
  now: <NowContent />,
  edge: <EdgeContent />,
};

export default function Profile() {
  const [tab, setTab] = useState<TabId>("fundamentals");
  const reduce = useReducedMotion();
  const tr = useTr();

  return (
    <section id="profile" className="reveal">
      <SectionHeader
        label={tr("Dane rynkowe", "Market Data")}
        title={tr("Profil firmy", "Company Profile")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Terminal z plikami profilu */}
        <div className="lg:col-span-8 w-full" data-particle-anchor="profile-terminal">
          <div className="glass-panel border border-terminal-border rounded-xl shadow-panel overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-terminal-border bg-terminal-bg/80">
              <span className="w-3 h-3 rounded-full bg-bear/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-bull/80"></span>
              <span className="ml-3 font-mono text-xs text-terminal-text tracking-wider">
                ~/profile — msx-terminal
              </span>
            </div>

            {/* Tab bar */}
            <div className="flex border-b border-terminal-border bg-terminal-bg/40 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-3 sm:px-5 py-2.5 font-mono text-[0.7rem] sm:text-sm border-r border-terminal-border transition-colors cursor-pointer whitespace-nowrap ${
                    tab === t.id
                      ? "bg-terminal-panel text-bull border-b-2 border-b-bull -mb-[1px]"
                      : "text-terminal-text hover:text-terminal-highlight hover:bg-terminal-panel/50"
                  }`}
                  aria-pressed={tab === t.id}
                >
                  {t.file}
                </button>
              ))}
            </div>

            {/* Content — mniejsza czcionka na telefonie, blisko rozmiaru JSON-a
                (który musi być mały, żeby zmieścić się na szerokość) */}
            <div className="p-4 sm:p-8 font-mono text-[0.72rem] sm:text-sm leading-relaxed min-h-[280px] sm:min-h-[320px] text-terminal-text">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {TAB_CONTENT[tab]}
                </motion.div>
              </AnimatePresence>
              <div className="text-bull mt-5">
                <span className="cursor-blink">█</span>
              </div>
            </div>

            {/* Status bar — dane z dawnej tabelki OVERVIEW */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-4 py-2.5 border-t border-terminal-border bg-terminal-bg/80 font-mono text-[0.65rem] sm:text-xs uppercase tracking-wider">
              <span className="text-terminal-highlight font-bold">
                $MIKOLAJ
              </span>
              <span className="text-terminal-text/60">
                SECTOR: <span className="text-terminal-text">Web / Mobile / AI / Data</span>
              </span>
              <span className="text-terminal-text/60">
                SENTIMENT:{" "}
                <span className="text-bull font-bold">STRONG BUY ▲</span>
              </span>
            </div>
          </div>
        </div>

        {/* THE HANGING ID BADGE */}
        <div className="lg:col-span-4 flex justify-center" data-particle-anchor="profile-badge">
          <HangingBadge />
        </div>
      </div>
    </section>
  );
}
