"use client";

import { useEffect } from "react";

type Mode = "on" | "off";

const KEY = "pencil";

/**
 * The pencil layer. A single hand-drawn filter is defined once, here, and the
 * page's stroke elements opt into it with `filter: url(#pencil)` from CSS — so
 * the wobble costs one filter and no markup. The third position on the
 * masthead switch turns it off and that choice is remembered.
 */
export default function Doodle() {
  useEffect(() => {
    const root = document.documentElement;
    const stored = (() => {
      try {
        return localStorage.getItem(KEY);
      } catch {
        return null;
      }
    })();
    const mode: Mode = stored === "off" ? "off" : "on";
    root.dataset.pencil = mode;
    root.classList.toggle("pencil-off", mode === "off");
  }, []);

  return (
    <svg
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        {/* lines: a visible hand, used on rules, borders and diagram strokes */}
        <filter id="pencil" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* vertical rules need a vertical grain, or they look combed */}
        <filter id="pencil-v" x="-6%" y="-6%" width="112%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.006" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        {/* a softer one, for the big plates where 2.6px would read as damage */}
        <filter id="pencil-soft" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
