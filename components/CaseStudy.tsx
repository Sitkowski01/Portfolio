"use client";

import SectionHeader from "./SectionHeader";
import { GithubIcon } from "./Icons";
import { useTr } from "./i18n";

type Loc = { pl: string; en: string };

const METRICS: { value: string; label: Loc; note: Loc }[] = [
  { value: "90%", label: { pl: "trafność triage'u", en: "triage accuracy" }, note: { pl: "na 698 formularzach", en: "on 698 forms" } },
  { value: "698", label: { pl: "formularzy pacjentów", en: "patient forms" }, note: { pl: "zebrane i przetworzone", en: "collected and processed" } },
  { value: "40%", label: { pl: "przewidywanie choroby", en: "disease prediction" }, note: { pl: "konkretna diagnoza", en: "specific diagnosis" } },
];

const STACK = [
  "Angular",
  "TypeScript",
  "Node.js",
  "REST API",
  "MongoDB",
  "Machine Learning",
];

const STEPS: { tag: Loc; title: Loc; body: Loc }[] = [
  {
    tag: { pl: "Problem", en: "Problem" },
    title: { pl: "Triage bywa wolny i podatny na błąd", en: "Triage can be slow and error-prone" },
    body: {
      pl: "Wstępna ocena, którzy pacjenci wymagają pilnej uwagi, jest czasochłonna. Pytanie pracy magisterskiej: czy model ML na danych z formularzy realnie wspomoże tę decyzję?",
      en: "Initial assessment of which patients need urgent attention is time-consuming. The thesis question: can an ML model on form data genuinely support that decision?",
    },
  },
  {
    tag: { pl: "Podejście", en: "Approach" },
    title: { pl: "Prototyp full-stack + warstwa ML", en: "A full-stack prototype + an ML layer" },
    body: {
      pl: "Zebrałem i przetworzyłem 698 formularzy. Front w Angular/TypeScript (formularz + wynik), backend w Node.js (REST API), dane w MongoDB. Model klasyfikuje ryzyko i wspiera decyzję triage'ową. Całość projektowana human-centered (specjalizacja UX).",
      en: "I collected and processed 698 forms. Frontend in Angular/TypeScript (form + result), backend in Node.js (REST API), data in MongoDB. The model classifies risk and supports the triage decision. The whole thing designed human-centered (UX specialization).",
    },
  },
  {
    tag: { pl: "Wynik", en: "Result" },
    title: { pl: "90% trafności, czytelny UX", en: "90% accuracy, a clear UX" },
    body: {
      pl: "Prototyp osiągnął 90% trafności w triage'u i 40% skuteczności w przewidywaniu konkretnej choroby. Pokazał, że lekka warstwa ML wspiera wstępną segregację — przy zachowaniu dostępnego, przejrzystego interfejsu.",
      en: "The prototype reached 90% triage accuracy and 40% accuracy in predicting a specific disease. It showed that a lightweight ML layer supports initial triage — while keeping an accessible, transparent interface.",
    },
  },
];

export default function CaseStudy() {
  const tr = useTr();
  return (
    <section id="case-study" className="reveal">
      <SectionHeader
        label={tr("Analiza", "Deep Dive")}
        title={tr("Case Study — AI Triage", "Case Study — AI Triage")}
      />

      <div className="glass-panel border border-bull/30 rounded-2xl shadow-neon-green overflow-hidden">
        {/* Pasek nagłówka jak „research report" */}
        <div className="flex flex-wrap items-center gap-3 px-5 sm:px-8 py-4 border-b border-terminal-border bg-terminal-bg/50">
          <span className="font-mono text-sm font-bold text-terminal-highlight">
            {tr("AI triage medyczny", "Medical AI triage")}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-bull bg-bull/10 border border-bull/30 px-2 py-0.5 rounded">
            {tr("Praca magisterska · ZUT", "Master's thesis · ZUT")}
          </span>
          <span className="ml-auto font-mono text-[0.65rem] uppercase tracking-widest text-terminal-text/50">
            Angular · Node · MongoDB · ML
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-5 sm:p-8">
          {/* Narracja */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {STEPS.map((s) => (
              <div key={s.tag.pl} className="border-l-2 border-bull/40 pl-4">
                <div className="font-mono text-[0.65rem] uppercase tracking-widest text-bull mb-1">
                  {tr(s.tag.pl, s.tag.en)}
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">
                  {tr(s.title.pl, s.title.en)}
                </h3>
                <p className="text-terminal-text text-sm leading-relaxed">
                  {tr(s.body.pl, s.body.en)}
                </p>
              </div>
            ))}
          </div>

          {/* Metryki + stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {METRICS.map((m) => (
              <div
                key={m.label.pl}
                className="bg-terminal-bg/60 border border-terminal-border rounded-xl px-5 py-4"
              >
                <div className="font-mono text-3xl font-bold text-bull tabular-nums leading-none">
                  {m.value}
                </div>
                <div className="text-sm text-terminal-highlight mt-1.5">
                  {tr(m.label.pl, m.label.en)}
                </div>
                <div className="font-mono text-[0.6rem] uppercase tracking-wider text-terminal-text/60 mt-0.5">
                  {tr(m.note.pl, m.note.en)}
                </div>
              </div>
            ))}

            <div className="flex flex-wrap gap-1.5 mt-1">
              {STACK.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[0.65rem] text-terminal-text bg-terminal-bg border border-terminal-border px-2 py-1 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href="https://github.com/Sitkowski01/magisterka"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider bg-terminal-bg border border-terminal-border text-terminal-highlight py-3 rounded transition-colors hover:border-bull/60 hover:text-bull"
            >
              <GithubIcon className="w-4 h-4" />
              {tr("Kod na GitHub", "Code on GitHub")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
