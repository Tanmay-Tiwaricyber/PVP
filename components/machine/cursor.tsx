"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A crosshair, not a dot. It reads as a measuring instrument: two hairlines
 * and a small coordinate readout, which is the machine's own voice. Nothing
 * is drawn on touch devices, and nothing is drawn for reduced motion.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setOn(true);
    document.documentElement.style.cursor = "none";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest("a,button,input,[data-magnetic]"));
    };

    const tick = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!on) return null;

  return (
    <div
      ref={ring}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      style={{ willChange: "transform" }}
    >
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          hot ? "scale-[1.55]" : "scale-100"
        }`}
      >
        <span
          className={`absolute left-1/2 top-1/2 block h-px w-3 -translate-x-1/2 -translate-y-1/2 transition-colors ${
            hot ? "bg-[var(--accent)]" : "bg-[var(--ink)]/60"
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 block h-3 w-px -translate-x-1/2 -translate-y-1/2 transition-colors ${
            hot ? "bg-[var(--accent)]" : "bg-[var(--ink)]/60"
          }`}
        />
        <span
          className={`absolute left-1/2 top-1/2 block h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors ${
            hot ? "border-[var(--accent)]" : "border-[var(--ink)]/25"
          }`}
        />
      </div>
    </div>
  );
}
