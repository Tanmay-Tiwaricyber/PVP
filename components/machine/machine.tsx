"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { bindMachine, machine } from "./scroll";

const MachineScene = dynamic(() => import("./scene"), { ssr: false });

type Capability = { webgl2: boolean; cores: number; memory: number; coarse: boolean };

function capabilities(): Capability {
  const canvas = document.createElement("canvas");
  const webgl2 = !!canvas.getContext("webgl2");
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  return {
    webgl2,
    cores: nav.hardwareConcurrency ?? 4,
    memory: (nav as unknown as { deviceMemory?: number }).deviceMemory ?? 4,
    coarse: window.matchMedia("(pointer: coarse)").matches,
  };
}

/**
 * The machine is opt-in. It boots only when the hardware can carry it and the
 * visitor has not asked for less motion — otherwise the page is the page, and
 * the hero is a static monolith in CSS.
 */
export default function Machine({
  children,
  idle,
}: {
  children: React.ReactNode;
  /** the static hero the canvas fades in over */
  idle: React.ReactNode;
}) {
  const [mode, setMode] = useState<"checking" | "on" | "off">("checking");
  const [ready, setReady] = useState(false);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => bindMachine(), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cap = capabilities();
    const small = window.innerWidth < 900;
    const weak = cap.cores <= 2 || cap.memory <= 2;

    if (reduce || !cap.webgl2 || weak) {
      setMode("off");
      document.documentElement.dataset.machine = "off";
      return;
    }

    // a phone still gets the machine — it just gets the cheap tier
    const delay = small || cap.coarse ? 700 : 260;
    const id = window.setTimeout(() => {
      setMode("on");
      document.documentElement.dataset.machine = "on";
    }, delay);
    return () => window.clearTimeout(id);
  }, []);

  // The HUD: layer name, depth, and a jittering rate — decoration that is true.
  const [hud, setHud] = useState({ name: "SURFACE", depth: 0, fps: 60 });
  useEffect(() => {
    if (mode !== "on") return;
    let raf = 0;
    let last = performance.now();
    let smoothFps = 60;
    const tick = (now: number) => {
      const dt = Math.max(1, now - last);
      last = now;
      smoothFps += (1000 / dt - smoothFps) * 0.08;
      // the readout is the camera's: whatever chapter owns the viewport centre
      setHud({
        name: machine.layer,
        depth: Number(machine.depth.replace(/[^0-9]/g, "")) || 0,
        fps: Math.round(smoothFps),
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mode]);

  const hudNodes = useMemo(
    () => (
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 bottom-4 z-30 px-[var(--gutter)] transition-opacity duration-700 ${
          mode === "on" && hud.depth > 0 ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-end justify-between gap-4 font-mono text-[0.52rem] uppercase tracking-[0.28em] text-white/45">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-[#b6ff3c] opacity-70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#b6ff3c]" />
              </span>
              {hud.name}
            </span>
            <span className="hidden sm:inline">
              depth {String(hud.depth).padStart(4, "0")} m
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">∿ {hud.fps} fps</span>
            <span className="hidden md:inline">scroll ↓ to descend</span>
          </div>
        </div>
      </div>
    ),
    [mode, hud],
  );

  return (
    <>
      {/* the canvas sits behind the document, and the chapters scroll over it */}
      <div
        ref={host}
        aria-hidden
        data-machine-layer
        className={`pointer-events-none fixed inset-0 z-0 transition-opacity duration-[1400ms] ${
          mode === "on" && ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {mode === "on" && <MachineScene onReady={() => setReady(true)} />}
      </div>

      {/* the CSS monolith, shown until the canvas has drawn once */}
      {mode !== "on" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[100svh] opacity-100 transition-opacity duration-700 md:block"
        >
          {idle}
        </div>
      )}

      {hudNodes}
      {children}
    </>
  );
}
