"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Rozszerzamy strefę wyzwalania 300px poniżej viewportu — sekcja
      // odsłania się ZANIM do niej dojedziesz, więc nie widać pustki.
      rootMargin: "0px 0px 300px 0px",
      threshold: 0, // wystarczy, że jakikolwiek fragment wejdzie w strefę
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target); // raz odsłonięte — przestań obserwować
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    // Trigger animation for hero section immediately
    const timeout = setTimeout(() => {
      document.getElementById("hero")?.classList.add("active");
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
