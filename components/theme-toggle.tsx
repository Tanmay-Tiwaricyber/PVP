"use client";

import { useEffect, useState } from "react";

type Mode = "light" | "dark";

/**
 * A physical two-position switch, not a moon icon. Writes the class on <html>
 * and persists the choice; the inline script in the layout handles first paint.
 */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial = (document.documentElement.dataset.theme as Mode) || "light";
    setMode(initial);
    setMounted(true);
  }, []);

  const apply = (next: Mode) => {
    setMode(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode */
    }
  };

  return (
    <div
      className="theme-switch"
      role="group"
      aria-label="Colour theme"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity .3s ease" }}
    >
      <span
        className="thumb"
        aria-hidden
        style={{
          width: compact ? "calc(50% - 2px)" : "calc(50% - 2px)",
          transform: mode === "dark" ? "translateX(100%)" : "translateX(0)",
        }}
      />
      <button
        type="button"
        data-active={mode === "light"}
        onClick={() => apply("light")}
        aria-pressed={mode === "light"}
      >
        Paper
      </button>
      <button
        type="button"
        data-active={mode === "dark"}
        onClick={() => apply("dark")}
        aria-pressed={mode === "dark"}
      >
        Ink
      </button>
    </div>
  );
}
