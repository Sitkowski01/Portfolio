"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { useTr } from "./i18n";

type Loc = { pl: string; en: string };
type Hobby = {
  id: string;
  image: string;
  title: Loc;
  tag: Loc;
  essence: Loc; // jednolinijkowa esencja (akcent)
  since: Loc; // od kiedy
  what: Loc; // co robię
  why: Loc; // dlaczego
};

// ⤵ Treść do personalizacji — kolejność = układ wachlarza.
//    „ja" jest w środku (index 3), reszta rozsuwa się symetrycznie na boki.
const HOBBIES: Hobby[] = [
  {
    id: "gielda",
    image: "/hobbies/gielda.webp",
    title: { pl: "Giełda", en: "Stock market" },
    tag: { pl: "Inwestowanie", en: "Investing" },
    essence: { pl: "Rynki czytane chłodno, nie emocjami.", en: "Markets read coolly, not emotionally." },
    since: { pl: "Zaczęło się od taty, dalej już działałem sam.", en: "Started with my dad, then worked at it on my own." },
    what: { pl: "Trendy, formacje i świadome zarządzanie ryzykiem.", en: "Trends, patterns and deliberate risk management." },
    why: { pl: "Cierpliwość, dane i dobry timing — to mnie wciąga.", en: "Patience, data and good timing — that's what hooks me." },
  },
  {
    id: "apki",
    image: "/hobbies/apki.webp",
    title: { pl: "Tworzenie aplikacji", en: "Building apps" },
    tag: { pl: "Po godzinach", en: "After hours" },
    essence: { pl: "Mój poligon doświadczalny na nowe technologie.", en: "My proving ground for new tech." },
    since: { pl: "Od dziecka ciekawiło mnie, jak powstają systemy.", en: "Since childhood I've been curious how systems are made." },
    what: { pl: "Prototypy i side-projecty — na nich testuję nowe API i frameworki.", en: "Prototypes and side projects — where I test new APIs and frameworks." },
    why: { pl: "Uwielbiam patrzeć, jak idea ożywa w kodzie.", en: "I love watching an idea come alive in code." },
  },
  {
    id: "siatkowka",
    image: "/hobbies/siatkowka.webp",
    title: { pl: "Siatkówka & piłka", en: "Volleyball & football" },
    tag: { pl: "Sport", en: "Sport" },
    essence: { pl: "Zespół, ruch i czysta frajda.", en: "Team, movement and pure fun." },
    since: { pl: "Piłka od 8. roku życia, siatkówka zawsze rekreacyjnie.", en: "Football since age 8, volleyball always for fun." },
    what: { pl: "Dziś bardziej hobbystycznie — dla formy i głowy.", en: "These days more casually — for fitness and headspace." },
    why: { pl: "Najlepszy oddech od ekranu, jaki znam.", en: "The best break from the screen I know." },
  },
  {
    id: "ja",
    image: "/hobbies/ja.webp",
    title: { pl: "Człowiek za kodem", en: "The person behind the code" },
    tag: { pl: "Kim jestem", en: "Who I am" },
    essence: { pl: "Logika, dane i sport w jednym.", en: "Logic, data and sport in one." },
    since: { pl: "Od liceum łączę programowanie z analizą i sportem.", en: "Since high school I've mixed programming with analysis and sport." },
    what: { pl: "Łączę web, mobile i dane — zawodowo i po godzinach.", en: "I mix web, mobile and data — at work and after hours." },
    why: { pl: "Bo nic nie cieszy tak jak coś, co sam zbudowałem i naprawdę działa.", en: "Because nothing feels better than building something that actually works." },
  },
  {
    id: "gry",
    image: "/hobbies/gry.webp",
    title: { pl: "League of Legends", en: "League of Legends" },
    tag: { pl: "Rywalizacja", en: "Competition" },
    essence: { pl: "Decyzje pod presją, na spokojnie.", en: "Decisions under pressure, kept calm." },
    since: { pl: "Gram od 8 lat, najczęściej rankingowo.", en: "I've played for 8 years, mostly ranked." },
    what: { pl: "Adaptacja do przeciwnika i analiza własnej gry.", en: "Adapting to the opponent and analyzing my own play." },
    why: { pl: "Uwielbiam rywalizację — i tak już zostało.", en: "I love competition — and it stuck." },
  },
  {
    id: "monety",
    image: "/hobbies/monety.webp",
    title: { pl: "Numizmatyka", en: "Numismatics" },
    tag: { pl: "Kolekcja", en: "Collection" },
    essence: { pl: "Historia i wartość w jednej monecie.", en: "History and value in a single coin." },
    since: { pl: "Zaczęło się od klasera od wujka.", en: "It started with an album from my uncle." },
    what: { pl: "Zbieram kolekcjonerskie monety 2 zł.", en: "I collect commemorative 2 zł coins." },
    why: { pl: "Detal, cierpliwość i długa gra — moje klimaty.", en: "Detail, patience and the long game — my kind of thing." },
  },
  {
    id: "gotowanie",
    image: "/hobbies/gotowanie.webp",
    title: { pl: "Gotowanie", en: "Cooking" },
    tag: { pl: "Kuchnia", en: "Kitchen" },
    essence: { pl: "Coś z niczego, byle smacznie.", en: "Something from nothing, as long as it's tasty." },
    since: { pl: "Zaczęło się w internacie w liceum.", en: "It started in the high-school dorm." },
    what: { pl: "Eksperymenty, własne wariacje, gotowanie dla bliskich.", en: "Experiments, my own variations, cooking for loved ones." },
    why: { pl: "Kreatywny reset z natychmiastowym efektem.", en: "A creative reset with an instant payoff." },
  },
];

const MID = (HOBBIES.length - 1) / 2;

// Kolejność w siatce (mobile/tablet): karty czyta się po kolei, więc
// „ja" (w wachlarzu środek talii) otwiera listę, reszta bez zmian.
const HOBBIES_GRID: Hobby[] = [
  HOBBIES[MID],
  ...HOBBIES.filter((_, i) => i !== MID),
];

function CardFaces({
  h,
  i,
  cssFlip,
  innerRef,
}: {
  h: Hobby;
  i: number;
  cssFlip?: boolean;
  innerRef?: (el: HTMLDivElement | null) => void;
}) {
  const tr = useTr();
  const num = String(i + 1).padStart(2, "0");
  const facets: [string, string][] = [
    [tr("Od kiedy", "Since when"), tr(h.since.pl, h.since.en)],
    [tr("Co robię", "What I do"), tr(h.what.pl, h.what.en)],
    [tr("Dlaczego", "Why"), tr(h.why.pl, h.why.en)],
  ];

  return (
    <div
      ref={innerRef}
      className={`hobby-inner${cssFlip ? " hobby-inner--css" : ""}`}
    >
      {/* FRONT — zdjęcie hobby */}
      <div className="hobby-face hobby-front">
        <img
          src={h.image}
          alt={tr(h.title.pl, h.title.en)}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.12] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-terminal-bg/25 to-transparent pointer-events-none" />

        <span className="absolute top-3 left-3 font-mono text-xs font-bold text-bull drop-shadow">
          {num}
        </span>
        <span
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-terminal-bg/70 border border-terminal-border flex items-center justify-center font-mono text-bull text-sm backdrop-blur-sm"
          aria-hidden="true"
        >
          ↻
        </span>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
          <h3 className="font-bold text-terminal-highlight text-lg leading-tight">
            {tr(h.title.pl, h.title.en)}
          </h3>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-bull">
            {tr(h.tag.pl, h.tag.en)}
          </span>
        </div>
      </div>

      {/* BACK — dossier hobby (premium) */}
      <div className="hobby-face hobby-back glass-panel flex flex-col p-4 text-left">
        {/* górny ticker-meta */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-bull/70">
            {tr(h.tag.pl, h.tag.en)}
          </span>
          <span className="font-mono text-[0.6rem] text-terminal-text/40 tracking-wider">
            {num} / {String(HOBBIES.length).padStart(2, "0")}
          </span>
        </div>

        {/* tytuł */}
        <h3 className="font-display text-lg font-bold text-terminal-highlight leading-none">
          {tr(h.title.pl, h.title.en)}
        </h3>

        {/* esencja — akcentowany pull-quote */}
        <p className="text-bull text-[0.8rem] font-medium leading-snug mt-2 mb-3 pl-2.5 border-l-2 border-bull/50">
          {tr(h.essence.pl, h.essence.en)}
        </p>

        {/* fakty jak w karcie danych */}
        <dl className="flex flex-col gap-2 mt-auto">
          {facets.map(([label, value]) => (
            <div key={label} className="border-t border-terminal-border/40 pt-1.5">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bull/60 mb-0.5">
                {label}
              </dt>
              <dd className="text-terminal-highlight/80 text-[0.72rem] leading-snug">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export default function Interests() {
  const reduce = useReducedMotion();
  const tr = useTr();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const toggle = (id: string) =>
    setFlipped((p) => ({ ...p, [id]: !p[id] }));

  // Wachlarz tylko na desktopie — na telefonie/tablecie karty nachodziły na
  // tekst i wystawały poza ekran; tam pokazujemy statyczną siatkę (flip tapem).
  // Start = false (zgodny z SSR), efekt podnosi na desktopie po mount.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const useFan = !reduce && isDesktop;

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRef = useRef<number | null>(null);
  const flippedRef = useRef(flipped);
  flippedRef.current = flipped;

  // Scroll-driven spread (tylko wariant wachlarza)
  useEffect(() => {
    if (!useFan) return;
    const section = sectionRef.current;
    const deck = deckRef.current;
    if (!section || !deck) return;

    // Scena kart zaczyna się POD nagłówkiem (mierzonym), a rozmiar karty
    // skaluje się do wolnej wysokości — karty nie najeżdżają na tekst
    // na niższych ekranach (laptopy).
    const measure = () => {
      const headerH = headerRef.current?.offsetHeight ?? 240;
      deck.style.top = `${headerH}px`;
      // 56px = bottom-14 decka (strefa podpisu); 0.52: wysokość karty (4/3 w)
      // + opadanie skrajnych kart w łuku + uniesienie aktywnej mieszczą się
      // w dostępnej wysokości.
      const availH = window.innerHeight - headerH - 56;
      const cardW = Math.max(150, Math.min(285, Math.round(availH * 0.52)));
      deck.style.setProperty("--hobby-card-w", `${cardW}px`);
    };
    measure();

    let raf = 0;
    let visible = false;
    let progress = 0;
    let target = 0;
    const activeness = new Array(HOBBIES.length).fill(0);

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const dist = -rect.top;
      target = Math.max(0, Math.min(1, dist / (window.innerHeight * 1.1)));
    };

    const loop = () => {
      progress += (target - progress) * 0.09;

      const w = deck.clientWidth || window.innerWidth;
      const cardW = cardRefs.current[0]?.offsetWidth || 190;
      // cap 220: talia rozsuwa się umiarkowanie, nie na całą szerokość ekranu
      const spacingX = Math.max(70, Math.min(220, (w / 2 - cardW * 0.5 - 48) / MID));
      const arcY = cardW * 0.1;

      for (let i = 0; i < HOBBIES.length; i++) {
        const card = cardRefs.current[i];
        const inner = innerRefs.current[i];
        if (!card) continue;

        const off = i - MID;
        const isActive =
          hoverRef.current === i || !!flippedRef.current[HOBBIES[i].id];
        activeness[i] += ((isActive ? 1 : 0) - activeness[i]) * 0.18;
        const a = activeness[i];

        const x = off * spacingX * progress;
        const y = Math.abs(off) * arcY * progress - a * 26;
        const rot = off * 7 * progress * (1 - a);
        const scale = 1 + a * 0.12;

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
        card.style.zIndex = String(
          isActive ? 100 : Math.round(50 - Math.abs(off) * 6)
        );
        if (inner) inner.style.transform = `rotateY(${a * 180}deg)`;
      }

      raf = visible ? requestAnimationFrame(loop) : 0;
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) loop();
      },
      { threshold: 0 }
    );
    io.observe(section);

    const onResize = () => {
      measure();
      onScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();
    loop();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [useFan]);

  const intro = (
    <p className="text-terminal-text max-w-2xl mb-2 leading-relaxed">
      {tr(
        "Poza terminalem mam kilka pasji, które napędzają sposób, w jaki myślę i pracuję.",
        "Beyond the terminal I have a few passions that drive how I think and work."
      )}{" "}
      <span className="text-bull">
        {useFan
          ? tr(
              "Przewijaj w dół, aby rozsunąć talię — najedź na kartę, aby ją odwrócić.",
              "Scroll down to fan out the deck — hover a card to flip it."
            )
          : tr("Dotknij karty (lub najedź), aby ją odwrócić.", "Tap a card (or hover) to flip it.")}
      </span>
    </p>
  );

  // Jedna wspólna <section> dla obu wariantów — ScrollReveal obserwuje element
  // tylko raz przy mount, więc nie wolno go odtwarzać przy przełączeniu układu.
  return (
    <section id="interests" ref={sectionRef} className="reveal">
      {useFan ? (
        /* Wariant desktopowy: sticky stage + rozsuwanie sterowane scrollem.
           Pełnoekranowa scena (body ma overflow-x-hidden). */
        <div className="w-screen relative left-1/2 -translate-x-1/2 min-h-[260vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <div
              ref={headerRef}
              className="absolute inset-x-0 top-0 z-40 pt-14 lg:pt-16 pointer-events-none"
            >
              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <SectionHeader
                  label={tr("Indeks osobisty", "Personal Index")}
                  title={tr("Zainteresowania", "Interests")}
                />
                {intro}
              </div>
            </div>

            {/* top ustawia JS (measure) — talia zaczyna się pod nagłówkiem */}
            <div
              ref={deckRef}
              style={{ top: 240 }}
              className="hobby-deck absolute inset-x-0 bottom-14"
            >
              {HOBBIES.map((h, i) => (
                <button
                  key={h.id}
                  type="button"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => toggle(h.id)}
                  onMouseEnter={() => (hoverRef.current = i)}
                  onMouseLeave={() => {
                    if (hoverRef.current === i) hoverRef.current = null;
                  }}
                  onFocus={() => (hoverRef.current = i)}
                  onBlur={() => {
                    if (hoverRef.current === i) hoverRef.current = null;
                  }}
                  aria-pressed={!!flipped[h.id]}
                  aria-label={tr(`${h.title.pl} — pokaż opis`, `${h.title.en} — show details`)}
                  className={`hobby-card hobby-card--abs ${
                    flipped[h.id] ? "is-flipped" : ""
                  }`}
                  style={{ zIndex: Math.round(50 - Math.abs(i - MID) * 6) }}
                >
                  <CardFaces
                    h={h}
                    i={i}
                    innerRef={(el) => {
                      innerRefs.current[i] = el;
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Podpis wypełniający dół sceny — spina hobby w jedną myśl */}
            <div className="absolute inset-x-0 bottom-10 z-30 px-6 text-center pointer-events-none">
              <div className="font-mono text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] text-terminal-text/45">
                {tr("Wspólny mianownik —", "Common denominator —")}{" "}
                <span className="text-bull/70">
                  {tr("decyzje · analiza · timing · rozwój", "decisions · analysis · timing · growth")}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Wariant mobile/tablet + reduced-motion: statyczna siatka, flip CSS-em */
        <>
          <SectionHeader
            label={tr("Indeks osobisty", "Personal Index")}
            title={tr("Zainteresowania", "Interests")}
          />
          {intro}
          <div className="hobby-deck flex flex-wrap items-center justify-center gap-5 sm:gap-6 py-6">
            {HOBBIES_GRID.map((h, i) => (
              <button
                key={h.id}
                type="button"
                onClick={() => toggle(h.id)}
                aria-pressed={!!flipped[h.id]}
                aria-label={tr(`${h.title.pl} — pokaż opis`, `${h.title.en} — show details`)}
                className={`hobby-card ${flipped[h.id] ? "is-flipped" : ""}`}
              >
                <CardFaces h={h} i={i} cssFlip />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
