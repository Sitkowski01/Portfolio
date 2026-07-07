"use client";

import { GithubIcon, LinkedinIcon, DownloadIcon } from "./Icons";
import OrderTicket from "./OrderTicket";
import ContactFormModal from "./ContactFormModal";
import { useTr } from "./i18n";

const LINKEDIN_URL: string =
  "https://www.linkedin.com/in/miko%C5%82aj-sitek-482751372/";
const GITHUB_URL: string = "https://github.com/sitkowski01";

export default function Contact() {
  const tr = useTr();
  return (
    <section id="contact" className="reveal pb-4 sm:pb-24">
      <div className="glass-panel border border-terminal-border rounded-2xl p-8 md:p-14 relative overflow-hidden">
        {/* Abstract BG element */}
        <div className="absolute inset-0 bg-gradient-to-b from-bull/5 to-transparent pointer-events-none"></div>

        <div className="relative z-10">
          <div className="font-mono text-bull text-sm uppercase tracking-wider mb-8 flex items-center gap-2.5">
            <span
              className="inline-block w-2 h-2 rounded-sm bg-bull shadow-neon-green"
              aria-hidden="true"
            ></span>
            {tr("Relacje inwestorskie", "Investor Relations")}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Lewa: order ticket (Position Open) */}
            <div data-particle-anchor="contact-ticket">
              <OrderTicket />
              <p className="font-mono text-[0.65rem] text-terminal-text/50 mt-3 uppercase tracking-wider">
                {tr(
                  "zero dźwigni · sama praktyka · long-term hold",
                  "zero leverage · pure practice · long-term hold"
                )}
              </p>
            </div>

            {/* Prawa: pitch + CTA */}
            <div>
              <h2
                data-particle-anchor="contact-title"
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-highlight tracking-tight mb-5"
              >
                {tr(
                  "Gotowy na wspólną inwestycję?",
                  "Ready to invest together?"
                )}
              </h2>
              <p className="text-base sm:text-lg text-terminal-text mb-8 leading-relaxed">
                {tr(
                  "Szukam miejsca, gdzie połączę fullstack development, myślenie produktowe i dane — tam, gdzie kod realnie trafia do użytkowników. Masz projekt, ofertę pracy albo chcesz pogadać o giełdzie i danych?",
                  "I'm looking for a place to combine fullstack development, product thinking and data — where code actually reaches users. Got a project, a job offer, or just want to talk markets and data?"
                )}
                <span className="text-white font-medium block mt-2">
                  Let&apos;s connect.
                </span>
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 font-mono text-sm uppercase tracking-wider">
                <ContactFormModal />
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-terminal-bg text-terminal-highlight border border-terminal-border rounded hover:border-terminal-highlight hover:bg-terminal-panel hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <LinkedinIcon className="w-5 h-5" /> LinkedIn
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-terminal-bg text-terminal-highlight border border-terminal-border rounded hover:border-terminal-highlight hover:bg-terminal-panel hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-5 h-5" /> GitHub
                </a>
                <a
                  href="/cv.pdf"
                  download
                  className="px-6 py-3.5 bg-terminal-bg text-terminal-highlight border border-terminal-border rounded hover:border-bull hover:text-bull hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <DownloadIcon className="w-5 h-5" /> {tr("Pobierz CV", "Download CV")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
