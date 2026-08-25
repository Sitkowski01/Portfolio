# sitekmikolaj.pl — moje portfolio

Jednostronicowe portfolio zbudowane w Next.js, z motywem terminala giełdowego:
projekty prezentowane jako pozycje w portfelu, animowany pasek notowań i paleta
poleceń zamiast klasycznego menu. Eksportowane statycznie, hostowane na zwykłym
serwerze współdzielonym.

**Na żywo:** [sitekmikolaj.pl](https://sitekmikolaj.pl)

## Co jest w środku

**Dwanaście projektów** — każdy z opisem, stackiem, zrzutami ekranu i odnośnikiem
do wersji na żywo albo do dokumentu koncepcyjnego opisującego produkt.

**Scrollytelling 3D** — animowana postać prowadzona przez kolejne sceny w miarę
przewijania strony, na Three.js i React Three Fiber. Model powstaje z kilkunastu
osobnych animacji sklejanych w jeden plik przez własny skrypt budujący.

**Paleta poleceń** — nawigacja z klawiatury, w konwencji terminala.

**Dodatkowo:** przełącznik języka, formularz kontaktowy, sekcja umiejętności
z interaktywną klawiaturą, animowany pasek notowań, karty 3D reagujące na kursor
i sekwencja startowa w stylu bootowania systemu.

## Stack

| Warstwa | Technologie |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Style | Tailwind CSS |
| Animacje | Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| Przetwarzanie modeli | glTF-Transform, sharp |
| Wdrożenie | statyczny eksport do `out/`, hosting współdzielony |

## Uruchomienie

```bash
npm i
npm run dev            # serwer deweloperski
npm run build          # eksport statyczny do out/
npm run build:avatar   # przebudowa modelu 3D ze źródeł
```

`npm run build` generuje katalog `out/` gotowy do wgrania na `public_html` —
bez serwera Node, z każdą podstroną jako osobnym katalogiem z `index.html`.

## Struktura

```
app/                  layout, strona główna, metadane SEO, obrazy OG
components/           sekcje strony i komponenty współdzielone
components/scrollstory/  sceny i logika animacji 3D
public/projects/      zrzuty ekranu i dokumenty koncepcyjne projektów
scripts/merge-avatar.mjs  scalanie animacji w jeden model
```

## Modele 3D

Narzędzie eksportuje każdą animację jako osobny plik ważący kilkadziesiąt megabajtów,
z powtórzonym meszem i teksturami. `scripts/merge-avatar.mjs` bierze mesz i szkielet raz,
dokleja do niego wyłącznie ścieżki animacji z pozostałych plików, usuwa duplikaty
i kompresuje tekstury. Wynik to jeden plik zamiast kilkuset megabajtów.

Źródła animacji leżą lokalnie i są wyłączone z repozytorium — wersjonowany jest tylko
scalony wynik w `public/avatar/`.
