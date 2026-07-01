"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import HangingBadge from "./HangingBadge";
import SectionHeader from "./SectionHeader";
import { useLang, useTr } from "./i18n";

type TabId = "whoami" | "strategy" | "now" | "edge";

const TABS: { id: TabId; file: string }[] = [
  { id: "whoami", file: "whoami.txt" },
  { id: "strategy", file: "strategy.md" },
  { id: "now", file: "now.md" },
  { id: "edge", file: "edge.md" },
];

const hl = "text-terminal-highlight";

function WhoamiContent() {
  const { lang } = useLang();
  if (lang === "en") {
    return (
      <div className="flex flex-col gap-4">
        <p>
          <span className="text-bull">$</span>{" "}
          <span className={hl}>cat whoami.txt</span>
        </p>
        <p className="text-terminal-highlight text-base sm:text-lg font-bold">
          Mikołaj Sitek — web / fullstack developer
        </p>
        <p className="leading-relaxed">
          I&apos;m someone who likes to combine <span className={hl}>technology</span>,{" "}
          <span className={hl}>data</span> and <span className={hl}>strategic thinking</span>.
          I don&apos;t like leaving things to chance — I&apos;d rather rely on systems and
          data. I build apps from idea to production: web, mobile and AI integrations.
        </p>
        <p className="leading-relaxed">
          <span className="text-terminal-text/50">main_catalysts:</span>{" "}
          <span className="text-bull">Delivering from idea to production</span>
          <span className="text-terminal-text/50"> · </span>
          <span className="text-bull">Data-driven decisions</span>
          <span className="text-terminal-text/50"> · </span>
          <span className="text-bull">Continuous growth</span>
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <p>
        <span className="text-bull">$</span>{" "}
        <span className={hl}>cat whoami.txt</span>
      </p>
      <p className="text-terminal-highlight text-base sm:text-lg font-bold">
        Mikołaj Sitek — web / fullstack developer
      </p>
      <p className="leading-relaxed">
        Jestem osobą, która lubi łączyć <span className={hl}>technologię</span>,{" "}
        <span className={hl}>dane</span> i <span className={hl}>strategiczne myślenie</span>.
        Nie lubię polegać na przypadku — wolę opierać się na systemach i
        danych. Buduję aplikacje od pomysłu po produkcję: web, mobile i
        integracje AI.
      </p>
      <p className="leading-relaxed">
        <span className="text-terminal-text/50">main_catalysts:</span>{" "}
        <span className="text-bull">Dowożenie od pomysłu po produkcję</span>
        <span className="text-terminal-text/50"> · </span>
        <span className="text-bull">Decyzje oparte na danych</span>
        <span className="text-terminal-text/50"> · </span>
        <span className="text-bull">Ciągły rozwój</span>
      </p>
    </div>
  );
}

function StrategyContent() {
  const { lang } = useLang();
  if (lang === "en") {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-bull font-bold text-base sm:text-lg"># Work philosophy</p>
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
      <p className="text-bull font-bold text-base sm:text-lg"># Filozofia pracy</p>
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
        <p className="text-bull font-bold text-base sm:text-lg"># What I&apos;m focused on now</p>
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
      <p className="text-bull font-bold text-base sm:text-lg"># Na czym teraz skupiam</p>
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
        <p className="text-bull font-bold text-base sm:text-lg"># What sets me apart</p>
        <p className="leading-relaxed">
          I don&apos;t stop at the visual layer — I deliver a product from idea,
          through code, to a working version in production.
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
      <p className="text-bull font-bold text-base sm:text-lg"># Co mnie wyróżnia</p>
      <p className="leading-relaxed">
        Nie zatrzymuję się na warstwie wizualnej — dowożę produkt od pomysłu,
        przez kod, po działającą wersję na produkcji.
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
  whoami: <WhoamiContent />,
  strategy: <StrategyContent />,
  now: <NowContent />,
  edge: <EdgeContent />,
};

export default function Profile() {
  const [tab, setTab] = useState<TabId>("whoami");
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
                  className={`px-4 sm:px-5 py-2.5 font-mono text-xs sm:text-sm border-r border-terminal-border transition-colors cursor-pointer whitespace-nowrap ${
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

            {/* Content */}
            <div className="p-6 sm:p-8 font-mono text-sm min-h-[320px] text-terminal-text">
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
