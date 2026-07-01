// ─────────────────────────────────────────────────────────────────────────
// SCENES — jedyne źródło prawdy dla scrollytellingu.
// Każda scena = pełnoekranowe TŁO (grafika z postacią albo wideo) + 1–2 bloki
// tekstu (lewa strona) + ewentualny avatar 3D + typ przejścia.
//
// TŁO (`media`):
//   - sceny 1–9: statyczna grafika (postać wkomponowana w obraz),
//   - scena 10:  wideo (finał) + avatar 3D na wierzchu.
//
// AVATAR 3D (`avatar`) — TYLKO tam, gdzie postaci NIE ma już w grafice
// (czyli scena 10). Gdzie `avatar` jest pominięty, model 3D jest ukryty.
//   `position`  — {x,y,z} w świecie (x>0 = prawa, y=0 = stopy na podłodze).
//   `scale`     — wysokość świata avatara.
//   `rotationY` — obrót (ujemny = lekko 3/4 ku widzowi/lewej).
// Klip chodu „Walking" gra w miejscu, tempo napędza scroll (AvatarController).
//
// `transition: "portal"` zapala krótki rozbłysk (obrony / rdzeń portfolio).
// ─────────────────────────────────────────────────────────────────────────

export type ClipName = "Walking";

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
  /** Obecny tylko tam, gdzie pokazujemy model 3D (scena 10). */
  avatar?: AvatarConfig;
};

export const MODEL_URL = "/avatar/avatar-story.glb";
/** Jedyny klip — chód, grany w miejscu i napędzany scrollem. */
export const WALK_CLIP: ClipName = "Walking";
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

// Osadzenie avatara 3D (tylko scena 10). x większy = bardziej w prawo.
const A = (
  x = 2.4,
  scale = 2.0,
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
    media: img(4),
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
    media: img(6),
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
    media: img(8),
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
    media: img(9),
    captions: [
      {
        title: { pl: "Potem przyszła praca, która nie była zła.", en: "Then came a job that wasn't bad." },
        body: { pl: "Ale z czasem coraz mocniej czułem, że to nie jest kierunek, którego szukałem przez lata.", en: "But over time I felt more and more that it wasn't the direction I'd been searching for over the years." },
      },
      {
        title: { pl: "Najtrudniejsza była rutyna.", en: "The hardest part was the routine." },
        body: { pl: "Powtarzalność dni i poczucie, że oddalam się od tego, co naprawdę chciałem robić.", en: "The sameness of the days and the feeling that I was drifting from what I really wanted to do." },
      },
    ],
  },
  {
    id: 6,
    label: { pl: "06 / Portfolio", en: "06 / Portfolio" },
    media: vid(10),
    transition: "portal",
    avatar: A(),
    captions: [
      {
        title: { pl: "Dlatego powstało to portfolio.", en: "That's why this portfolio exists." },
        body: { pl: "Nie jako ozdoba. Jako próba nazwania kierunku, którego szukałem przez lata.", en: "Not as decoration. As an attempt to name the direction I'd searched for over the years." },
      },
      {
        title: { pl: "Wolę budować, niż czekać.", en: "I'd rather build than wait." },
        body: { pl: "Web, mobile i AI — od pierwszego szkicu po wdrożenie.", en: "Web, mobile and AI — from the first sketch to deployment." },
        cta: { pl: "ENTER PORTFOLIO", en: "ENTER PORTFOLIO" },
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
  SCENES.forEach((scene, i) => {
    const start = i * span;
    const n = scene.captions.length;
    scene.captions.forEach((c, j) => {
      out.push({
        ...c,
        range: [start + (span * j) / n, start + (span * (j + 1)) / n],
        sceneLabel: scene.label,
        sceneId: scene.id,
      });
    });
  });
  return out;
}
