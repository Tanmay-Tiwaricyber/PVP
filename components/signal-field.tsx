"use client";

import { useEffect, useRef } from "react";

/**
 * SignalField — the hero's constellation.
 *
 * One node per public repository in the account (175), coloured by language in
 * proportion to the real distribution, wired into a loose mesh. It reacts to the
 * pointer with repulsion and drifts on its own. Canvas 2D only: no three.js, no
 * dependencies, and it pauses when the tab is hidden.
 */

const REPOS = 175;

/** language → share of the 175 public repositories (measured, Nov 2026) */
const GROUPS: { key: string; weight: number; rgb: [number, number, number] }[] = [
  { key: "HTML", weight: 32, rgb: [255, 77, 31] },
  { key: "JS", weight: 28, rgb: [217, 242, 75] },
  { key: "TS", weight: 21, rgb: [111, 227, 255] },
  { key: "PY", weight: 21, rgb: [255, 122, 77] },
  { key: "CSS", weight: 13, rgb: [242, 239, 230] },
  { key: "SH", weight: 6, rgb: [180, 190, 255] },
  { key: "TXT", weight: 54, rgb: [150, 148, 140] },
];

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  seed: number;
  rgb: [number, number, number];
  anchor: boolean;
};

type Link = { a: number; b: number; strength: number };

export default function SignalField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let links: Link[] = [];
    let dust: { x: number; y: number; a: number }[] = [];
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };

    const palette: [number, number, number][] = [];
    for (const g of GROUPS) for (let i = 0; i < g.weight; i++) palette.push(g.rgb);

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 700;
      const count = mobile ? Math.round(REPOS * 0.45) : REPOS;

      nodes = Array.from({ length: count }, (_, i) => {
        const seed = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          r: 0.6 + Math.pow(seed, 2.4) * 2.6,
          seed,
          rgb: palette[(i * 37) % palette.length],
          anchor: seed > 0.955,
        };
      });

      // Mesh: connect each node to a neighbour to its right plus one nearby peer,
      // so the graph stays sparse, stable and cheap (≈2 links per node).
      const order = nodes.map((n, i) => ({ i, x: n.x, y: n.y })).sort((a, b) => a.x - b.x);
      links = [];
      for (let k = 0; k < order.length; k++) {
        const cur = order[k];
        const next = order[k + 1];
        if (next) {
          links.push({ a: cur.i, b: next.i, strength: 1 });
        }
        const jump = order[Math.min(order.length - 1, k + 3 + Math.floor(Math.random() * 5))];
        if (jump && Math.hypot(jump.x - cur.x, jump.y - cur.y) < width * 0.22) {
          links.push({ a: cur.i, b: jump.i, strength: 0.45 });
        }
      }

      dust = Array.from({ length: mobile ? 90 : 220 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        a: Math.random() * 0.35 + 0.06,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);

      // static dust
      for (const d of dust) {
        ctx.fillStyle = `rgba(242,239,230,${d.a.toFixed(3)})`;
        ctx.fillRect(d.x, d.y, 1, 1);
      }

      // links
      ctx.lineWidth = 0.7;
      for (const l of links) {
        const a = nodes[l.a];
        const b = nodes[l.b];
        if (!a || !b) continue;
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const near =
          pointer.active &&
          (Math.hypot(a.x - pointer.x, a.y - pointer.y) < 170 ||
            Math.hypot(b.x - pointer.x, b.y - pointer.y) < 170);
        const alpha = Math.max(0, (1 - dist / (width * 0.3)) * 0.13 * l.strength) + (near ? 0.16 : 0);
        if (alpha <= 0.004) continue;
        ctx.strokeStyle = near
          ? `rgba(217,242,75,${Math.min(alpha + 0.08, 0.4).toFixed(3)})`
          : `rgba(242,239,230,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // nodes
      for (const n of nodes) {
        const [r, g, b] = n.rgb;
        const twinkle = reduce ? 0.75 : 0.55 + Math.sin(t * 0.0009 + n.seed * 14) * 0.22;
        const glow =
          pointer.active && Math.hypot(n.x - pointer.x, n.y - pointer.y) < 150 ? 0.35 : 0;

        if (n.anchor) {
          ctx.save();
          ctx.shadowBlur = 18;
          ctx.shadowColor = `rgba(${r},${g},${b},0.9)`;
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, twinkle + 0.2)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          ctx.strokeStyle = `rgba(${r},${g},${b},0.22)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 4.2, 0, Math.PI * 2);
          ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, twinkle + glow)})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = (t: number) => {
      if (!running) return;

      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (pointer.active) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0.01) {
            const force = ((160 - dist) / 160) * 1.15;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
        if (n.x < -24) n.x = width + 24;
        if (n.x > width + 24) n.x = -24;
        if (n.y < -24) n.y = height + 24;
        if (n.y > height + 24) n.y = -24;
      }

      draw(t);
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    build();
    raf = requestAnimationFrame(step);

    const ro = new ResizeObserver(() => build());
    ro.observe(canvas);

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      cancelAnimationFrame(raf);
      if (running) raf = requestAnimationFrame(step);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
