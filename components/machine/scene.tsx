"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Environment, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { machine } from "./scroll";
import Monolith from "./monolith";
import { BrowserLayer, KernelLayer, NetworkLayer, SiliconLayer } from "./layers";

/** the two ends of an interpolation, eased */
const smooth = (x: number) => x * x * (3 - 2 * x);

function CameraRig() {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0.2, 0));
  const target = useMemo(() => new THREE.Vector3(), []);
  const want = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const from = machine.from;
    const to = machine.to;
    if (!from || !to) return;

    const f = smooth(machine.t);
    want.set(
      from.pos[0] + (to.pos[0] - from.pos[0]) * f,
      from.pos[1] + (to.pos[1] - from.pos[1]) * f,
      from.pos[2] + (to.pos[2] - from.pos[2]) * f,
    );

    // a breath of float and a lean toward the cursor, so it never feels locked
    const t = state.clock.elapsedTime;
    want.x += Math.sin(t * 0.31) * 0.07 + machine.px * 0.28;
    want.y += Math.cos(t * 0.27) * 0.05 - machine.py * 0.12;

    camera.position.lerp(want, Math.min(1, dt * 5.5));

    target.set(
      from.look[0] + (to.look[0] - from.look[0]) * f,
      from.look[1] + (to.look[1] - from.look[1]) * f,
      from.look[2] + (to.look[2] - from.look[2]) * f,
    );
    look.current.lerp(target, Math.min(1, dt * 5.5));
    camera.lookAt(look.current);
  });

  return null;
}

/** Dust in the shaft, for parallax and depth cues. */
function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = -Math.random() * 22 + 4;
      arr[i * 3 + 2] = -Math.random() * 12 + 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#9fffc0"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Quality is decided once, at mount, and then policed: if the machine cannot
 * hold its frame rate the scene sheds bloom rather than stutter.
 */
function QualityPolice({ onDrop }: { onDrop: () => void }) {
  const frames = useRef(0);
  const start = useRef(0);
  const dropped = useRef(false);

  useFrame((state) => {
    if (dropped.current) return;
    if (!start.current) start.current = state.clock.elapsedTime;
    frames.current++;
    const elapsed = state.clock.elapsedTime - start.current;
    if (elapsed > 2.4) {
      const fps = frames.current / elapsed;
      if (fps < 42) {
        dropped.current = true;
        onDrop();
      }
      frames.current = 0;
      start.current = state.clock.elapsedTime;
    }
  });

  return null;
}

export default function MachineScene({ onReady }: { onReady?: () => void }) {
  const [post, setPost] = useState(true);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.6]);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 900;
    if (coarse || small) {
      setPost(false);
      setDpr([0.85, 1.2]);
    }
  }, []);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0.85, 0.55, 7.6], fov: 42, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x04060a, 1);
        onReady?.();
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <fog attach="fog" args={["#04060a", 8, 24]} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <directionalLight position={[-5, -2, 2]} intensity={0.6} color="#b6ff3c" />
        <pointLight position={[0, -9, 3]} intensity={22} distance={16} color="#7fd4ff" />
        <pointLight position={[0, -13, 2]} intensity={18} distance={14} color="#b6ff3c" />

        <Environment resolution={128}>
          <Lightformer form="rect" intensity={2.4} position={[3, 3, 5]} scale={[8, 4, 1]} color="#d8ffe6" />
          <Lightformer form="rect" intensity={1} position={[-4, -1, 3]} scale={[6, 6, 1]} color="#9fbfff" />
          <Lightformer form="circle" intensity={3} position={[0, 6, -2]} scale={6} color="#ffffff" />
          <Lightformer form="rect" intensity={0.7} position={[0, -6, 2]} scale={[8, 2, 1]} color="#b6ff3c" />
        </Environment>

        <CameraRig />
        <Dust />
        <Monolith />

        <group position={[0, -2.7, 0]}>
          <BrowserLayer />
        </group>
        <group position={[0, -5.3, 0]}>
          <KernelLayer />
        </group>
        <group position={[0, -8.9, 0]}>
          <NetworkLayer />
        </group>
        <group position={[0, -12.9, 0]}>
          <SiliconLayer />
        </group>

        <QualityPolice onDrop={() => setPost(false)} />
        <AdaptiveDpr pixelated={false} />

        {post && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.5} mipmapBlur radius={0.7} />
            <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.15} />
            <Vignette eskil={false} offset={0.2} darkness={0.8} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}
