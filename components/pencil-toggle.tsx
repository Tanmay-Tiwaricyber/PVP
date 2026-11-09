"use client";

import { useEffect, useState } from "react";

/**
 * Pencil on / off. The hand-drawn layer is the page's pleasure, not its
 * requirement, so it can be put down at any time — and the choice sticks.
 */
export default function PencilToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    setOn(document.documentElement.dataset.pencil !== "off");
  }, []);

  const apply = (next: boolean) => {
    setOn(next);
    const root = document.documentElement;
    root.dataset.pencil = next ? "on" : "off";
    root.classList.toggle("pencil-off", !next);
    try {
      localStorage.setItem("pencil", next ? "on" : "off");
    } catch {
      /* private mode */
    }
  };

  return (
    <button
      type="button"
      onClick={() => apply(!on)}
      aria-pressed={on}
      title={on ? "Put the pencil down" : "Pick the pencil up"}
      className={`hidden items-center gap-1.5 border px-2 py-1.5 transition-colors sm:flex ${
        on
          ? "border-[var(--rule-strong)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
          : "border-[var(--rule)] text-[var(--faint)] hover:text-[var(--muted)]"
      }`}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="h-3 w-3">
        <path
          d="M4 20l1.2-4.4L16 4.8l3.2 3.2L8.4 18.8z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M14.4 6.6l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="font-mono text-[0.52rem] uppercase tracking-[0.2em]">
        {on ? "Pencil" : "Plain"}
      </span>
    </button>
  );
}
