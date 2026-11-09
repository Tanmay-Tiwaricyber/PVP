"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { badges, type Badge } from "@/lib/badges";
import BadgeArtMark from "./badge-art";
import { Tape } from "./margin-notes";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Deterministic tilt/pin so the wall looks hand-pinned, not evenly distributed. */
const pin = (i: number) => {
  const tilts = [-7.5, 4, -3, 6.5, -5.5, 2.5, -6, 5, -2.5, 7, -4.5];
  const lifts = [0, 9, -6, 4, 11, -9, 7, -4, 6, -8, 3];
  return { rotate: tilts[i % tilts.length], y: lifts[i % lifts.length] };
};

function Thumb({
  b,
  on,
  index,
  onEnter,
  onPick,
}: {
  b: Badge;
  on: boolean;
  index: number;
  onEnter: () => void;
  onPick: () => void;
}) {
  const t = pin(index);
  return (
    <button
      type="button"
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onPick}
      aria-label={`${b.name}, ${b.issuer}`}
      aria-pressed={on}
      className="group relative flex aspect-square flex-col items-center justify-center gap-1 focus:outline-none focus-visible:outline-none"
      style={{ transform: `rotate(${t.rotate}deg) translateY(${t.y}px)` }}
    >
      <span
        aria-hidden
        className={`absolute inset-0 border bg-[var(--paper)] transition-all duration-500 ${
          on
            ? "border-[var(--ink)] shadow-[3px_5px_0_0_color-mix(in_srgb,var(--ink)_15%,transparent)]"
            : "border-[var(--rule-strong)] shadow-[2px_3px_0_0_color-mix(in_srgb,var(--ink)_8%,transparent)] group-hover:border-[var(--ink)]"
        }`}
      />
      <span
        aria-hidden
        className={`absolute left-1/2 top-[-4px] z-10 h-2 w-2 -translate-x-1/2 rounded-full border transition-colors duration-300 ${
          on ? "border-[var(--accent)] bg-[var(--accent)]" : "border-[var(--rule-strong)] bg-[var(--paper-2)]"
        }`}
      />
      <Tape className="-left-2 -top-1" />
      <Tape className="-right-2 -bottom-1" flip />
      <span
        className={`relative z-[1] flex items-center justify-center transition-all duration-500 ${
          on ? "scale-105 text-[var(--accent)]" : "text-[var(--ink)]"
        }`}
        style={{ width: "52%", height: "52%" }}
      >
        {b.figure ? (
          <span className="num text-center text-[clamp(0.7rem,1.15vw,0.95rem)] leading-none tracking-tight">
            {b.figure}
          </span>
        ) : b.art.kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.art.src} alt="" className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <BadgeArtMark figure={b.art.figure} className="h-full w-full" />
        )}
      </span>
      <span className="relative z-[1] max-w-[88%] px-0.5 text-center font-mono text-[0.4rem] uppercase leading-[1.2] tracking-[0.08em] text-[var(--faint)] transition-colors group-hover:text-[var(--muted)] sm:text-[0.44rem]">
        {b.name}
      </span>
    </button>
  );
}

export default function BadgeWall({ startDelay = 0 }: { startDelay?: number }) {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const shown = pinned ?? active;
  const b = badges[shown];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between border-t border-[var(--rule-strong)] pt-2">
        <span className="label text-[var(--ink)]">
          <span className="text-[var(--accent)]">Fig. A</span> / earned
        </span>
        <span className="label">
          <span className="hidden sm:inline">hover </span>
          {badges.length} pins
        </span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-x-2 gap-y-4" role="group" aria-label="Badge cabinet">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.id}
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.62,
              delay: startDelay + i * 0.045,
              ease: [0.22, 1.4, 0.36, 1],
            }}
          >
            <Thumb
              b={badge}
              index={i}
              on={shown === i}
              onEnter={() => setActive(i)}
              onPick={() => setPinned((p) => (p === i ? null : i))}
            />
          </motion.div>
        ))}
      </div>

      {/* the drawer beneath the cabinet */}
      <div className="relative mt-6 border-t border-[var(--rule-strong)] pt-2.5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={b.id}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="label">
                {b.issuer}
                {b.tag && <span className="ml-1.5 text-[var(--accent)]">{b.tag}</span>}
              </p>
              <p className="num text-[0.55rem] text-[var(--faint)]">
                {String(shown + 1).padStart(2, "0")}/{String(badges.length).padStart(2, "0")}
              </p>
            </div>
            <p className="serif mt-1 text-[clamp(1.15rem,2vw,1.5rem)] leading-tight">{b.name}</p>
            <p className="mt-1.5 text-[0.78rem] leading-[1.5] text-[var(--muted)]">{b.note}</p>
            <a
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
              className="meta link-u mt-2.5 inline-block text-[var(--ink)] hover:text-[var(--accent)]"
            >
              {b.kind === "credential" ? "Verify" : b.issuer === "TryHackMe" ? "Open profile" : "See it"} ↗
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
