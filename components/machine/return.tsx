"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * The way back up. A magnetic button that pushes away from the cursor and, on
 * press, throws a burst of particles — the monolith reforming, at the end of
 * the descent.
 */
type Spark = { id: number; x: number; y: number; dx: number; dy: number; life: number };

export default function ReturnButton() {
  const host = useRef<HTMLDivElement>(null);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const [hover, setHover] = useState(false);

  const push = useCallback((e: PointerEvent) => {
    const el = host.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    const dist = Math.min(1, Math.hypot(dx, dy));
    el.style.transform = `translate(${dx * 18}px, ${dy * 12}px)`;
    el.style.setProperty("--pull", `${1 - dist}`);
  }, []);

  const rest = useCallback(() => {
    const el = host.current;
    if (el) el.style.transform = "translate(0,0)";
  }, []);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    window.addEventListener("pointermove", push, { passive: true });
    return () => window.removeEventListener("pointermove", push);
  }, [push]);

  const burst = () => {
    const el = host.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next: Spark[] = Array.from({ length: 26 }, (_, i) => ({
      id: performance.now() + i,
      x: r.left + r.width / 2,
      y: r.top + r.height / 2,
      dx: (Math.random() - 0.5) * 260,
      dy: (Math.random() - 0.5) * 260,
      life: 620 + Math.random() * 520,
    }));
    setSparks((s) => [...s, ...next]);
    window.setTimeout(() => {
      setSparks((s) => s.filter((k) => !next.some((n) => n.id === k.id)));
    }, 1200);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      data-cam="0.9,0.5,7.3|1.3,0.2,0"
      data-layer="RETURN"
      data-depth="0000 m"
      className="rule-t py-16 sm:py-24"
    >
      <div className="shell flex flex-col items-center text-center">
        <p className="hud">06 / return to the surface</p>

        <div ref={host} className="mt-6 will-change-transform transition-transform duration-500 ease-out">
          <button
            onClick={burst}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => {
              setHover(false);
              rest();
            }}
            className="group relative inline-flex items-center gap-3 border border-[var(--accent)] px-7 py-4 transition-colors hover:bg-[var(--accent)]"
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--accent)] transition-colors group-hover:text-[#05070a]">
              Let&apos;s build
            </span>
            <span className="text-[var(--accent)] transition-all duration-500 group-hover:translate-y-[-2px] group-hover:text-[#05070a]">
              ↑
            </span>
          </button>
        </div>

        <p className="mt-4 max-w-[34ch] text-[0.8rem] leading-relaxed text-[var(--ink)]/45">
          Or skip the metaphor and write to{" "}
          <a
            href="mailto:tanmaytiwaricyber@gmail.com?subject=Project%20enquiry"
            className="text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-4 hover:decoration-[var(--accent)]"
          >
            tanmaytiwaricyber@gmail.com
          </a>
          .
        </p>
      </div>

      {/* the burst */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
        {sparks.map((s) => (
          <span
            key={s.id}
            className="absolute h-1 w-1 rounded-full bg-[var(--accent)]"
            style={{
              left: s.x,
              top: s.y,
              animation: `spark ${s.life}ms cubic-bezier(0.16,1,0.3,1) forwards`,
              ["--dx" as string]: `${s.dx}px`,
              ["--dy" as string]: `${s.dy}px`,
            }}
          />
        ))}
        {hover && null}
      </div>
    </section>
  );
}
