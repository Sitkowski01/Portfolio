"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MailIcon } from "./Icons";
import { useTr } from "./i18n";

type Status = "idle" | "sending" | "ok" | "error";

// Web3Forms na darmowym planie przyjmuje tylko żądania z przeglądarki (nie z serwera),
// dlatego wysyłamy bezpośrednio stąd. Klucz jest publicznym identyfikatorem
// (chroni go allowlist domen w panelu Web3Forms).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactFormModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const reduce = useReducedMotion();
  const tr = useTr();

  useEffect(() => setMounted(true), []);

  // ESC zamyka + blokada scrolla strony gdy modal otwarty
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Kompensacja szerokości scrollbara — bez tego strona przeskakuje w bok
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) document.body.style.paddingRight = `${scrollbarW}px`;
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    // reset po zamknięciu, żeby przy ponownym otwarciu był czysty formularz
    setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 250);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const company = String(fd.get("company") || ""); // honeypot

    // Bot wypełnił ukryte pole — udajemy sukces, nic nie wysyłamy.
    if (company) {
      setStatus("ok");
      form.reset();
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setError(
        tr(
          "Formularz nie jest jeszcze skonfigurowany.",
          "The form isn't configured yet."
        )
      );
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio: wiadomość od ${name}`,
          from_name: "Portfolio — kontakt",
          replyto: email,
          name,
          email,
          message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean };
      if (res.ok && json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(
          tr("Nie udało się wysłać. Spróbuj ponownie.", "Couldn't send. Please try again.")
        );
      }
    } catch {
      setStatus("error");
      setError(tr("Brak połączenia. Spróbuj ponownie.", "No connection. Please try again."));
    }
  }

  const inputClass =
    "w-full bg-terminal-bg border border-terminal-border rounded-lg px-4 py-3 text-terminal-highlight placeholder:text-terminal-text/40 outline-none focus:border-bull/70 focus:ring-1 focus:ring-bull/40 transition-colors";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-6 py-3.5 bg-bull text-[#030712] font-bold rounded hover:bg-[#00e68a] hover:shadow-neon-green-intense hover:-translate-y-1 transition-all flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider"
      >
        <MailIcon className="w-5 h-5" /> {tr("Napisz wiadomość", "Send a message")}
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <div
                className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-label={tr("Formularz kontaktowy", "Contact form")}
              >
                <motion.div
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                />

                <motion.div
                  className="relative z-10 w-full max-w-lg glass-panel border border-terminal-border rounded-2xl shadow-panel overflow-hidden"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Pasek tytułowy jak terminal */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-terminal-border bg-terminal-bg/80">
                    <span className="w-3 h-3 rounded-full bg-bear/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-bull/80" />
                    <span className="ml-3 font-mono text-xs text-terminal-text tracking-wider">
                      {tr("~/kontakt — nowa wiadomość", "~/contact — new message")}
                    </span>
                    <button
                      type="button"
                      onClick={close}
                      aria-label={tr("Zamknij", "Close")}
                      className="ml-auto text-terminal-text hover:text-terminal-highlight text-xl leading-none px-1"
                    >
                      ×
                    </button>
                  </div>

                  <div className="p-6 sm:p-8">
                    {status === "ok" ? (
                      <div className="text-center py-6">
                        <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-bull/50 flex items-center justify-center text-bull text-2xl shadow-neon-green">
                          ✓
                        </div>
                        <h3 className="text-xl font-bold text-terminal-highlight mb-2">
                          {tr("Wysłane!", "Sent!")}
                        </h3>
                        <p className="text-terminal-text text-sm leading-relaxed">
                          {tr(
                            "Dzięki za wiadomość — odezwę się na podany adres najszybciej, jak się da.",
                            "Thanks for your message — I'll get back to you at the address you gave as soon as I can."
                          )}
                        </p>
                        <button
                          type="button"
                          onClick={close}
                          className="mt-6 px-6 py-3 bg-terminal-bg border border-terminal-border rounded font-mono text-sm uppercase tracking-wider text-terminal-highlight hover:border-bull hover:text-bull transition-colors"
                        >
                          {tr("Zamknij", "Close")}
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={onSubmit} className="flex flex-col gap-4">
                        <div>
                          <div className="font-mono text-bull text-xs uppercase tracking-wider mb-3">
                            {tr(
                              "Napisz do mnie — odpowiem na Twój e-mail",
                              "Write to me — I'll reply to your email"
                            )}
                          </div>
                        </div>

                        {/* Honeypot — ukryte przed ludźmi, łapie boty */}
                        <input
                          type="text"
                          name="company"
                          tabIndex={-1}
                          autoComplete="off"
                          className="hidden"
                          aria-hidden="true"
                        />

                        <label className="flex flex-col gap-1.5">
                          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-terminal-text">
                            {tr("Imię i nazwisko / firma", "Name / company")}
                          </span>
                          <input
                            name="name"
                            type="text"
                            required
                            maxLength={120}
                            placeholder={tr("Jan Kowalski / Acme sp. z o.o.", "John Smith / Acme Inc.")}
                            className={inputClass}
                          />
                        </label>

                        <label className="flex flex-col gap-1.5">
                          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-terminal-text">
                            {tr("Twój e-mail", "Your email")}
                          </span>
                          <input
                            name="email"
                            type="email"
                            required
                            placeholder={tr("jan@firma.pl", "john@company.com")}
                            className={inputClass}
                          />
                        </label>

                        <label className="flex flex-col gap-1.5">
                          <span className="font-mono text-[0.7rem] uppercase tracking-widest text-terminal-text">
                            {tr("Wiadomość", "Message")}
                          </span>
                          <textarea
                            name="message"
                            required
                            rows={5}
                            maxLength={5000}
                            placeholder={tr("Cześć! Mamy ofertę / projekt...", "Hi! We have an offer / project...")}
                            className={`${inputClass} resize-none`}
                          />
                        </label>

                        {status === "error" && (
                          <p className="text-bear text-sm font-mono">{error}</p>
                        )}

                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="mt-1 px-6 py-3.5 bg-bull text-[#030712] font-bold rounded font-mono text-sm uppercase tracking-wider hover:bg-[#00e68a] hover:shadow-neon-green-intense transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {status === "sending"
                            ? tr("Wysyłanie…", "Sending…")
                            : tr("Wyślij wiadomość", "Send message")}
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
