// ─────────────────────────────────────────────────────────────────────────
// MERGE-AVATAR — jednorazowy krok build dla scrollytellingu.
//
// PROBLEM: Meshy eksportuje KAŻDĄ animację jako osobny ~38 MB plik GLB
// (pełny mesh + tekstury powtórzone w każdym). 9 potrzebnych klipów = ~340 MB.
//
// ROZWIĄZANIE: bierzemy mesh + szkielet RAZ (z pliku Walking) i doklejamy do
// niego tylko ścieżki animacji (klipy) z pozostałych plików — bone'y mają te
// same nazwy, więc kanały przepinamy 1:1 po nazwie node'a. Potem dedup/prune
// + kompresja tekstur (sharp → webp, max 1024px). Wynik: jeden ~5–10 MB GLB
// z wszystkimi klipami na jednym szkielecie.
//
// Uruchom:  node scripts/merge-avatar.mjs
// (albo `npm run build:avatar` jeśli dodasz skrypt do package.json)
// ─────────────────────────────────────────────────────────────────────────
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { dedup, prune, textureCompress } from "@gltf-transform/functions";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(
  ROOT,
  "scrolltellying",
  "Meshy_AI_Midnight_Casual_biped"
);
const OUT = path.join(ROOT, "public", "avatar", "avatar-story.glb");
const PREFIX = "Meshy_AI_Midnight_Casual_biped_Animation_";
const SUFFIX = "_withSkin.glb";

// Klucz klipu (nazwa, której użyje runtime) → fragment nazwy pliku.
// Bazą jest Walking (z niego bierzemy mesh + szkielet + jego własny klip).
const BASE_KEY = "Walking";
const CLIPS = {
  Walking: "Walking",
  Walk_Slowly_and_Look_Around: "Walk_Slowly_and_Look_Around",
  Thoughtful_Walk: "Thoughtful_Walk",
  Idle_02: "Idle_02",
  Idle_3: "Idle_3",
  Idle_Turn_Left: "Idle_Turn_Left",
  Idle_Turn_Right: "Idle_Turn_Right",
  Long_Breathe_and_Look_Around: "Long_Breathe_and_Look_Around",
  Short_Breathe_and_Look_Around: "Short_Breathe_and_Look_Around",
};

const fileFor = (frag) => path.join(SRC_DIR, `${PREFIX}${frag}${SUFFIX}`);

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

async function main() {
  // 1) Baza: mesh + szkielet + własny klip
  console.log(`▶ Baza: ${BASE_KEY}`);
  const baseDoc = await io.read(fileFor(CLIPS[BASE_KEY]));
  const baseRoot = baseDoc.getRoot();
  const baseBuffer = baseRoot.listBuffers()[0];

  // Mapa node'ów bazy po nazwie — po niej przepinamy kanały z innych plików
  const nodeByName = new Map();
  for (const node of baseRoot.listNodes()) {
    if (node.getName()) nodeByName.set(node.getName(), node);
  }

  // Nazwij klip bazowy spójnie
  const baseAnims = baseRoot.listAnimations();
  if (baseAnims.length) baseAnims[0].setName(BASE_KEY);
  // usuń ewentualne nadmiarowe klipy z bazy poza pierwszym
  baseAnims.slice(1).forEach((a) => a.dispose());

  let skipped = 0;

  // 2) Doklej klipy z pozostałych plików
  for (const [clipName, frag] of Object.entries(CLIPS)) {
    if (clipName === BASE_KEY) continue;
    const file = fileFor(frag);
    if (!fs.existsSync(file)) {
      console.warn(`  ⚠ brak pliku: ${path.basename(file)} — pomijam`);
      continue;
    }
    console.log(`▶ Klip: ${clipName}`);
    const srcDoc = await io.read(file);
    const srcAnim = srcDoc.getRoot().listAnimations()[0];
    if (!srcAnim) {
      console.warn(`  ⚠ brak animacji w ${path.basename(file)} — pomijam`);
      continue;
    }

    const anim = baseDoc.createAnimation(clipName);

    for (const srcCh of srcAnim.listChannels()) {
      const targetNode = srcCh.getTargetNode();
      if (!targetNode) continue;
      const baseNode = nodeByName.get(targetNode.getName());
      if (!baseNode) {
        // bone, którego nie ma w bazie — nie powinno się zdarzyć (ten sam rig)
        skipped++;
        continue;
      }
      const srcSamp = srcCh.getSampler();

      const input = baseDoc
        .createAccessor()
        .setType(srcSamp.getInput().getType())
        .setArray(srcSamp.getInput().getArray().slice())
        .setBuffer(baseBuffer);

      const output = baseDoc
        .createAccessor()
        .setType(srcSamp.getOutput().getType())
        .setArray(srcSamp.getOutput().getArray().slice())
        .setNormalized(srcSamp.getOutput().getNormalized())
        .setBuffer(baseBuffer);

      const sampler = baseDoc
        .createAnimationSampler()
        .setInput(input)
        .setOutput(output)
        .setInterpolation(srcSamp.getInterpolation());

      const channel = baseDoc
        .createAnimationChannel()
        .setTargetNode(baseNode)
        .setTargetPath(srcCh.getTargetPath())
        .setSampler(sampler);

      anim.addSampler(sampler).addChannel(channel);
    }
  }

  if (skipped) console.warn(`  ⚠ pominięto ${skipped} kanałów (brak node'a w bazie)`);

  // 3) Optymalizacja: scal duplikaty, usuń nieużywane, skompresuj tekstury
  console.log("▶ Optymalizacja (dedup → prune → textureCompress webp/1024)…");
  await baseDoc.transform(
    dedup(),
    prune(),
    textureCompress({
      encoder: sharp,
      targetFormat: "webp",
      resize: [1024, 1024],
    })
  );

  // 4) Zapis
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await io.write(OUT, baseDoc);

  const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
  const clips = baseDoc
    .getRoot()
    .listAnimations()
    .map((a) => a.getName());
  console.log(`\n✅ Zapisano ${path.relative(ROOT, OUT)} — ${mb} MB`);
  console.log(`   Klipy (${clips.length}): ${clips.join(", ")}`);
}

main().catch((e) => {
  console.error("❌ Błąd:", e);
  process.exit(1);
});
