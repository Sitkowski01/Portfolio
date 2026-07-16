// ─────────────────────────────────────────────────────────────────────────
// SCENES — jedyne źródło prawdy dla scrollytellingu.
// Każda scena = pełnoekranowe TŁO (grafika z postacią albo wideo) + 1–2 bloki
// tekstu (lewa strona) + ewentualny avatar 3D + typ przejścia.
//
// TŁO (`media`):
//   - sceny 1–5: statyczna grafika (postać wkomponowana w obraz),
//   - scena 6:   wideo (finał) + avatar 3D na wierzchu.
//
// AVATAR 3D (`avatar`) — TYLKO tam, gdzie postaci NIE ma już w grafice
// (czyli scena 6). Gdzie `avatar` jest pominięty, model 3D jest ukryty.
//   `position`  — {x,y,z} w świecie (x>0 = prawa, y=0 = stopy na podłodze).
//   `scale`     — wysokość świata avatara.
//   `rotationY` — obrót (ujemny = lekko 3/4 ku widzowi/lewej).
// Klip avatara gra w miejscu, w nieskończonej pętli (AvatarController).
//
// `transition: "portal"` zapala krótki rozbłysk (obrony / rdzeń portfolio).
// ─────────────────────────────────────────────────────────────────────────

export type ClipName = "Big_Wave_Hello";

export type Loc = { pl: string; en: string };

export type CaptionData = {
  title: Loc;
  body: Loc;
  cta?: Loc;
};

export type SceneMedia = {
  kind: "image" | "video";
  src: string;
};

export type AvatarConfig = {
  /** Pozycja w świecie (x>0 = prawa strona, y=0 = stopy na podłodze). */
  position: { x: number; y: number; z: number };
  /** Wysokość avatara w jednostkach świata. */
  scale: number;
  /** Obrót Y (rad). */
  rotationY: number;
};

export type Scene = {
  id: number;
  label: Loc;
  media: SceneMedia;
  captions: CaptionData[];
  transition?: "soft" | "portal";
  /** Obecny tylko tam, gdzie pokazujemy model 3D (scena 6). */
  avatar?: AvatarConfig;
};

export const MODEL_URL = "/avatar/avatar-story.glb";
/** Jedyny klip w modelu — grany w zwykłej pętli (bez sprzężenia ze scrollem). */
export const AVATAR_CLIP: ClipName = "Big_Wave_Hello";
/** Pozycja startowa modelu (zanim damp dojdzie do sceny z avatarem). */
export const AVATAR_HOME = { x: 2.4, y: 0, z: 0.5 };

const img = (id: number): SceneMedia => ({
  kind: "image",
  src: `/story/scenes/Scena_${id}.webp`,
});
const vid = (id: number): SceneMedia => ({
  kind: "video",
  src: `/story/scenes/Scena_${id}.mp4`,
});

// Osadzenie avatara 3D (tylko scena 6). x większy = bardziej w prawo.
const A = (
  x = 2.4,
  scale = 3.0,
  rotationY = -0.5,
  z = 0.5,
  y = 0
): AvatarConfig => ({ position: { x, y, z }, scale, rotationY });

export const SCENES: Scene[] = [
  {
    id: 1,
    label: { pl: "01 / Rozterki", en: "01 / Doubts" },
    media: img(1),
    transition: "soft",
    captions: [
      {
        title: { pl: "Zanim pojawił się plan, była niepewność.", en: "Before there was a plan, there was uncertainty." },
        body: { pl: "Nie szukałem tylko kierunku. Szukałem też siebie.", en: "I wasn't just looking for a direction. I was also looking for myself." },
      },
    ],
  },
  {
    id: 2,
    label: { pl: "02 / Raven IT", en: "02 / Raven IT" },
    media: img(2),
    captions: [
      {
        title: { pl: "Pierwsze praktyki zmieniły perspektywę.", en: "My first internship changed my perspective." },
        body: { pl: "Strona przestała być zadaniem. Stała się czymś, co ktoś naprawdę zobaczy i kliknie.", en: "A website stopped being an assignment. It became something someone would actually see and click." },
      },
    ],
  },
  {
    id: 3,
    label: { pl: "03 / GlobalLogic", en: "03 / GlobalLogic" },
    media: img(3),
    captions: [
      {
        title: { pl: "Staż pokazał mi większy świat IT.", en: "The internship showed me a bigger IT world." },
        body: { pl: "Kod był tylko częścią całości. Był jeszcze proces, zespół, review, build, deploy i odpowiedzialność.", en: "Code was only part of the whole. There was also process, team, reviews, builds, deploys and responsibility." },
      },
    ],
  },
  {
    id: 4,
    label: { pl: "04 / Obrona magisterki", en: "04 / Master's defense" },
    media: img(4),
    transition: "portal",
    captions: [
      {
        title: { pl: "Obrona magisterki zamknęła długi etap.", en: "Defending my master's closed a long chapter." },
        body: { pl: "Dyplom był końcem studiów — nie końcem szukania kierunku.", en: "The diploma was the end of my studies — not the end of the search for a direction." },
      },
    ],
  },
  {
    id: 5,
    label: { pl: "05 / Leroy · rutyna", en: "05 / Leroy · routine" },
    media: img(5),
    captions: [
      {
        title: { pl: "Potem przyszła praca, która nie była zła.", en: "Then came a job that wasn't bad." },
        body: { pl: "Ale rutyna dnia za dniem przypominała mi, że to jeszcze nie jest kierunek, którego szukałem przez te wszystkie lata.", en: "But the day-after-day routine kept reminding me this still wasn't the direction I'd been searching for all those years." },
      },
    ],
  },
  {
    id: 6,
    label: { pl: "06 / Portfolio", en: "06 / Portfolio" },
    media: vid(6),
    transition: "portal",
    avatar: A(),
    captions: [
      {
        title: { pl: "Ten kierunek musiałem zbudować sobie sam.", en: "This direction was one I had to build myself." },
        body: { pl: "Tak powstało to portfolio — moje aplikacje, moje pomysły, mój kod. Zobacz, co potrafię.", en: "That's how this portfolio came to be — my apps, my ideas, my code. See what I can do." },
        cta: { pl: "WEJDŹ DO PORTFOLIO", en: "ENTER PORTFOLIO" },
      },
    ],
  },
];

export const SCENE_COUNT = SCENES.length;

export type Caption = CaptionData & {
  range: [number, number];
  sceneLabel: Loc;
  sceneId: number;
};

/** Spłaszcza sceny do bloków tekstu z globalnymi zakresami scrolla. */
export function buildCaptions(): Caption[] {
  const out: Caption[] = [];
  const span = 1 / SCENE_COUNT;
  // Przesunięcie o pół sceny w górę: scena 1 „siedzi" dokładnie na p=0 (górze),
  // dzięki czemu kotwice są równo co 1/N i pierwszy swipe pokonuje jedną scenę,
  // nie 1,5. Musi być zgodne z `local = smooth*N + 0.5` w ScrollStoryImpl.
  const SHIFT = span / 2;
  SCENES.forEach((scene, i) => {
    const start = i * span;
    const n = scene.captions.length;
    scene.captions.forEach((c, j) => {
      out.push({
        ...c,
        range: [
          start + (span * j) / n - SHIFT,
          start + (span * (j + 1)) / n - SHIFT,
        ],
        sceneLabel: scene.label,
        sceneId: scene.id,
      });
    });
  });
  return out;
}
