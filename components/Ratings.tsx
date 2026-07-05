"use client";

import SectionHeader from "./SectionHeader";
import { useTr } from "./i18n";

type Loc = { pl: string; en: string };

// Realne opinie (dopracowane stylistycznie). Rating = motyw rekomendacji giełdowej.
type Rating = {
  quote: Loc;
  author: Loc;
  role: Loc;
  rating: "STRONG BUY" | "BUY";
};

// Wyróżniona opinia — rozciągnięta na całą szerokość (lead analyst).
const FEATURED: Rating = {
  quote: {
    pl: "Wszystko dowoził na czas i z ogromną ambicją. Temat pracy magisterskiej zamknęliśmy sporo przed terminem — współpraca z Mikołajem była po prostu przyjemnością.",
    en: "He delivered everything on time and with huge ambition. We wrapped up the master's thesis well ahead of schedule — working with Mikołaj was simply a pleasure.",
  },
  author: { pl: "Anna Lewandowska", en: "Anna Lewandowska" },
  role: { pl: "Promotor pracy mgr · ZUT w Szczecinie", en: "Thesis supervisor · ZUT in Szczecin" },
  rating: "STRONG BUY",
};

const RATINGS: Rating[] = [
  {
    quote: {
      pl: "Wszedł w moje buty lepiej, niż się spodziewałem — radzi sobie świetnie. Charyzma, wiedza i tempo nauki robią wrażenie, a do tego nigdy nie zostawia nikogo z problemem: zawsze pomoże.",
      en: "He stepped into my shoes better than I expected — he's doing great. His charisma, knowledge and learning speed are impressive, and he never leaves anyone stuck with a problem: he'll always help.",
    },
    author: { pl: "Grzegorz", en: "Grzegorz" },
    role: { pl: "Przełożony · Leroy Merlin", en: "Manager · Leroy Merlin" },
    rating: "STRONG BUY",
  },
  {
    quote: {
      pl: "Jak już się za coś weźmie, nie odpuszcza — doprowadza temat do końca, nawet kiedy robi się trudno. Na takich ludzi się liczy.",
      en: "Once he takes something on, he doesn't let go — he sees it through to the end, even when it gets hard. Those are the people you count on.",
    },
    author: { pl: "Jakub Wasilewski", en: "Jakub Wasilewski" },
    role: { pl: "Zespół IT", en: "IT team" },
    rating: "STRONG BUY",
  },
  {
    quote: {
      pl: "Profesjonalne podejście do klienta, solidna wiedza techniczna i — co rzadkie — poczucie stylu. Robotę oddawał dopracowaną.",
      en: "A professional approach to the client, solid technical knowledge and — rare — a sense of style. He delivered polished work.",
    },
    author: { pl: "Filip Smolczyński", en: "Filip Smolczyński" },
    role: { pl: "Raven IT", en: "Raven IT" },
    rating: "BUY",
  },
  {
    quote: {
      pl: "Zawsze punktualny, głodny wiedzy i chętny do pracy. Nowe rzeczy chłonął błyskawicznie — można było na nim polegać w zadaniach sprintowych.",
      en: "Always punctual, hungry for knowledge and eager to work. He picked up new things in a flash — you could rely on him for sprint tasks.",
    },
    author: { pl: "Tomasz Zieliński", en: "Tomasz Zieliński" },
    role: { pl: "Mentor zespołu · GlobalLogic", en: "Team mentor · GlobalLogic" },
    rating: "BUY",
  },
];

const TOTAL = RATINGS.length + 1;

function RatingBadge({ rating }: { rating: Rating["rating"] }) {
  return (
    <span
      className={`font-mono text-[0.6rem] uppercase tracking-widest px-2 py-1 rounded border ${
        rating === "STRONG BUY"
          ? "text-[#030712] bg-bull border-bull font-bold"
          : "text-bull bg-bull/10 border-bull/40"
      }`}
    >
      {rating}
    </span>
  );
}

export default function Ratings() {
  const tr = useTr();
  return (
    <section id="ratings" className="reveal">
      <SectionHeader
        label={tr("Rekomendacje analityków", "Analyst Ratings")}
        title={tr("Co mówią o mnie", "What They Say")}
      />

      {/* Pasek konsensusu */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 glass-panel border border-bull/30 rounded-xl px-5 py-4 mb-6 font-mono">
        <span className="text-[0.65rem] uppercase tracking-widest text-terminal-text/60">
          Consensus
        </span>
        <span className="text-bull font-bold tracking-wide">STRONG BUY ▲</span>
        <span className="text-xs text-terminal-text/60">
          {tr(`${TOTAL} analityków · 0 sprzedaj`, `${TOTAL} analysts · 0 sell`)}
        </span>
        <span className="ml-auto text-[0.65rem] uppercase tracking-widest text-terminal-text/40">
          {tr("coverage: 2023 — teraz", "coverage: 2023 — now")}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* WYRÓŻNIONA — na całą szerokość */}
        <figure className="group md:col-span-2 glass-panel border border-bull/40 rounded-xl shadow-neon-green p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 transition-all duration-300 hover:border-bull/60">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <RatingBadge rating={FEATURED.rating} />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bull/70">
                ★ Top pick
              </span>
            </div>
            <blockquote className="text-terminal-text text-sm sm:text-base leading-relaxed">
              {tr(FEATURED.quote.pl, FEATURED.quote.en)}
            </blockquote>
          </div>
          <figcaption className="sm:w-52 sm:shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-terminal-border/60 sm:pl-6">
            <div className="text-terminal-highlight font-bold text-sm">
              {tr(FEATURED.author.pl, FEATURED.author.en)}
            </div>
            <div className="font-mono text-[0.65rem] uppercase tracking-wider text-terminal-text/60">
              {tr(FEATURED.role.pl, FEATURED.role.en)}
            </div>
          </figcaption>
        </figure>

        {/* POZOSTAŁE 4 — symetryczna siatka 2×2 */}
        {RATINGS.map((r) => (
          <figure
            key={r.author.pl}
            className="group glass-panel border border-terminal-border rounded-xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-bull/50 hover:shadow-neon-green"
          >
            <div className="flex items-center justify-between">
              <RatingBadge rating={r.rating} />
              <span
                className="font-display text-4xl leading-none text-bull/30 group-hover:text-bull/50 transition-colors"
                aria-hidden="true"
              >
                &rdquo;
              </span>
            </div>

            <blockquote className="text-terminal-text text-sm leading-relaxed flex-1">
              {tr(r.quote.pl, r.quote.en)}
            </blockquote>

            <figcaption className="border-t border-terminal-border/60 pt-3">
              <div className="text-terminal-highlight font-bold text-sm">
                {tr(r.author.pl, r.author.en)}
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-wider text-terminal-text/60">
                {tr(r.role.pl, r.role.en)}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
