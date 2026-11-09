"use client";

import { thm } from "@/lib/site";

/**
 * A stamped seal, set in circular mono type. It repeats the one figure that
 * matters most on this page and it turns, slowly, like a printing drum.
 */
export default function ThmSeal({ size = 92 }: { size?: number }) {
  const ring = "TryHackMe · Top 1% · Legend league · Capability 70 · ";
  return (
    <div className="relative select-none" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="seal-spin absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <path id="thm-seal-ring" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
        </defs>
        <circle cx="100" cy="100" r="92" fill="none" stroke="var(--rule-strong)" strokeWidth="1" />
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke="var(--rule-strong)"
          strokeWidth="1"
          strokeDasharray="1.4 5"
        />
        <text
          fill="var(--ink)"
          fontSize="10.5"
          letterSpacing="2.6"
          fontFamily="var(--font-mono), monospace"
          style={{ textTransform: "uppercase" }}
        >
          <textPath href="#thm-seal-ring" startOffset="0">
            {ring}
          </textPath>
        </text>
        <circle cx="100" cy="100" r="54" fill="none" stroke="var(--rule)" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="num text-[1.06rem] leading-none text-[var(--accent)]">1%</span>
        <span className="label mt-0.5 text-[0.38rem]">{thm.league}</span>
      </div>
    </div>
  );
}
