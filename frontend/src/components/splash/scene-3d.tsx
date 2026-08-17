"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/mascote-v1.glb";
useGLTF.preload(MODEL_URL);

export type SplashPhase = "enter" | "float" | "exit";

function easeOutBack(x: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function Mascote({
  phase,
  onReady,
}: {
  phase: SplashPhase;
  onReady: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_URL);
  const phaseStart = useRef(0);
  const lastPhase = useRef<SplashPhase>("enter");

  // glb parseado e cena montada — libera a fase "enter" no pai
  useEffect(() => onReady(), [onReady]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.getElapsedTime();
    if (lastPhase.current !== phase) {
      lastPhase.current = phase;
      phaseStart.current = t;
    }
    const pt = t - phaseStart.current;

    if (phase === "enter") {
      const k = Math.min(pt / 0.8, 1);
      g.scale.setScalar(0.25 + 0.75 * easeOutBack(k));
      g.rotation.y = -Math.PI * 0.75 * (1 - k);
      g.position.y = 0;
    } else if (phase === "float") {
      g.scale.setScalar(1);
      g.position.y = Math.sin(pt * 2.2) * 0.045;
      g.rotation.y = Math.sin(pt * 1.4) * 0.06;
    } else {
      const k = Math.min(pt / 0.45, 1);
      g.scale.setScalar(1 + 0.15 * k);
    }
  });

  return (
    <group ref={group} scale={0.25}>
      {/* bbox do glb: x -0.55..0.43, y 0..0.95 — recentra o modelo na origem
          para o giro/flutuação acontecerem em torno do centro visual */}
      <group position={[0.06, -0.48, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

export default function Scene3D({
  phase,
  onReady,
  onError,
}: {
  phase: SplashPhase;
  onReady: () => void;
  onError: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.7], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      onError={onError}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 4, 3]} intensity={2.2} />
      <directionalLight position={[-3, 1, -2]} intensity={0.6} color="#C9A961" />
      <Mascote phase={phase} onReady={onReady} />
    </Canvas>
  );
}
