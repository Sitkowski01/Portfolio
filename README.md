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

## Decyzje projektowe

**Eksport statyczny, bo hosting jest współdzielony.** Strona stoi na zwykłym
`public_html` bez Node'a, więc `output: "export"` nie jest tu preferencją, tylko
warunkiem. Konsekwencje widać w konfiguracji: `images.unoptimized` (optymalizator
Next wymaga serwera, więc zdjęcia muszą być przygotowane wcześniej) i
`trailingSlash` (każda podstrona jako katalog z `index.html` — bezpieczniejsze
pod Apache). Cena: nie ma tras API, odświeżania przyrostowego ani renderowania
na żądanie. Dla portfolio, które zmienia się kilka razy w roku, to dobry układ.

**Scena 3D ma trzy wyjścia awaryjne, nie jedno.** Animowana postać to
najcięższy element strony, więc:

- `prefers-reduced-motion` przełącza na wersję statyczną,
- brak WebGL też — zamiast pustego prostokąta pojawia się obraz,
- `dpr` jest ograniczone do `[1, 1.75]`, bo na ekranach z trzykrotną gęstością
  pikseli renderowanie w pełnej rozdzielczości zabija płynność bez widocznej różnicy.

Portfolio, które zawiesza telefon rekrutera, działa przeciwko sobie.

**Nawigacja z klawiatury jako pierwszy sposób, nie dodatek.** Paleta poleceń pasuje
do konwencji terminala, ale ma też prostszy powód: na stronie jednoekranowej
z długim przewijaniem szukanie sekcji myszą jest wolniejsze niż wpisanie jej nazwy.

## Modele 3D

Narzędzie eksportuje każdą animację jako osobny plik ważący kilkadziesiąt megabajtów,
z powtórzonym meszem i teksturami. `scripts/merge-avatar.mjs` bierze mesz i szkielet raz,
dokleja do niego wyłącznie ścieżki animacji z pozostałych plików, usuwa duplikaty
i kompresuje tekstury. Wynik to jeden plik zamiast kilkuset megabajtów.

Źródła animacji leżą lokalnie i są wyłączone z repozytorium — wersjonowany jest tylko
scalony wynik w `public/avatar/`.

## Czego tu nie ma

- **Brak testów automatycznych.** Ryzyko na tej stronie to wygląd i płynność, a nie
  logika — jednostkowe asercje nie złapałyby ani jednego, ani drugiego.
- **Treść projektów jest w kodzie**, nie w CMS-ie. Dwanaście pozycji aktualizowanych
  kilka razy w roku nie uzasadnia panelu ani bazy.
- **Źródła animacji 3D są poza repozytorium** — wersjonowany jest wyłącznie scalony
  wynik. Odtworzenie modelu od zera wymaga plików źródłowych, których tu nie ma;
  `npm run build:avatar` działa tylko lokalnie.
