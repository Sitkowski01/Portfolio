"use client";

import Card3D from "./Card3D";
import QuoteBar from "./QuoteBar";
import { BriefcaseIcon, MailIcon, DownloadIcon } from "./Icons";
import { useTr } from "./i18n";

export default function Hero() {
  const tr = useTr();
  return (
    <section id="hero" className="min-h-[80vh] flex flex-col justify-center reveal">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: Typography & Value Prop */}
        <div className="lg:col-span-7 flex flex-col gap-6 relative">
          <div className="webgl-text-mask"></div>
          <div
            data-particle-anchor="hero-badge"
            className="inline-flex items-center gap-2 border border-terminal-border bg-terminal-panel/50 rounded-full px-4 py-1.5 w-max font-mono text-sm text-terminal-text shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-bull animate-pulse"></div>
            MARKET STATUS: <span className="text-bull font-semibold">OPEN</span>
          </div>

          <h1
            data-particle-anchor="hero-text"
            className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-terminal-highlight leading-tight"
          >
            <span className="text-gradient-light">Mikołaj Sitek</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-terminal-text mt-2 font-medium">
              Fullstack Developer — Web & Mobile
            </span>
          </h1>

          <p className="text-lg md:text-xl text-terminal-text max-w-2xl leading-relaxed mt-4">
            {tr(
              "Buduję aplikacje webowe i mobilne z myśleniem analitycznym. Łączę React Native, dane i integracje AI, dostarczając rozwiązania, które mają znaczenie biznesowe — od pomysłu po publikację w sklepie.",
              "I build web and mobile apps with an analytical mindset. I combine React Native, data and AI integrations to deliver solutions with real business impact — from idea to store release."
            )}
          </p>

          <QuoteBar />

          <div className="flex flex-wrap gap-4 mt-8 font-mono text-sm uppercase tracking-wider font-bold">
            <a
              href="#holdings"
              className="px-8 py-4 bg-gradient-to-b from-[#2ee8a5] to-bull text-[#03140d] rounded-md shadow-neon-green transition-all hover:shadow-neon-green-intense hover:brightness-110 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <BriefcaseIcon className="w-4 h-4" /> {tr("Zobacz projekty", "View projects")}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent text-terminal-highlight border border-terminal-border rounded-md transition-all hover:border-terminal-highlight hover:bg-terminal-panel flex items-center gap-2"
            >
              <MailIcon className="w-4 h-4" /> {tr("Kontakt", "Contact")}
            </a>
            <a
              href="/cv.pdf"
              download
              className="px-8 py-4 bg-transparent text-terminal-text border border-terminal-border rounded-md transition-all hover:border-bull hover:text-bull flex items-center gap-2"
            >
              <DownloadIcon className="w-4 h-4" /> {tr("Pobierz CV", "Download CV")}
            </a>
          </div>
        </div>

        {/* Right: 3D TRADING CARD */}
        <div
          data-particle-anchor="hero-card"
          className="lg:col-span-5 w-full flex items-center justify-center py-8 lg:py-0"
        >
          <Card3D />
        </div>
      </div>
    </section>
  );
}
