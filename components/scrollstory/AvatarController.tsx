"use client";

import { useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, ContactShadows } from "@react-three/drei";
import { MODEL_URL, SCENES, SCENE_COUNT, WALK_CLIP, AVATAR_HOME } from "./scenes";

// Wstępne pobranie modelu zanim sekcja wejdzie w kadr.
useGLTF.preload(MODEL_URL);

const POS_LAMBDA = 3.2; // tempo dampowania pozycji
const ROT_LAMBDA = 3.0;
const SCALE_LAMBDA = 3.0;
const GROUND_Y = 0;

// Tempo chodu z prędkości scrolla:
const WALK_GAIN = 11; // ile „prędkości scrolla" zamienia się na tempo kroku
const WALK_MIN = 0.15; // minimalne tempo, gdy stoisz (delikatne, nie zamarza)
const WALK_MAX = 1.5; // sufit przy szybkim scrollu
const WALK_SMOOTH = 0.09; // wygładzenie tempa (mniejsze = gładziej)

type Props = {
  progress: MutableRefObject<number>;
  onReady?: () => void;
};

export function AvatarController({ progress, onReady }: Props) {
  const group = useRef<THREE.Group>(null);
  const shadow = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);

  // ── Chód W MIEJSCU: usuwamy ścieżki translacji (root motion), zostają same
  //    rotacje kości. Inaczej biodra „odjeżdżają" i avatar dryfuje w bok. ──
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

  const walkSpeed = useRef(0);
  const lastProgress = useRef(0);

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

  // ── Start: odpal chód w pętli (tempo ustawiamy co klatkę) ──
  useEffect(() => {
    const a = actions[WALK_CLIP];
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
    const vel = Math.abs(p - lastProgress.current) / Math.max(dt, 1e-3);
    lastProgress.current = p;

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

    // ── Tempo chodu = prędkość scrolla (wygładzone, z dolnym progiem) ──
    const targetSpeed = THREE.MathUtils.clamp(
      WALK_MIN + vel * WALK_GAIN,
      WALK_MIN,
      WALK_MAX
    );
    walkSpeed.current += (targetSpeed - walkSpeed.current) * WALK_SMOOTH;
    const act = actions[WALK_CLIP];
    if (act) act.timeScale = walkSpeed.current;

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
