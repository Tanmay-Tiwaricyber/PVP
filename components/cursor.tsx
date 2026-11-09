"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;
    let visible = false;

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
      const el = e.target as HTMLElement;
      const interactive = el.closest("a, button, [data-cursor], input, textarea, [role='button']");
      if (ring.current) ring.current.dataset.mode = interactive ? "hover" : "idle";
    };

    const hide = () => {
      if (dot.current) dot.current.style.opacity = "0";
      if (ring.current) ring.current.style.opacity = "0";
    };

    const loop = () => {
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ opacity: 0 }} aria-hidden />
      <div ref={ring} className="cursor-ring" style={{ opacity: 0 }} aria-hidden />
    </>
  );
}
