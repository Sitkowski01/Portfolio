"use client";

import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, ContactShadows } from "@react-three/drei";
import { MODEL_URL, SCENES, SCENE_COUNT, AVATAR_CLIP, AVATAR_HOME } from "./scenes";

// Bez useGLTF.preload na poziomie modułu — pobierałby 11 MB także w trybie
// statycznym (reduced-motion / brak WebGL). Suspense w Canvas startuje pobieranie
// i tak od razu, bo sekcja jest na górze strony.

const POS_LAMBDA = 3.2; // tempo dampowania pozycji
const ROT_LAMBDA = 3.0;
const SCALE_LAMBDA = 3.0;
const GROUND_Y = 0;

type Props = {
  progress: MutableRefObject<number>;
  onReady?: () => void;
};

export function AvatarController({ progress, onReady }: Props) {
  const group = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);

  // ── Animacja W MIEJSCU: usuwamy ścieżki translacji (root motion), zostają
  //    same rotacje kości. Inaczej biodra „odjeżdżają" i avatar dryfuje. ──
  const inPlaceClips = useMemo(
    () =>
      animations.map((clip) => {
        const c = clip.clone();
        c.tracks = c.tracks.filter((t) => !t.name.endsWith(".position"));
        return c;
      }),
    [animations]
  );

  const { actions } = useAnimations(inPlaceClips, group);

  // ── Normalizacja modelu: wysokość = 1, stopy na y=0, środek x/z ──
  const model = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    scene.scale.setScalar(1 / (size.y || 1));
    box.setFromObject(scene);
    const c = box.getCenter(new THREE.Vector3());
    scene.position.x -= c.x;
    scene.position.z -= c.z;
    scene.position.y -= box.min.y; // stopy dokładnie na y=0
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.frustumCulled = false;
      }
    });
    return scene;
  }, [scene]);

  // ── Start: odpal animację w nieskończonej pętli, w stałym tempie ──
  useEffect(() => {
    const a = actions[AVATAR_CLIP];
    if (a) {
      a.setLoop(THREE.LoopRepeat, Infinity);
      a.reset().fadeIn(0.4).play();
    }
    onReady?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions]);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const dt = Math.min(delta, 0.05);

    const p = progress.current;

    const idx = Math.max(
      0,
      Math.min(Math.floor(p * SCENE_COUNT), SCENE_COUNT - 1)
    );
    const av = SCENES[idx].avatar;

    // ── Avatar tylko tam, gdzie postaci nie ma już w grafice (scena 10) ──
    if (!av) {
      g.visible = false;
      if (shadow.current) shadow.current.visible = false;
      return;
    }
    g.visible = true;
    if (shadow.current) shadow.current.visible = true;

    // ── Osadzenie sceny → płynny transform (pozycja świata, prawa strona) ──
    const pos = av.position;
    const D = THREE.MathUtils.damp;
    g.position.x = D(g.position.x, pos.x, POS_LAMBDA, dt);
    g.position.y = D(g.position.y, pos.y, POS_LAMBDA, dt);
    g.position.z = D(g.position.z, pos.z, POS_LAMBDA, dt);
    g.rotation.y = D(g.rotation.y, av.rotationY, ROT_LAMBDA, dt);
    g.scale.setScalar(D(g.scale.x, av.scale, SCALE_LAMBDA, dt));

    if (shadow.current) {
      shadow.current.position.x = g.position.x;
      shadow.current.position.z = g.position.z;
    }
  });

  return (
    <>
      <group
        ref={group}
        visible={false}
        position={[AVATAR_HOME.x, AVATAR_HOME.y, AVATAR_HOME.z]}
      >
        <primitive object={model} />
      </group>
      <group ref={shadow} position={[0, GROUND_Y + 0.01, 0]}>
        <ContactShadows
          scale={3.2}
          blur={2.8}
          far={3}
          opacity={0.6}
          color="#000000"
          resolution={512}
        />
      </group>
    </>
  );
}
