"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * A working, in-browser homage to Hyper Island — the Windows Dynamic Island mod
 * in this portfolio's case study. Hover to peek, click to expand, click a dot to
 * change page. Keyboard accessible: Enter/Space toggles, Escape collapses.
 */

const PAGES = ["Now playing", "Focus", "Volume", "Tasks"] as const;

export default function IslandDemo() {
  const [open, setOpen] = useState(false);
  const [peek, setPeek] = useState(false);
  const [page, setPage] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [focus, setFocus] = useState(false);
  const [volume, setVolume] = useState(68);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 520);
    return () => window.clearInterval(id);
  }, [playing]);

  const expanded = open || peek;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[6px] border border-bone/10 bg-[radial-gradient(120%_120%_at_50%_0%,#141420_0%,#08080c_58%,#050508_100%)] px-4 py-10">
      {/* desktop hints */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 font-mono text-[8px] uppercase tracking-[0.2em] text-bone/35">
        <span>windows 11 · windhawk</span>
        <span>liquid glass</span>
      </div>

      <div className="relative w-full max-w-[420px]">
        <motion.div
          animate={{ width: expanded ? 316 : 232 }}
          initial={false}
          transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.9 }}
          onMouseEnter={() => setPeek(true)}
          onMouseLeave={() => setPeek(false)}
          className="relative mx-auto overflow-hidden rounded-[26px] border border-white/20 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 42%, rgba(255,255,255,0.09) 100%)",
            backdropFilter: "blur(22px) saturate(160%)",
            WebkitBackdropFilter: "blur(22px) saturate(160%)",
            maxWidth: "100%",
          }}
        >
          {/* specular sheen */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-60"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0))",
            }}
          />

          <button
            onClick={() => setOpen((v) => !v)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
            aria-expanded={open}
            aria-label={open ? "Collapse the Hyper Island preview" : "Expand the Hyper Island preview"}
            className="relative flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
          >
            <span className="flex items-center gap-2">
              <span
                className={`h-2 w-2 shrink-0 rounded-full transition-colors ${
                  playing ? "bg-signal" : "bg-bone/40"
                }`}
              />
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/85">
                {expanded ? PAGES[page] : "hyper island"}
              </span>
            </span>

            <span className="flex items-center gap-[3px]">
              {[9, 15, 7, 12, 18, 6].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full bg-white/80"
                  animate={
                    playing
                      ? { height: [h, h * (0.55 + ((tick + i) % 3) * 0.32), h] }
                      : { height: h * 0.5 }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ height: h }}
                />
              ))}
            </span>

            {!expanded && (
              <span className="font-mono text-[9px] text-white/60">−38%</span>
            )}
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden px-4"
              >
                <div className="pb-4">
                  {page === 0 && (
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-signal/90 to-signal-soft/40">
                        <span className="font-mono text-[8px] text-white">TT</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-medium text-white">
                          Signal — Interlude No. 4
                        </p>
                        <p className="truncate font-mono text-[8px] uppercase tracking-[0.16em] text-white/50">
                          Silent Programmer · 2026
                        </p>
                      </div>
                      <button
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? "Pause" : "Play"}
                        className="grid h-7 w-7 place-items-center rounded-full border border-white/25 text-white/85 transition-colors hover:bg-white/10"
                      >
                        {playing ? (
                          <span className="flex gap-[2px]">
                            <span className="h-2 w-[2px] bg-current" />
                            <span className="h-2 w-[2px] bg-current" />
                          </span>
                        ) : (
                          <span className="ml-[2px] h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-current" />
                        )}
                      </button>
                    </div>
                  )}

                  {page === 1 && (
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                          Focus session
                        </p>
                        <p className="mt-1 font-mono text-2xl tabular-nums text-white">
                          {focus ? "24:59" : "25:00"}
                        </p>
                      </div>
                      <button
                        onClick={() => setFocus((f) => !f)}
                        className={`rounded-full px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] transition-colors ${
                          focus ? "bg-acid text-ink" : "border border-white/25 text-white/80"
                        }`}
                      >
                        {focus ? "running" : "start"}
                      </button>
                    </div>
                  )}

                  {page === 2 && (
                    <div>
                      <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-white/45">
                        <span>Output volume</span>
                        <span className="tabular-nums text-white/80">{volume}%</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        {Array.from({ length: 22 }).map((_, i) => (
                          <button
                            key={i}
                            aria-label={`Set volume to ${Math.round(((i + 1) / 22) * 100)} percent`}
                            onClick={() => setVolume(Math.round(((i + 1) / 22) * 100))}
                            className="h-6 flex-1 rounded-[2px]"
                            style={{
                              background:
                                (i + 1) / 22 <= volume / 100
                                  ? "rgba(255,255,255,0.85)"
                                  : "rgba(255,255,255,0.14)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {page === 3 && (
                    <ul className="space-y-1.5">
                      {["Ship the case study", "Reply to two emails", "Walk. No phone."].map(
                        (task, i) => (
                          <li key={task} className="flex items-center gap-2">
                            <span
                              className={`grid h-3 w-3 place-items-center rounded-[3px] border ${
                                i === 0 ? "border-acid bg-acid" : "border-white/30"
                              }`}
                            >
                              {i === 0 && (
                                <svg width="7" height="7" viewBox="0 0 8 8" fill="none">
                                  <path d="M1 4l2 2 4-4" stroke="#07070a" strokeWidth="1.4" />
                                </svg>
                              )}
                            </span>
                            <span
                              className={`text-[10px] ${
                                i === 0 ? "text-white/40 line-through" : "text-white/85"
                              }`}
                            >
                              {task}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  )}

                  {/* page dots */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {PAGES.map((p, i) => (
                      <button
                        key={p}
                        onClick={() => setPage(i)}
                        aria-label={`Show ${p}`}
                        aria-current={page === i}
                        className="grid h-4 w-4 place-items-center"
                      >
                        <span
                          className={`h-1 w-1 rounded-full transition-all ${
                            page === i ? "w-3 bg-white/90" : "bg-white/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-5 text-center font-mono text-[8px] uppercase tracking-[0.2em] text-bone/40">
          {open ? "esc / click the pill to collapse" : "hover to peek · click to open"}
        </p>
      </div>

      {/* soft floor reflection */}
      <div className="pointer-events-none absolute inset-x-10 bottom-6 h-24 rounded-[50%] bg-signal/10 blur-2xl" />
    </div>
  );
}
