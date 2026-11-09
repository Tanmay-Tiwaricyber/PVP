"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { machine } from "./scroll";

const ACCENT = new THREE.Color("#b6ff3c");
const ICE = new THREE.Color("#7fd4ff");

/**
 * Each layer lives at a fixed depth and fades in only while the camera is near
 * it. Nothing is scheduled against document progress, so a layer can never
 * appear while its chapter is somewhere else on the page.
 */
const NEAR = 3.2;

function presence(homeY: number) {
  const d = Math.abs(machine.camY - homeY);
  const k = Math.min(1, Math.max(0, 1 - d / NEAR));
  return k < 0.25 ? 0 : (k - 0.25) / 0.75;
}

export const DEPTH = { browser: -2.7, kernel: -5.3, network: -8.9, silicon: -12.9 } as const;

/* ------------------------------------------------------------------ */
/* Layer 1 — Browser: floating UI panels, fanning out as you descend    */
/* ------------------------------------------------------------------ */

const PANELS: [number, number, number, number, number, number][] = [
  // x, y, z, rotY, rotX, scale
  [-3.1, 0.9, -1.2, 0.34, -0.06, 1],
  [3.2, 0.55, -1.9, -0.3, 0.05, 0.94],
  [-2.5, -1.5, -3.2, 0.2, 0.1, 0.86],
  [2.9, -1.8, -3.6, -0.18, -0.1, 0.9],
  [0.15, 2.2, -4.6, 0.04, 0.14, 0.8],
];

export function BrowserLayer() {
  const g = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Group[]>([]);

  useFrame((state) => {
    const k = presence(DEPTH.browser);
    if (g.current) g.current.visible = k > 0.02;
    panels.current.forEach((panel, i) => {
      if (!panel) return;
      const [x, y, z, ry, rx, s] = PANELS[i];
      // fan: gathered when the camera is far, spread as it arrives
      const fan = 0.2 + k * 0.8;
      panel.position.set(x * fan, y * fan, z + (1 - k) * 1.6);
      panel.rotation.set(rx * fan, ry * fan, Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.03);
      panel.scale.setScalar(s * (0.85 + k * 0.15));
    });
  });

  return (
    <group ref={g} visible={false}>
      {PANELS.map((panel, i) => (
        <group
          key={i}
          ref={(el) => {
            if (el) panels.current[i] = el;
          }}
        >
          <RoundedBox args={[2.1, 1.28, 0.06]} radius={0.07} smoothness={5}>
            <meshPhysicalMaterial
              color="#0c1110"
              metalness={0.2}
              roughness={0.12}
              transmission={0.75}
              thickness={0.5}
              ior={1.35}
              clearcoat={0.6}
              transparent
              opacity={0.86}
            />
          </RoundedBox>
          {/* a title rule and two content bars, so a panel reads as a panel */}
          <mesh position={[-0.72, 0.42, 0.035]}>
            <planeGeometry args={[0.66, 0.03]} />
            <meshBasicMaterial color={ACCENT} transparent opacity={0.85} />
          </mesh>
          {[0.16, -0.02, -0.2].map((y, j) => (
            <mesh key={j} position={[-0.36 + j * 0.1, y, 0.035]}>
              <planeGeometry args={[1.3 - j * 0.22, 0.055]} />
              <meshBasicMaterial
                color="#e8fff2"
                transparent
                opacity={0.16 + (2 - j) * 0.06}
              />
            </mesh>
          ))}
          <mesh position={[0, -0.44, 0.035]}>
            <planeGeometry args={[1.82, 0.02]} />
            <meshBasicMaterial color={ICE} transparent opacity={0.35} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Layer 2 — Kernel: instanced memory blocks, rearranging as you scroll */
/* ------------------------------------------------------------------ */

const GRID = 7;
const COUNT = GRID * GRID * 2;

export function KernelLayer() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const gx = (i % GRID) - GRID / 2 + 0.5;
        const gy = (Math.floor(i / GRID) % GRID) - GRID / 2 + 0.5;
        const gz = Math.floor(i / (GRID * GRID)) * 4 - 2;
        return { gx, gy, gz, r: ((i * 97) % 61) / 61 };
      }),
    [],
  );

  useFrame((state) => {
    const k = presence(DEPTH.kernel);
    const t = state.clock.elapsedTime;
    if (!mesh.current) return;
    mesh.current.visible = k > 0.02;

    seeds.forEach((s, i) => {
      const { gx, gy, gz } = s;
      // the blocks breathe apart and re-form into a shallower lattice: the
      // shape of a struct becoming the shape of a page
      const wave = Math.sin(gx * 0.9 + gy * 0.7 + t * 0.55 + s.r * 2) * 0.5 + 0.5;
      const spread = 0.72 + k * 0.5;
      const x = gx * 0.92 * spread;
      const y = gy * 0.92 * spread + (wave - 0.5) * 0.5 * k;
      const z = gz - 9 + k * 9 - s.r * 2.5;
      dummy.position.set(x, y, z * 0.5 - 3);
      dummy.rotation.set(s.r * 0.6 + t * 0.12 * (i % 3), s.r * 1.4 + k, 0);
      const scale = 0.28 + s.r * 0.2 + wave * 0.12;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color="#0e1412"
        metalness={0.35}
        roughness={0.22}
        clearcoat={0.8}
        clearcoatRoughness={0.2}
        emissive={"#0a1a12"}
        emissiveIntensity={0.6}
        transparent
        opacity={0.92}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------ */
/* Layer 3 — Network: a node graph of the security record               */
/* ------------------------------------------------------------------ */

const NODES: [number, number, number][] = [
  [0, 0, 0],
  [-2.2, 1.5, -1.2],
  [2.3, 1.1, -0.8],
  [-2.6, -1.2, -0.4],
  [2.1, -1.5, -1.6],
  [-0.9, 2.4, -2.2],
  [1.2, -2.5, 0.6],
  [-3.4, 0.1, -2.8],
  [3.5, -0.2, -2.4],
  [0.4, 0.7, 1.4],
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 5], [2, 8], [3, 7], [4, 8], [1, 7], [4, 6], [0, 9], [9, 2],
];

export function NetworkLayer() {
  const g = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Mesh[]>([]);
  const packet = useRef<THREE.Mesh>(null);
  const lineGeo = useMemo(() => {
    const positions: number[] = [];
    EDGES.forEach(([a, b]) => {
      const p1 = NODES[a];
      const p2 = NODES[b];
      // a single arc through the midpoint, so the graph is not a rake of lines
      const mid = new THREE.Vector3(
        (p1[0] + p2[0]) / 2,
        (p1[1] + p2[1]) / 2 + 0.35,
        (p1[2] + p2[2]) / 2 - 0.5,
      );
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(...p1),
        mid,
        new THREE.Vector3(...p2),
      );
      const pts = curve.getPoints(22);
      for (let i = 0; i < pts.length - 1; i++) {
        positions.push(pts[i].x, pts[i].y, pts[i].z, pts[i + 1].x, pts[i + 1].y, pts[i + 1].z);
      }
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const k = presence(DEPTH.network);
    const t = state.clock.elapsedTime;
    if (g.current) {
      g.current.visible = k > 0.02;
      g.current.rotation.y = (1 - k) * -0.6 + t * 0.045 + machine.px * 0.14;
      g.current.rotation.x = machine.py * 0.06;
      g.current.position.z = 2 - k * 4;
      g.current.scale.setScalar(0.75 + k * 0.3);
    }
    nodes.current.forEach((n, i) => {
      if (!n) return;
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + i * 0.9);
      n.scale.setScalar(0.62 + pulse * 0.22 + (i === 0 ? 0.5 : 0));
    });

    // a packet fired on interaction travels the first edge, then fades
    if (packet.current) {
      const age = (performance.now() - machine.packet) / 1000;
      const live = machine.packet > 0 && age < 1.8;
      packet.current.visible = live;
      if (live) {
        const a = NODES[0];
        const b = NODES[2];
        const f = (age / 1.8) % 1;
        packet.current.position.set(
          a[0] + (b[0] - a[0]) * f,
          a[1] + (b[1] - a[1]) * f + Math.sin(f * Math.PI) * 0.4,
          a[2] + (b[2] - a[2]) * f,
        );
        packet.current.scale.setScalar(1 - f * 0.4);
      }
    }
  });

  return (
    <group ref={g} visible={false}>
      <lineSegments>
        <primitive object={lineGeo} attach="geometry" />
        <lineBasicMaterial color={ICE} transparent opacity={0.5} />
      </lineSegments>

      {NODES.map((pos, i) => (
        <mesh
          key={i}
          position={pos}
          ref={(el) => {
            if (el) nodes.current[i] = el;
          }}
        >
          <icosahedronGeometry args={[0.17, 1]} />
          <meshStandardMaterial
            color={i === 0 ? ACCENT : ICE}
            emissive={i === 0 ? ACCENT : ICE}
            emissiveIntensity={i === 0 ? 3.2 : 1.9}
            roughness={0.35}
            metalness={0.4}
          />
        </mesh>
      ))}

      <mesh ref={packet} visible={false}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Layer 4 — Silicon: a particle cloud finding its lattice              */
/* ------------------------------------------------------------------ */

const PARTICLES = 1400;

export function SiliconLayer() {
  const points = useRef<THREE.Points>(null);
  const { cloud, lattice } = useMemo(() => {
    const cloud = new Float32Array(PARTICLES * 3);
    const lattice = new Float32Array(PARTICLES * 3);
    const side = Math.ceil(Math.cbrt(PARTICLES));
    for (let i = 0; i < PARTICLES; i++) {
      // scattered
      const r = 4.6 * Math.cbrt(Math.random());
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      cloud[i * 3] = r * Math.sin(ph) * Math.cos(th);
      cloud[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      cloud[i * 3 + 2] = r * Math.cos(ph) * 0.8 - 2;

      // and the same indices, sat on a lattice — a neural sheet
      const x = i % side;
      const y = Math.floor(i / side) % side;
      const z = Math.floor(i / (side * side));
      lattice[i * 3] = (x - side / 2) * 0.52;
      lattice[i * 3 + 1] = (y - side / 2) * 0.52 + Math.sin(x * 0.6) * 0.18;
      lattice[i * 3 + 2] = (z - side / 2) * 0.5 - 1.6;
    }
    return { cloud, lattice };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(cloud.slice(), 3));
    return geo;
  }, [cloud]);

  useFrame((state) => {
    const k = presence(DEPTH.silicon);
    const t = state.clock.elapsedTime;
    if (!points.current) return;
    points.current.visible = k > 0.02;

    const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    // morph only while it is on screen; a lattice at rest costs nothing
    if (points.current.visible) {
      for (let i = 0; i < arr.length; i++) {
        const target = lattice[i];
        const drift = Math.sin(t * 0.6 + i * 0.35) * 0.05;
        arr[i] += (target - arr[i]) * (0.03 + k * 0.12) + drift * (1 - k);
      }
      attr.needsUpdate = true;
    }
    points.current.rotation.y = t * 0.06 + machine.px * 0.2;
    points.current.rotation.x = -0.12 + machine.py * 0.1;
  });

  return (
    <points ref={points} geometry={geometry} visible={false}>
      <pointsMaterial
        size={0.028}
        color="#c9ffd8"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
