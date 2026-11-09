"use client";

import { useEffect, useState } from "react";

/**
 * Every entrance on the cover is choreographed on top of the press. When the
 * press does not run (repeat visit, reduced motion, deep link) the choreography
 * must start immediately instead of holding a blank page for two seconds.
 */
export default function useIntro(expectedIfPending: number) {
  const [offset, setOffset] = useState(expectedIfPending);

  useEffect(() => {
    if (document.documentElement.dataset.intro !== "pending") {
      setOffset(0);
      return;
    }
    let done = false;
    const release = () => {
      if (done) return;
      done = true;
      setOffset(0);
    };
    window.addEventListener("tt:intro", release);
    const guard = window.setTimeout(release, 4200);
    return () => {
      window.removeEventListener("tt:intro", release);
      window.clearTimeout(guard);
    };
  }, []);

  return offset;
}
