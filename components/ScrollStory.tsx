"use client";

import dynamic from "next/dynamic";

// Canvas R3F + WebGL działają tylko po stronie klienta — wyłączamy SSR,
// żeby uniknąć błędów hydracji i prób renderu na serwerze.
const ScrollStoryImpl = dynamic(() => import("./scrollstory/ScrollStoryImpl"), {
  ssr: false,
});

export default function ScrollStory() {
  return <ScrollStoryImpl />;
}
