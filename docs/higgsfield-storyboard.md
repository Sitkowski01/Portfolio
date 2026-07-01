# StoryIntro — storyboard + prompty Higgsfield

Cel: zastąpić model 3D w `components/StoryIntro.tsx` jednym kinowym klipem przewijanym
scrollem (scroll-scrubbing). Avatar = postać z `avatar.png` (mężczyzna, granatowa
bluza z kapturem, szorty, białe sneakersy). Klimat = "trading terminal / cyberpunk HUD".

Narracja (jak akcja, która idzie od IPO do All Time High): avatar jako bohater,
świat wokół niego morfuje przez epoki — od pierwszej linijki kodu po Web · Mobile · AI.
Pracę robi przede wszystkim KAMERA (Higgsfield to jego siła), nie pełny chód postaci
(pełny walk w AI wideo daje artefakty).

---

## Stałe art-direction (wklej do KAŻDEGO promptu)

**Style block (EN):**
> cinematic, dark fintech trading-terminal world, near-black slate background (#030712),
> neon emerald-green accents (#10b981), faint glowing grid floor, volumetric haze,
> thin scanlines, holographic HUD panels and monospace code glyphs floating in space,
> moody rim lighting with a green back-light, shallow depth of field, anamorphic lens,
> high detail, photoreal, 8k, color grade teal-green and deep blue

**Negative prompt (EN):**
> extra limbs, deformed hands, distorted face, multiple people, text captions, subtitles,
> watermark, logo, blurry, low quality, oversaturated, cartoon, warped sneakers, flicker

### ⛔ NAJWAŻNIEJSZE — referencja postaci (bez tego to INNY człowiek)

Każde ujęcie MUSI używać `avatar.png` jako odniesienia tożsamości — inaczej Higgsfield
wygeneruje losowego człowieka, który NIE pasuje do Twojego GLB (to był błąd pierwszej
próby). `avatar.png` to ten sam stylizowany render, z którego powstał GLB, więc użycie go
spina wideo + GLB + avatar w jedną postać.

Jak podać referencję (zależnie od trybu Higgsfielda):
- **Najlepiej:** tryb z **Character / Reference Image** — wgraj `avatar.png` jako referencję
  tożsamości + wpisz prompt sceny (ciemny terminal). Model trzyma twarz/ubranie, zmienia tło.
- **Alternatywa:** najpierw zrób **stylizowany "hero still"** — z `avatar.png` (img-to-img,
  zachowując tożsamość) wygeneruj kadr tej samej postaci w ciemnym terminalowym świecie,
  a potem użyj go jako **Start Frame** klipów. Daje spójną postać I właściwy klimat.
- Unikaj generacji z samego tekstu — to dało "innego pana".

Opis postaci do promptu (dopełnienie referencji):
> the same young man with dark wavy hair, short beard, navy hoodie, navy shorts, white sneakers

**Parametry techniczne:**
- Format **16:9**, min. **1920×1080** (kadruj postać centralnie — bezpieczny crop na mobile portrait).
- 24 lub 30 fps. Każde ujęcie **~4 s**. Razem ~24 s.
- Eksport bez napisów/znaków wodnych (tekst rozdziałów dokłada strona z DOM).
- Zostaw kompozycyjnie wolną stronę kadru zgodnie z kolumną "Miejsce na tekst".

---

## Ujęcia (6 × ~4 s)

### Ujęcie 1 — Prolog · "Cześć, jestem Mikołaj"  (scroll 0.02–0.20)
- **Miejsce na tekst:** góra-środek → postać w dolnej połowie, wyśrodkowana.
- **Kamera (Higgsfield preset):** powolny **Dolly In** z szerokiego na średni plan.
- **Akcja:** avatar materializuje się z cząsteczek/scanlinów w ciemnej pustce, delikatny
  uśmiech, podnosi wzrok. Lekki ruch (oddech), bez chodzenia.
- **Prompt (EN):**
  > Slow dolly-in. The same young man (navy hoodie, shorts, white sneakers) materializes
  > from green particles and scanlines in a dark void, faint glowing grid floor far below,
  > green rim light, he looks up calmly. [+ style block] [+ negative]

### Ujęcie 2 — 01 · IPO FY2023 · "Pierwsza linijka kodu"  (0.20–0.38)
- **Miejsce na tekst:** prawo → postać po **lewej** stronie kadru.
- **Kamera:** łagodny **Arc / Orbit w prawo**.
- **Akcja:** wokół niego unoszą się pierwsze surowe linijki kodu HTML/CSS/JS (zielony
  monospace), w tle startuje pojedynczy świecznik wykresu od niskiego poziomu.
- **Prompt (EN):**
  > Gentle orbit to the right. The same young man stands on the left, raw green monospace
  > HTML and CSS code lines float around him in the dark, a single candlestick chart begins
  > low in the background, depth haze. [+ style block] [+ negative]

### Ujęcie 3 — 02 · Expansion FY2024 · "React zmienia wszystko"  (0.38–0.56)
- **Miejsce na tekst:** lewo → postać po **prawej**.
- **Kamera:** **Dolly Out + lekki Crane Up** (odsłonięcie większej struktury).
- **Akcja:** kod reorganizuje się w świecący graf węzłów / drzewo komponentów (React),
  linie łączą węzły wokół postaci.
- **Prompt (EN):**
  > Dolly out and slight crane up. The same young man on the right, glowing green node graph
  > and component tree connections expand around him in dark space, holographic nodes,
  > volumetric light. [+ style block] [+ negative]

### Ujęcie 4 — 03 · Breakout FY2025 · "Dane jako fundament"  (0.56–0.74)
- **Miejsce na tekst:** prawo → postać po **lewej**.
- **Kamera:** energiczniejszy **Push-In / subtelny FPV** z paralaksą (energia breakoutu).
- **Akcja:** eksplozja wizualizacji danych — kilka rysujących się wykresów liniowych,
  strumienie API jako płynące cząsteczki, glify TypeScript.
- **Prompt (EN):**
  > Dynamic push-in with parallax. The same young man on the left, multiple neon-green line
  > charts draw rapidly, flowing data-stream particles and TypeScript glyphs surge upward,
  > breakout energy, motion blur on background only. [+ style block] [+ negative]

### Ujęcie 5 — 04 · All Time High FY2026 · "Web · Mobile · AI"  (0.74–0.90)
- **Miejsce na tekst:** lewo → postać po **prawej**.
- **Kamera:** duży **Crane / Boom Up** — szeroki reveal.
- **Akcja:** kinowa panorama zielonych "wież danych" i unoszących się paneli UI aplikacji
  (mobile/app store), subtelne motywy AI (sieć neuronowa), pewna postawa avatara.
- **Prompt (EN):**
  > Big crane up reveal. The same young man stands confident on the right, a skyline of
  > glowing green data towers and floating mobile app UI panels and subtle neural-network
  > motifs fills the dark scene, epic scale. [+ style block] [+ negative]

### Ujęcie 6 — Teraz · "Zobacz, dokąd dobiegłem"  (0.88–0.99)
- **Miejsce na tekst:** środek → postać wyśrodkowana.
- **Kamera:** powolny **Dolly do zatrzymania** (settle), kończy na czystym hero-kadrze.
- **Akcja:** świat wycisza się do spokojnej siatki + zielonych blobów (jak tło strony),
  szczytuje świeca ATH; ostatnia klatka ma wtopić się w ciemne tło Hero strony.
- **WAŻNE (handoff):** ostatnia klatka MUSI pasować kadrem do żywego modelu 3D —
  postać **wyśrodkowana, stojąca frontem, plan medium (od kolan/ud w górę)**, ciemne tło,
  zielony rim-light od tyłu. Dzięki temu crossfade wideo→WebGL jest niewidoczny.
- **Prompt (EN):**
  > Slow dolly to a gentle stop, settling on a clean centered medium hero framing of the
  > same young man standing front-facing, calm grid floor and soft green glow, green
  > back rim light, a peaking all-time-high candlestick behind him, dark background. [+ style] [+ negative]

---

## Finale — handoff do żywego modelu 3D (reużywamy OBECNY model)

Decyzja: **nie tworzymy nowego modelu** — w finale używamy istniejącego
`public/avatar-walk.glb` (Meshy). Bez Rodina, bez Mixamo.

Jak to zagra:
1. Wideo jest scrubowane scrollem przez beaty 1–5 (Ujęcia 1–5).
2. W ostatnim beacie (Ujęcie 6, ~0.9→1.0) **przejście glitch/digitalizacja**: postać z
   wideo rozsypuje się na zielone skanlinie i cząsteczki, po czym "składa się" w
   holograficzny render modelu 3D (GLB) na canvasie WebGL.
3. Model stoi **idle** (subtelny oddech/kołysanie) z opcjonalnym **obrotem myszą** —
   NIE chodzi, nie jest napędzany scrollem. To "żywa" nagroda na końcu podróży.
4. Środowisko 3D (siatka, cień-plama, zielony rim-light) już jest w `StoryIntro` —
   ustawimy kamerę/światło tak, by pasowały do ostatniej klatki wideo (patrz Ujęcie 6).

Dlaczego glitch, a nie zwykły fade: wideo to fotoreal, GLB to stylizowana siatka —
proste przenikanie ujawniłoby różnicę mediów. Glitch zamienia to w celowy efekt
"digitalizacji mnie" (świat = terminal), maskuje przeskok i wygląda premium.

Dla mnie (kod): scrub wideo dla 0→~0.9. W 0.9→1.0 nakładka glitch (skanlinie + szum +
RGB-split + rozpad na cząsteczki), malejąca opacity wideo i rosnąca canvasa WebGL;
model "składa się" (np. cząsteczki/dissolve shader albo prościej: scale/opacity + green
wireframe → solid). Model wyśrodkowany, normalizacja jak teraz (MODEL_HEIGHT), idle +
orbit. Fallback reduced-motion = statyczny plakat (ostatnia klatka) + tekst, bez glitcha.

---

## Sklejka i przekazanie do kodu

1. Wygeneruj 6 ujęć (każde z `avatar.png` jako referencją). Dąż do spójnego kadru na
   styku ujęć (koniec jednego ≈ początek następnego), żeby przejścia były gładkie.
2. Sklej w jeden master ~24 s (CapCut / Premiere / `ffmpeg`), ewentualnie 150–200 ms
   crossfade między ujęciami.
3. Eksport masteru: **MP4 H.264, 16:9, 1080p**. Dla płynnego scrubbingu przy integracji
   przekoduję go z gęstymi keyframe'ami (`-g 1`) albo zrobimy sekwencję klatek na mobile.
4. Wrzuć plik do `public/` (np. `public/story.mp4`) i daj znać — wtedy przerabiam
   `StoryIntro` ze scrubbingu modelu 3D na scrubbing wideo (z fallbackiem reduced-motion
   i wariantem mobilnym), zachowując wszystkie 5 beatów, fade tekstu i "Pomiń intro".

## Test przed produkcją
Najpierw wygeneruj **samo Ujęcie 1**, żeby sprawdzić, czy twarz/ubranie trzymają spójność
i czy klimat gra. Dopiero potem reszta — oszczędza kredyty.
