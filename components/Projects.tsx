"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import ProjectModal from "./ProjectModal";
import { useTr } from "./i18n";

export type Loc = { pl: string; en: string };

export type Project = {
  ticker: string;
  category: Loc;
  change: Loc;
  title: Loc;
  flagship?: boolean;
  edu?: boolean;
  logo?: string;
  tags: string[];
  shortDescription: Loc;
  description: Loc;
  highlights?: Loc[];
  stats?: { label: Loc; value: string }[];
  images: string[];
  demoUrl: string;
  githubUrl: string;
  demoLabel?: Loc;
};

// Screenshoty: wrzuć pliki do public/projects/<nazwa>/ i dopisz ścieżki do images
const projects: Project[] = [
  {
    ticker: "$SCAN",
    category: { pl: "Mobile / Fintech / AI", en: "Mobile / Fintech / AI" },
    change: { pl: "▲ +127.3%", en: "▲ +127.3%" },
    title: { pl: "Skaner Biznesowy", en: "Business Scanner" },
    flagship: true,
    logo: "/projects/scan/logo.webp",
    tags: ["React Native", "Expo", "TypeScript", "Firebase", "Gemini AI", "RevenueCat"],
    shortDescription: {
      pl: "Mobilna apka dla inwestorów — zdjęcie wykresu analizuje AI: trend, formacje i poziomy cenowe.",
      en: "A mobile app for investors — AI analyzes a photo of any chart: trend, patterns and price levels.",
    },
    description: {
      pl: "Mobilna aplikacja dla inwestorów: robisz zdjęcie wykresu z dowolnej platformy, a AI (Gemini 2.5) rozpoznaje trend, formacje i sugerowane poziomy cenowe. Do tego dziennik inwestycji ze statystykami skuteczności, społeczność z moderacją, AI asystent i subskrypcje premium.",
      en: "A mobile app for investors: take a photo of a chart from any platform and AI (Gemini 2.5) recognizes the trend, patterns and suggested price levels. Plus an investment journal with performance stats, a moderated community, an AI assistant and premium subscriptions.",
    },
    highlights: [
      { pl: "Analiza wykresów AI — trend, formacje, poziomy cenowe", en: "AI chart analysis — trend, patterns, price levels" },
      { pl: "Dziennik inwestycji: skuteczność, P&L, serie zysków", en: "Investment journal: win rate, P&L, profit streaks" },
      { pl: "Społeczność z reakcjami, komentarzami i moderacją", en: "Community with reactions, comments and moderation" },
      { pl: "Subskrypcje premium (RevenueCat + Google Play)", en: "Premium subscriptions (RevenueCat + Google Play)" },
    ],
    stats: [
      { label: { pl: "Ekrany", en: "Screens" }, value: "20+" },
      { label: { pl: "Serwisy", en: "Services" }, value: "13" },
      { label: { pl: "Backend", en: "Backend" }, value: "Cloud Functions" },
      { label: { pl: "Testy", en: "Tests" }, value: "Jest + coverage" },
    ],
    images: [
      "/projects/scan/feature.webp",
      "/projects/scan/phone-1.webp",
      "/projects/scan/phone-2.webp",
      "/projects/scan/phone-3.webp",
      "/projects/scan/phone-4.webp",
      "/projects/scan/phone-5.webp",
      "/projects/scan/phone-6.webp",
      "/projects/scan/phone-7.webp",
      "/projects/scan/phone-8.webp",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/Sitkowski01/SkanerBiznes",
    demoLabel: { pl: "Wkrótce w Google Play", en: "Coming to Google Play" },
  },
  {
    // Screeny: wrzuć do public/projects/magisterka/ i dopisz ścieżki do `images`
    // (pusta tablica = placeholder z tickerem).
    ticker: "$MGR",
    category: { pl: "Praca magisterska · AI / Full-stack", en: "Master's thesis · AI / Full-stack" },
    change: { pl: "Praca magisterska", en: "Master's thesis" },
    title: { pl: "AI triage medyczny", en: "Medical AI triage" },
    edu: true,
    tags: ["Angular", "TypeScript", "Node.js", "REST API", "MongoDB", "Machine Learning"],
    shortDescription: {
      pl: "Praca magisterska (ZUT) — prototyp full-stack z warstwą ML wspierający triage pacjentów. 90% trafności na 698 formularzach.",
      en: "Master's thesis (ZUT) — a full-stack prototype with an ML layer supporting patient triage. 90% accuracy on 698 forms.",
    },
    description: {
      pl: "Praca magisterska obroniona na ZUT w Szczecinie (specjalizacja UX). Problem: wstępna ocena, którzy pacjenci wymagają pilnej uwagi, jest wolna i podatna na błąd — czy model ML na danych z formularzy realnie wspomoże tę decyzję? Podejście: zebrałem i przetworzyłem 698 formularzy, zbudowałem prototyp full-stack — front w Angular/TypeScript (formularz + wynik), backend w Node.js (REST API), dane w MongoDB — a model klasyfikuje ryzyko i wspiera decyzję triage'ową, całość projektowana human-centered. Wynik: 90% trafności w triage'u i 40% skuteczności w przewidywaniu konkretnej choroby, przy zachowaniu dostępnego, przejrzystego interfejsu.",
      en: "Master's thesis defended at ZUT Szczecin (UX specialization). Problem: initial assessment of which patients need urgent attention is slow and error-prone — can an ML model on form data genuinely support that decision? Approach: I collected and processed 698 forms and built a full-stack prototype — frontend in Angular/TypeScript (form + result), backend in Node.js (REST API), data in MongoDB — with a model that classifies risk and supports the triage decision, all designed human-centered. Result: 90% triage accuracy and 40% accuracy in predicting a specific disease, while keeping an accessible, transparent interface.",
    },
    highlights: [
      { pl: "Zebrane i przetworzone 698 formularzy pacjentów", en: "Collected and processed 698 patient forms" },
      { pl: "Front Angular/TypeScript, backend Node.js (REST API), dane MongoDB", en: "Angular/TypeScript frontend, Node.js (REST API) backend, MongoDB data" },
      { pl: "Model ML klasyfikuje ryzyko i wspiera decyzję triage'ową", en: "ML model classifies risk and supports the triage decision" },
      { pl: "Projektowane human-centered (specjalizacja UX)", en: "Designed human-centered (UX specialization)" },
    ],
    stats: [
      { label: { pl: "Trafność triage'u", en: "Triage accuracy" }, value: "90%" },
      { label: { pl: "Formularzy pacjentów", en: "Patient forms" }, value: "698" },
      { label: { pl: "Przewidywanie choroby", en: "Disease prediction" }, value: "40%" },
      { label: { pl: "Uczelnia", en: "University" }, value: "ZUT" },
    ],
    images: [
      "/projects/magisterka/obrona.webp",
      "/projects/magisterka/krok1.webp",
      "/projects/magisterka/krok2.webp",
      "/projects/magisterka/krok3_p1.webp",
      "/projects/magisterka/krok3_part2.webp",
      "/projects/magisterka/krok4.webp",
      "/projects/magisterka/krok5.webp",
      "/projects/magisterka/wynik_pomaranczowy.webp",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/Sitkowski01/magisterka",
    demoLabel: { pl: "Praca magisterska", en: "Master's thesis" },
  },
  {
    ticker: "$SPLIT",
    category: { pl: "Mobile / Web / Backend", en: "Mobile / Web / Backend" },
    change: { pl: "▲ +18.4%", en: "▲ +18.4%" },
    title: { pl: "SplitDeBill", en: "SplitDeBill" },
    tags: ["NestJS", "Prisma", "Tesseract OCR", "Expo", "NativeWind", "Docker"],
    shortDescription: {
      pl: "Dzielenie rachunków z OCR paragonów — skan, rozpoznanie pozycji i podział kosztów. Backend + mobile + web.",
      en: "Bill splitting with receipt OCR — scan, recognize line items and split costs. Backend + mobile + web.",
    },
    description: {
      pl: "Aplikacja do dzielenia rachunków między znajomymi z OCR paragonów — robisz zdjęcie, a system rozpoznaje pozycje (Tesseract, modele PL + EN) i pozwala rozdzielić koszty między uczestników. Pełny produkt z trzema warstwami: backend API, aplikacja mobilna i panel webowy. Projekt prowadzony metodycznie — z dokumentami audytu funkcji i osobnym planem TODO do wersji 2.",
      en: "An app for splitting bills among friends with receipt OCR — take a photo and the system recognizes line items (Tesseract, PL + EN models) and lets you split costs between participants. A full product with three layers: backend API, mobile app and web panel. Run methodically — with feature-audit documents and a separate TODO plan for v2.",
    },
    highlights: [
      { pl: "OCR paragonów (Tesseract, modele PL + EN)", en: "Receipt OCR (Tesseract, PL + EN models)" },
      { pl: "Trzy warstwy: backend API, aplikacja mobilna, panel web", en: "Three layers: backend API, mobile app, web panel" },
      { pl: "Backend NestJS + Prisma, OCR w kontenerze Docker", en: "NestJS + Prisma backend, OCR in a Docker container" },
      { pl: "Audyt funkcji i plan rozwoju do wersji v2", en: "Feature audit and roadmap to v2" },
    ],
    images: [
      "/projects/split/shot-1.webp",
      "/projects/split/shot-2.webp",
      "/projects/split/shot-3.webp",
      "/projects/split/shot-4.webp",
      "/projects/split/shot-5.webp",
      "/projects/split/shot-6.webp",
      "/projects/split/shot-7.webp",
      "/projects/split/shot-8.webp",
      "/projects/split/shot-9.webp",
    ],
    demoUrl: "#",
    githubUrl: "https://github.com/Sitkowski01/SplitDeBill",
    demoLabel: { pl: "W trakcie", en: "In progress" },
  },
  {
    ticker: "$EXPLORE",
    category: { pl: "Web / Maps / AI / Koncept", en: "Web / Maps / AI / Concept" },
    change: { pl: "◆ Koncept", en: "◆ Concept" },
    title: { pl: "Eksploruj Polskę", en: "Explore Poland" },
    tags: ["Next.js 15", "FastAPI", "PostgreSQL + PostGIS", "Google Maps", "OpenAI", "Docker"],
    shortDescription: {
      pl: "Odkrywanie atrakcji w Polsce — mapa, planer tras, weryfikacja GPS i grywalizacja.",
      en: "Discovering attractions across Poland — a map, route planner, GPS check-ins and gamification.",
    },
    description: {
      pl: "Web app do odkrywania atrakcji turystycznych w Polsce. Mapa z atrakcjami, planer tras, weryfikacja obecności przez GPS, system punktów i grywalizacji oraz reputacja użytkowników. Opisy atrakcji generowane przez AI, baza startowa to m.in. ~79 atrakcji Poznania ze współrzędnymi. Roadmapa rozbita na milestone'y: atrakcje+mapa → auth+wizyty+punkty → planer+zgłoszenia → ISR/SEO+blog.",
      en: "A web app for discovering tourist attractions in Poland. A map of attractions, a route planner, GPS presence verification, a points/gamification system and user reputation. Attraction descriptions generated by AI; the seed database includes ~79 Poznań attractions with coordinates. Roadmap split into milestones: attractions+map → auth+visits+points → planner+submissions → ISR/SEO+blog.",
    },
    highlights: [
      { pl: "Mapa atrakcji + planer tras (Google Maps + Directions)", en: "Attraction map + route planner (Google Maps + Directions)" },
      { pl: "Weryfikacja obecności przez GPS, punkty i grywalizacja", en: "GPS presence verification, points and gamification" },
      { pl: "Backend FastAPI + PostgreSQL 16 z PostGIS", en: "FastAPI backend + PostgreSQL 16 with PostGIS" },
      { pl: "Opisy atrakcji generowane przez OpenAI", en: "Attraction descriptions generated by OpenAI" },
    ],
    images: [
      "/projects/explore/shot-1.webp",
      "/projects/explore/shot-2.webp",
      "/projects/explore/shot-3.webp",
      "/projects/explore/shot-4.webp",
      "/projects/explore/shot-5.webp",
      "/projects/explore/shot-6.webp",
      "/projects/explore/shot-7.webp",
    ],
    demoUrl: "/projects/explore/eksploruj_polske_opis_koncepcji.pdf",
    githubUrl: "https://github.com/Sitkowski01/eksplorujPolske",
    demoLabel: { pl: "Opis koncepcji (PDF)", en: "Concept brief (PDF)" },
  },
  {
    ticker: "$PIXEL",
    category: { pl: "Web / WebGL / Landing", en: "Web / WebGL / Landing" },
    change: { pl: "▲ +42.0%", en: "▲ +42.0%" },
    title: { pl: "Pixel Bites", en: "Pixel Bites" },
    tags: ["React 18", "Vite", "GSAP", "Three.js", "Lenis", "Framer Motion"],
    shortDescription: {
      pl: "Immersyjny landing restauracji w stylu pixel/arcade — smooth scroll, custom cursor i tło 3D WebGL.",
      en: "An immersive restaurant landing in a pixel/arcade style — smooth scroll, custom cursor and a 3D WebGL background.",
    },
    description: {
      pl: "Efektowna strona restauracji w stylu „pixel/arcade”, przepisana z jednoplikowego prototypu HTML na nowoczesny, komponentowy stack 1:1. Pełna immersja: smooth scroll (Lenis), animacje scroll-triggered (GSAP), custom cursor, magnetyczne przyciski, interaktywne menu i tło 3D WebGL (Three.js). Sekcje rozbite na osobne komponenty: Hero, Story, Burger, Menu, Reviews, Events, Location, PixelPass, FAQ i CTA.",
      en: "A striking restaurant site in a “pixel/arcade” style, rewritten from a single-file HTML prototype into a modern, component-based stack 1:1. Full immersion: smooth scroll (Lenis), scroll-triggered animations (GSAP), a custom cursor, magnetic buttons, an interactive menu and a 3D WebGL background (Three.js). Sections split into separate components: Hero, Story, Burger, Menu, Reviews, Events, Location, PixelPass, FAQ and CTA.",
    },
    highlights: [
      { pl: "Smooth scroll (Lenis) + animacje scroll-triggered (GSAP)", en: "Smooth scroll (Lenis) + scroll-triggered animations (GSAP)" },
      { pl: "Custom cursor i magnetyczne przyciski", en: "Custom cursor and magnetic buttons" },
      { pl: "Tło 3D WebGL (Three.js)", en: "3D WebGL background (Three.js)" },
      { pl: "Przepisane z prototypu HTML na komponentowy stack 1:1", en: "Rewritten from an HTML prototype into a component stack 1:1" },
    ],
    images: [
      "/projects/pixelbites/shot-1.webp",
      "/projects/pixelbites/shot-2.webp",
      "/projects/pixelbites/shot-3.webp",
      "/projects/pixelbites/shot-4.webp",
      "/projects/pixelbites/shot-5.webp",
      "/projects/pixelbites/shot-6.webp",
      "/projects/pixelbites/shot-7.webp",
    ],
    demoUrl: "https://pixel-bites-tawny.vercel.app/",
    githubUrl: "https://github.com/Sitkowski01/pixel_bites",
    demoLabel: { pl: "Strona", en: "Website" },
  },
  {
    ticker: "$BISTRO",
    category: { pl: "Web / Landing / UI", en: "Web / Landing / UI" },
    change: { pl: "▲ +24.5%", en: "▲ +24.5%" },
    title: { pl: "Bistro — landing restauracji", en: "Bistro — restaurant landing" },
    tags: ["React 18", "Vite", "Tailwind 4", "Radix UI", "MUI", "Motion"],
    shortDescription: {
      pl: "Elegancki landing restauracji wg projektu Figma — dopracowane komponenty UI i animacje.",
      en: "An elegant restaurant landing based on a Figma design — polished UI components and animations.",
    },
    description: {
      pl: "Landing page restauracji zbudowany na bazie projektu Figma („Unique Landing Page Design”), z bogatym zestawem dopracowanych komponentów UI i animacji. Czysty, produkcyjny frontend z gotowym buildem i konfiguracją deploymentu pod Vercel.",
      en: "A restaurant landing page built from a Figma design (“Unique Landing Page Design”), with a rich set of polished UI components and animations. A clean, production frontend with a ready build and Vercel deployment configuration.",
    },
    highlights: [
      { pl: "Wierne odwzorowanie projektu Figma „Unique Landing Page Design”", en: "Faithful recreation of the “Unique Landing Page Design” Figma" },
      { pl: "Dopracowane komponenty UI (Radix UI + MUI) i animacje (Motion)", en: "Polished UI components (Radix UI + MUI) and animations (Motion)" },
      { pl: "Responsywny layout od mobile po desktop", en: "Responsive layout from mobile to desktop" },
      { pl: "Produkcyjny build z deployem na Vercel", en: "Production build deployed on Vercel" },
    ],
    images: [
      "/projects/bistro/shot-1.webp",
      "/projects/bistro/shot-2.webp",
      "/projects/bistro/shot-3.webp",
      "/projects/bistro/shot-4.webp",
      "/projects/bistro/shot-5.webp",
    ],
    demoUrl: "https://bistro-restaurant-umber.vercel.app/",
    githubUrl: "https://github.com/Sitkowski01/bistroRestaurant",
    demoLabel: { pl: "Strona", en: "Website" },
  },
  {
    ticker: "$RESV",
    category: { pl: "Web App / Booking / Full-Stack", en: "Web App / Booking / Full-Stack" },
    change: { pl: "▲ +37.2%", en: "▲ +37.2%" },
    title: { pl: "System rezerwacji restauracji", en: "Restaurant reservation system" },
    tags: ["React 18", "Vite", "Supabase", "Tailwind 4", "Radix UI", "MUI"],
    shortDescription: {
      pl: "Webowy system rezerwacji stolików z realnym backendem (Supabase) — nie landing, lecz działająca aplikacja.",
      en: "A web table-reservation system with a real backend (Supabase) — not a landing, but a working app.",
    },
    description: {
      pl: "Pełniejszy projekt restauracyjny — webowa aplikacja do rezerwacji stolików z backendem opartym o Supabase (auth + baza). W odróżnieniu od landingów to system z realną logiką: zarządzanie rezerwacjami, dane użytkowników i integracja z bazą. Zbudowany na bazie projektu Figma „Restaurant Reservation Web App”.",
      en: "A more complete restaurant project — a web app for table reservations with a Supabase-based backend (auth + database). Unlike the landings, this is a system with real logic: reservation management, user data and database integration. Built from the “Restaurant Reservation Web App” Figma design.",
    },
    highlights: [
      { pl: "Rezerwacja stolików z realną logiką i danymi", en: "Table booking with real logic and data" },
      { pl: "Backend i autoryzacja na Supabase", en: "Backend and auth on Supabase" },
      { pl: "Zarządzanie rezerwacjami i użytkownikami", en: "Reservation and user management" },
      { pl: "Bazuje na projekcie Figma „Restaurant Reservation”", en: "Based on the “Restaurant Reservation” Figma design" },
    ],
    images: [
      "/projects/reservation/shot-1.webp",
      "/projects/reservation/shot-2.webp",
      "/projects/reservation/shot-3.webp",
      "/projects/reservation/shot-4.webp",
      "/projects/reservation/shot-5.webp",
      "/projects/reservation/shot-6.webp",
    ],
    demoUrl: "https://restaurant-design-ten.vercel.app/",
    githubUrl: "https://github.com/Sitkowski01/restaurantDesign",
    demoLabel: { pl: "Strona", en: "Website" },
  },
  {
    ticker: "$DIAB",
    category: { pl: "Mobile / Health / Koncept", en: "Mobile / Health / Concept" },
    change: { pl: "◆ Koncept", en: "◆ Concept" },
    title: { pl: "Asystent diabetyka", en: "Diabetes assistant" },
    tags: ["React Native", "Expo", "Skan / OCR", "Mapa wkłuć", "Brief PDF"],
    shortDescription: {
      pl: "Mobilny asystent dla osób z cukrzycą — skan sprzętu, inwentarz, mapa miejsc wkłuć i zapasy awaryjne.",
      en: "A mobile assistant for people with diabetes — gear scanning, inventory, an injection-site map and emergency supplies.",
    },
    description: {
      pl: "Mobilny asystent bezpieczeństwa dla osób z cukrzycą („diabetes gear safety assistant”). Skanowanie kodów z opakowań sprzętu, inwentarz wyposażenia, mapa miejsc wkłuć i sensorów, zestawy awaryjne oraz pilnowanie zapasów i terminów. Projekt na etapie gotowego, szczegółowego briefu produktowego z makietami ekranów.",
      en: "A mobile safety assistant for people with diabetes (a “diabetes gear safety assistant”). Scanning codes from equipment packaging, a gear inventory, a map of injection and sensor sites, emergency kits and tracking of supplies and expiry dates. At the stage of a complete, detailed product brief with screen mockups.",
    },
    highlights: [
      { pl: "Skan kodów z opakowań + inwentarz sprzętu", en: "Scanning codes from packaging + gear inventory" },
      { pl: "Mapa miejsc wkłuć i sensorów", en: "Map of injection and sensor sites" },
      { pl: "Zestawy awaryjne i pilnowanie zapasów", en: "Emergency kits and supply tracking" },
      { pl: "Gotowy brief produktowy + makiety ekranów", en: "A complete product brief + screen mockups" },
    ],
    images: [
      "/projects/diabetes/shot-1.webp",
      "/projects/diabetes/shot-2.webp",
      "/projects/diabetes/shot-3.webp",
      "/projects/diabetes/shot-4.webp",
      "/projects/diabetes/shot-5.webp",
      "/projects/diabetes/shot-6.webp",
      "/projects/diabetes/shot-7.webp",
      "/projects/diabetes/shot-8.webp",
      "/projects/diabetes/shot-9.webp",
      "/projects/diabetes/shot-10.webp",
      "/projects/diabetes/shot-11.webp",
      "/projects/diabetes/shot-12.webp",
      "/projects/diabetes/shot-13.webp",
      "/projects/diabetes/shot-14.webp",
    ],
    demoUrl: "/projects/diabetes/asystent_diabetyka_opis_koncepcji.pdf",
    githubUrl: "https://github.com/Sitkowski01/asystentDiabetyka",
    demoLabel: { pl: "Opis koncepcji (PDF)", en: "Concept brief (PDF)" },
  },
  {
    ticker: "$PAIR",
    category: { pl: "Mobile / Relacje / Koncept", en: "Mobile / Relationships / Concept" },
    change: { pl: "◆ Koncept", en: "◆ Concept" },
    title: { pl: "Aplikacja dla par", en: "App for couples" },
    tags: ["React Native", "Expo", "Prywatność", "Brief PDF"],
    shortDescription: {
      pl: "Apka dla par — bezpieczne „odkładanie” trudnych tematów z pełną kontrolą prywatności.",
      en: "An app for couples — safely “parking” difficult topics with full privacy control.",
    },
    description: {
      pl: "Aplikacja dla par o bezpiecznym „odkładaniu” trudnych tematów. Zamiast eskalować kłótnię, zapisujesz prywatną notatkę z kategorią, poziomem prywatności i czasem powrotu — partner widzi tylko to, co świadomie udostępnisz. Etap: dopracowany brief produktowy z koncepcją UI i makietami.",
      en: "An app for couples about safely “parking” difficult topics. Instead of escalating an argument, you save a private note with a category, privacy level and a return time — your partner only sees what you deliberately share. Stage: a polished product brief with a UI concept and mockups.",
    },
    highlights: [
      { pl: "Prywatna notatka z kategorią i poziomem prywatności", en: "A private note with a category and privacy level" },
      { pl: "Ustalany „czas powrotu” do tematu", en: "A set “return time” to the topic" },
      { pl: "Partner widzi tylko to, co świadomie udostępnisz", en: "Your partner only sees what you deliberately share" },
      { pl: "Dopracowany brief produktowy + koncepcja UI", en: "A polished product brief + UI concept" },
    ],
    images: [
      "/projects/couples/shot-1.webp",
      "/projects/couples/shot-2.webp",
      "/projects/couples/shot-3.webp",
      "/projects/couples/shot-4.webp",
      "/projects/couples/shot-5.webp",
      "/projects/couples/shot-6.webp",
      "/projects/couples/shot-7.webp",
      "/projects/couples/shot-8.webp",
    ],
    demoUrl: "/projects/couples/pause_opis_koncepcji.pdf",
    githubUrl: "https://github.com/Sitkowski01/pause",
    demoLabel: { pl: "Opis koncepcji (PDF)", en: "Concept brief (PDF)" },
  },
  {
    ticker: "$MILIO",
    category: { pl: "Mobile / Kids / Koncept", en: "Mobile / Kids / Concept" },
    change: { pl: "◆ Koncept", en: "◆ Concept" },
    title: { pl: "Pamiętnik kreatywności dziecka", en: "A child's creativity journal" },
    tags: ["React Native", "Rysowanie", "Audio", "Fotoksiążka / PDF", "Brief PDF"],
    shortDescription: {
      pl: "Pamiętnik kreatywności dziecka — rysunki i głosowe opowieści składane w fotoksiążkę / PDF.",
      en: "A child's creativity journal — drawings and voice stories assembled into a photo book / PDF.",
    },
    description: {
      pl: "„Creative memory book” — pamiętnik kreatywności dziecka dla rodziców i dzieci w wieku 3–8 lat. Dziecko rysuje i nagrywa głosową opowieść, rodzic dodaje zdjęcie, notatkę i wiek, a aplikacja składa z tego księgę wspomnień / fotoksiążkę / PDF. Etap: kompletny brief produktowy z makietami.",
      en: "A “creative memory book” — a child's creativity journal for parents and kids aged 3–8. The child draws and records a voice story, the parent adds a photo, note and age, and the app assembles it all into a memory book / photo book / PDF. Stage: a complete product brief with mockups.",
    },
    highlights: [
      { pl: "Rysowanie + nagrywanie głosowej opowieści przez dziecko", en: "Drawing + voice-story recording by the child" },
      { pl: "Rodzic dodaje zdjęcie, notatkę i wiek", en: "The parent adds a photo, note and age" },
      { pl: "Generowanie księgi wspomnień / fotoksiążki / PDF", en: "Generating a memory book / photo book / PDF" },
      { pl: "Kompletny brief produktowy z makietami", en: "A complete product brief with mockups" },
    ],
    images: [
      "/projects/milio/shot-1.webp",
      "/projects/milio/shot-2.webp",
      "/projects/milio/shot-3.webp",
      "/projects/milio/shot-4.webp",
      "/projects/milio/shot-5.webp",
    ],
    demoUrl: "/projects/milio/milio_memories_opis_koncepcji.pdf",
    githubUrl: "https://github.com/Sitkowski01/milioMemories",
    demoLabel: { pl: "Opis koncepcji (PDF)", en: "Concept brief (PDF)" },
  },
  {
    ticker: "$CLIP",
    category: { pl: "Mobile / Marketplace / Koncept", en: "Mobile / Marketplace / Concept" },
    change: { pl: "◆ Koncept", en: "◆ Concept" },
    title: { pl: "ClipSell — video marketplace", en: "ClipSell — video marketplace" },
    tags: ["React Native", "Video feed", "Chat", "Marketplace", "Brief PDF"],
    shortDescription: {
      pl: "Video-marketplace — pionowy feed jak Reels, gdzie każdy filmik to oferta. Czat i oferty cenowe.",
      en: "A video marketplace — a vertical feed like Reels where every clip is a listing. Chat and price offers.",
    },
    description: {
      pl: "Marketplace krótkich, pionowych „video-ogłoszeń” — feed jak TikTok/Reels, ale każdy filmik to oferta sprzedaży lub usługi. Filtry, czat, składanie ofert cenowych i panel administracyjny. Etap: szczegółowy brief produktowy z koncepcją ekranów.",
      en: "A marketplace of short, vertical “video listings” — a feed like TikTok/Reels, but every clip is a sale or service offer. Filters, chat, price offers and an admin panel. Stage: a detailed product brief with a screen concept.",
    },
    highlights: [
      { pl: "Pionowy feed video, gdzie każdy klip to oferta", en: "A vertical video feed where every clip is a listing" },
      { pl: "Filtry, czat i składanie ofert cenowych", en: "Filters, chat and price offers" },
      { pl: "Panel administracyjny", en: "Admin panel" },
      { pl: "Szczegółowy brief produktowy z koncepcją ekranów", en: "A detailed product brief with a screen concept" },
    ],
    images: [
      "/projects/clipsell/shot-1.webp",
      "/projects/clipsell/shot-2.webp",
      "/projects/clipsell/shot-3.webp",
      "/projects/clipsell/shot-4.webp",
      "/projects/clipsell/shot-5.webp",
      "/projects/clipsell/shot-6.webp",
      "/projects/clipsell/shot-7.webp",
      "/projects/clipsell/shot-8.webp",
      "/projects/clipsell/shot-9.webp",
      "/projects/clipsell/shot-10.webp",
      "/projects/clipsell/shot-11.webp",
      "/projects/clipsell/shot-12.webp",
    ],
    demoUrl: "/projects/clipsell/clipsell_opis_koncepcji.pdf",
    githubUrl: "https://github.com/Sitkowski01/clipSell",
    demoLabel: { pl: "Opis koncepcji (PDF)", en: "Concept brief (PDF)" },
  },
];

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const reduce = useReducedMotion();
  const tr = useTr();

  // Kaskadowe wejście kart, gdy siatka wjedzie w viewport
  const gridV = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
  };
  const cardV = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 16 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
        },
      };

  return (
    <section id="holdings" className="reveal">
      <SectionHeader
        label={tr("Portfel aktywów", "Asset Holdings")}
        title={tr("Portfolio projektów", "Project Portfolio")}
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={gridV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {projects.map((project, i) => {
          const cover = project.images[0];
          const isConcept = project.change.pl.trim().startsWith("◆");
          const isEdu = project.edu === true;
          const title = tr(project.title.pl, project.title.en);
          return (
            <motion.button
              key={project.ticker}
              variants={cardV}
              whileHover={reduce ? undefined : { y: -6 }}
              data-particle-anchor={i < 3 ? `project-${i + 1}` : undefined}
              onClick={() => setOpen(project)}
              className={`group relative text-left glass-panel rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-[border-color,box-shadow] duration-300 ${
                project.flagship
                  ? "sm:col-span-2 border border-bull/40 shadow-neon-green hover:shadow-neon-green-intense"
                  : isEdu
                    ? "border border-sky-400/40 hover:border-sky-400/70 hover:shadow-[0_0_24px_rgba(56,189,248,0.25)]"
                    : "border border-terminal-border hover:border-bull/60 hover:shadow-neon-green"
              }`}
            >
              {/* COVER — rozmyte tło wypełnia kadr, ostry screen wycentrowany */}
              <div
                className={`relative w-full overflow-hidden bg-terminal-bg ${
                  project.flagship ? "h-56 sm:h-64 lg:h-72" : "h-44 sm:h-48"
                }`}
              >
                {cover ? (
                  <>
                    {/* Placeholder pod ładujący się obrazek — zamiast czarnej
                        pustki widać wyblakły ticker (pulsuje = „ładuję"). */}
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-4xl font-bold text-terminal-border/40 select-none pointer-events-none animate-pulse">
                      {project.ticker}
                    </span>
                    <img
                      src={cover}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-40"
                    />
                    <img
                      src={cover}
                      alt={tr(`Podgląd projektu ${title}`, `Preview of ${title}`)}
                      loading="lazy"
                      className="relative z-10 w-full h-full object-contain p-3 drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-3xl font-bold text-terminal-border select-none">
                      {project.ticker}
                    </span>
                  </div>
                )}

                {/* Siatka HUD + winieta dla czytelności badge'y */}
                <div className="absolute inset-0 z-20 bg-grid-pattern opacity-[0.12] pointer-events-none"></div>
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-terminal-panel via-terminal-panel/10 to-terminal-bg/50 pointer-events-none"></div>

                {/* Ticker + ewentualny logo (pływa na coverze) */}
                <div className="absolute top-3 left-3 z-30 flex items-center gap-2">
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt={`Logo ${title}`}
                      loading="lazy"
                      className="w-8 h-8 rounded-lg border border-white/10 shadow-lg"
                    />
                  )}
                  <span
                    className={`font-mono font-bold text-terminal-highlight [text-shadow:0_1px_6px_rgba(0,0,0,0.9)] ${
                      project.flagship ? "text-xl" : "text-base"
                    }`}
                  >
                    {project.ticker}
                  </span>
                  {project.flagship && (
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-[#030712] bg-bull font-bold px-2 py-0.5 rounded">
                      Flagship
                    </span>
                  )}
                  {isEdu && (
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-sky-400 bg-sky-400/10 border border-sky-400/30 font-bold px-2 py-0.5 rounded">
                      Edu
                    </span>
                  )}
                </div>

                {/* Badge zmiany — zielony dla realnych, stonowany dla konceptów */}
                <span
                  className={`absolute top-3 right-3 z-30 font-mono text-xs px-2 py-1 rounded border backdrop-blur-sm ${
                    isEdu
                      ? "text-sky-400 bg-terminal-bg/80 border-sky-400/50 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                      : isConcept
                        ? "text-terminal-text bg-terminal-bg/80 border-terminal-border"
                        : "text-bull bg-terminal-bg/80 border-bull/50 shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  {tr(project.change.pl, project.change.en)}
                </span>
              </div>

              {/* BODY */}
              <div className="relative flex flex-col gap-3 p-5 flex-1">
                <div>
                  <h3
                    className={`font-bold text-white transition-colors ${
                      isEdu ? "group-hover:text-sky-400" : "group-hover:text-bull"
                    } ${project.flagship ? "font-display text-2xl" : "text-lg"}`}
                  >
                    {title}
                  </h3>
                  <span className="text-xs text-terminal-text uppercase tracking-wider">
                    {tr(project.category.pl, project.category.en)}
                  </span>
                </div>

                <p className="text-terminal-text text-sm leading-relaxed line-clamp-2">
                  {tr(project.shortDescription.pl, project.shortDescription.en)}
                </p>

                <div className="flex flex-wrap gap-1.5 font-mono text-[0.65rem] text-terminal-text mt-auto pt-1">
                  {project.tags.slice(0, project.flagship ? 6 : 4).map((tag) => (
                    <span
                      key={tag}
                      className="bg-terminal-bg/80 border border-terminal-border px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > (project.flagship ? 6 : 4) && (
                    <span className="px-1.5 py-0.5 text-terminal-text/50">
                      +{project.tags.length - (project.flagship ? 6 : 4)}
                    </span>
                  )}
                </div>

                <div className={`flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-widest text-terminal-text/50 transition-colors pt-3 border-t border-terminal-border/50 ${
                  isEdu ? "group-hover:text-sky-400" : "group-hover:text-bull"
                }`}>
                  <span>
                    {project.images.length > 0
                      ? tr(
                          `${project.images.length} screenów + szczegóły`,
                          `${project.images.length} screenshots + details`
                        )
                      : tr("Szczegóły projektu", "Project details")}
                  </span>
                  <span className="text-base leading-none group-hover:translate-x-1 transition-transform">
                    ▸
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      <AnimatePresence>
        {open && (
          <ProjectModal
            key="project-modal"
            project={open}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
