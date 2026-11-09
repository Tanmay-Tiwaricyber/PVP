"use client";

import { useEffect, useRef } from "react";

/**
 * SignalField — a canvas particle mesh that drifts, links nearby nodes and
 * reacts to the pointer with a soft parallax + repulsion. Written from scratch:
 * no three.js, no dependencies, ~60fps on 4 year old laptops.
 *
 * Design intent: it reads as a "network of small unfinished things"
 * (175 repos, most of them small) rather than generic tech particle soup.
 */

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  base: number;
  hue: number;
};

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
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = true;

    const pointer = { x: -9999, y: -9999, active: false };
    const palette = [
      [255, 77, 31],
      [217, 242, 75],
      [111, 227, 255],
      [242, 239, 230],
    ];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = width < 640 ? 0.00013 : 0.000075;
      const count = Math.min(150, Math.max(46, Math.floor(width * height * density)));
      nodes = Array.from({ length: count }, () => {
        const base = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 0.7 + base * 1.9,
          base,
          hue: Math.floor(base * palette.length) % palette.length,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // links first (behind the dots)
      const maxDist = width < 640 ? 92 : 128;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxDist * maxDist) continue;
          const alpha = (1 - Math.sqrt(d2) / maxDist) * 0.16;
          ctx.strokeStyle = `rgba(242,239,230,${alpha.toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const [r, g, b] = palette[n.hue];
        const twinkle = reduce ? 0.7 : 0.5 + Math.sin(performance.now() * 0.0009 + n.base * 12) * 0.24;

        if (n.base > 0.93) {
          ctx.save();
          ctx.shadowBlur = 16;
          ctx.shadowColor = `rgba(${r},${g},${b},0.85)`;
          ctx.fillStyle = `rgba(${r},${g},${b},${twinkle})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.fillStyle = `rgba(${r},${g},${b},${twinkle * 0.72})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const step = () => {
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
          if (dist < 150) {
            const force = (150 - dist) / 150;
            n.x += (dx / (dist || 1)) * force * 1.35;
            n.y += (dy / (dist || 1)) * force * 1.35;
          }
        }

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      draw();
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
      if (running) raf = requestAnimationFrame(step);
      else cancelAnimationFrame(raf);
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
