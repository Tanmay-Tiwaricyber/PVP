"use client";

import { useState } from "react";
import { thm } from "@/lib/site";
import { firePacket } from "./scroll";

/**
 * The nodes are real figures. Touch one and the graph behind fires a packet,
 * while the sentence below decrypts itself — the heading lands as the packet
 * does, which is the only reason the effect exists.
 */
const NODES = [
  { id: "rank", label: "Ranking", value: thm.ranking, note: "global" },
  { id: "league", label: "League", value: thm.league, note: `peak ${thm.leaguePeak}` },
  { id: "cap", label: "Capability", value: String(thm.capability), note: "score" },
  { id: "streak", label: "Streak", value: `${thm.streak}d`, note: "longest" },
];

const SCRAMBLE = "▚▞░▒█#%&*+=-";

export default function NetworkPanel() {
  const [active, setActive] = useState(0);
  const [label, setLabel] = useState(NODES[0].label);

  const pick = (i: number) => {
    setActive(i);
    firePacket();
    // decrypt the label: three passes of noise settling into the word
    const target = NODES[i].label;
    let pass = 0;
    const id = window.setInterval(() => {
      pass++;
      const settled = Math.min(target.length, pass * 2);
      const tail = target
        .slice(settled)
        .split("")
        .map(() => SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)])
        .join("");
      setLabel(target.slice(0, settled) + tail);
      if (settled >= target.length) {
        setLabel(target);
        window.clearInterval(id);
      }
    }, 55);
  };

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between border-t border-[var(--rule-strong)] pt-2">
        <span className="label text-[var(--accent)]">TryHackMe · node graph</span>
        <span className="label">tap a node</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {NODES.map((n, i) => (
          <button
            key={n.id}
            onClick={() => pick(i)}
            aria-pressed={active === i}
            className={`group relative border px-3 py-2.5 text-left transition-colors ${
              active === i
                ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
                : "border-[var(--rule-strong)] hover:border-[var(--accent)]/60"
            }`}
          >
            <span className="label block text-[0.46rem]">{n.label}</span>
            <span className="num mt-1 block text-[clamp(1rem,2vw,1.4rem)] leading-none">
              {n.value}
            </span>
          </button>
        ))}
      </div>

      <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.34em] text-[var(--accent)]">
        {label}
      </p>
      <p className="mt-1.5 max-w-[46ch] text-[0.82rem] leading-relaxed text-[var(--ink)]/60">
        {active === 0 && "Top one per cent of every player on TryHackMe, five years after the first room."}
        {active === 1 && `Reached Legend league in ${thm.joined.replace(" ", " ")}, with a peak league of ${thm.leaguePeak}.`}
        {active === 2 && `Capability score ${thm.capability}, earned across rooms, CTFs and offensive tooling.`}
        {active === 3 && `Longest run: ${thm.streak} days without breaking the streak.`}
      </p>
    </div>
  );
}
