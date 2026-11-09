"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { machine } from "./scroll";

const ACCENT = new THREE.Color("#b6ff3c");

/**
 * The monolith. A tall glass slab with the name etched into its front face,
 * lit by two moving highlights, tilting with the cursor and being consumed by
 * the descent as the visitor leaves the surface.
 */
export default function Monolith() {
  const group = useRef<THREE.Group>(null);
  const glass = useRef<THREE.MeshPhysicalMaterial>(null);
  const etch = useRef<THREE.MeshBasicMaterial>(null);

  const etchedTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 1536;
    const g = c.getContext("2d");
    if (!g) return null;

    g.fillStyle = "#000";
    g.fillRect(0, 0, c.width, c.height);

    // the name, etched in one pass, then a hairline register around it
    g.fillStyle = "#fff";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.font = "italic 205px Georgia, 'Times New Roman', serif";
    g.fillText("Tanmay", 512, 620);
    g.fillText("Tiwari", 512, 860);

    g.strokeStyle = "rgba(255,255,255,0.55)";
    g.lineWidth = 4;
    g.strokeRect(140, 250, 744, 800);

    g.font = "500 34px ui-monospace, monospace";
    g.letterSpacing = "14px";
    g.fillStyle = "rgba(255,255,255,0.8)";
    g.fillText("SILENT PROGRAMMER", 512, 1210);
    g.fillText("VOL. 01", 512, 190);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }, []);

  const rim = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 768;
    const g = c.getContext("2d");
    if (!g) return null;
    const grd = g.createLinearGradient(0, 0, 512, 768);
    grd.addColorStop(0, "#ffffff");
    grd.addColorStop(0.45, "#7f7f7f");
    grd.addColorStop(1, "#1a1a1a");
    g.fillStyle = grd;
    g.fillRect(0, 0, 512, 768);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const k = Math.min(1, Math.max(0, 1 - Math.abs(machine.camY - 0.25) / 3.6));

    if (group.current) {
      const tiltX = machine.py * 0.12 + Math.sin(t * 0.32) * 0.035;
      const tiltY = -machine.px * 0.22 + Math.cos(t * 0.24) * 0.05;
      group.current.rotation.x += (tiltX - group.current.rotation.x) * Math.min(1, dt * 3);
      group.current.rotation.y += (tiltY - group.current.rotation.y) * Math.min(1, dt * 3);
      // it rises out of frame as you descend, and re-forms as you come back
      group.current.position.y = 0.3 + Math.sin(t * 0.5) * 0.1 + (1 - k) * 3.2;
      group.current.visible = k > 0.04;
      const s = 0.86 + k * 0.14;
      group.current.scale.setScalar(s);
    }

    if (glass.current) {
      glass.current.thickness = 1.4 + Math.sin(t * 0.6) * 0.25;
      glass.current.opacity = 0.2 + k * 0.74;
      glass.current.iridescenceIOR = 1.28 + Math.sin(t * 0.22) * 0.06;
    }
    if (etch.current) {
      etch.current.opacity = (0.34 + Math.sin(t * 0.9) * 0.05) * Math.min(1, k * 1.6);
    }
  });

  return (
    <group ref={group} position={[2.45, -0.55, -0.3]}>
      <RoundedBox args={[2.5, 3.7, 0.34]} radius={0.22} smoothness={6} castShadow={false}>
        <meshPhysicalMaterial
          ref={glass}
          color="#0d1310"
          metalness={0.18}
          roughness={0.055}
          transmission={0.92}
          thickness={1.4}
          ior={1.42}
          iridescence={1}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[120, 560]}
          clearcoat={0.7}
          clearcoatRoughness={0.16}
          attenuationColor={"#93ffb4"}
          attenuationDistance={4.5}
          envMapIntensity={1.35}
          transparent
          opacity={0.94}
        />
      </RoundedBox>

      {/* the etching, floating a hair in front of the glass */}
      {etchedTexture && (
        <mesh position={[0, 0, 0.181]}>
          <planeGeometry args={[2.42, 3.62]} />
          <meshBasicMaterial
            ref={etch}
            map={etchedTexture}
            transparent
            opacity={0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            color="#eafff0"
          />
        </mesh>
      )}

      {/* an edge of accent light, so it reads as a figure and not a smudge */}
      <mesh position={[0, 0, 0.19]}>
        <planeGeometry args={[2.5, 3.7]} />
        <meshBasicMaterial
          map={rim ?? undefined}
          transparent
          opacity={0.055}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          color={ACCENT}
        />
      </mesh>
    </group>
  );
}
