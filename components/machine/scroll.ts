"use client";

/**
 * One scroll model for the whole machine.
 *
 * The canvas is fixed behind the document, so it cannot have a scroll container
 * of its own. Instead every chapter declares a camera stop (`data-cam`) and a
 * HUD identity (`data-layer` / `data-depth`); this module reads those elements
 * once per resize and interpolates between them from the viewport centre. The
 * camera therefore always arrives at a layer when that chapter arrives — the
 * descent cannot drift out of sync with the words.
 */

export type CamStop = { pos: [number, number, number]; look: [number, number, number] };

export const machine = {
  /** camera interpolation state, written on scroll */
  from: null as CamStop | null,
  to: null as CamStop | null,
  t: 0,
  /** 0 → 1 across the whole document, for anything that wants it */
  progress: 0,
  /** the camera's own y, so layers can decide their own presence */
  camY: 0.6,
  px: 0,
  py: 0,
  /** timestamp of the last packet fired by the network chapter */
  packet: 0,
  /** HUD text, decided by whichever chapter owns the viewport centre */
  layer: "SURFACE",
  depth: "0000 m",
  index: 0,
  count: 1,
};

type Anchor = {
  el: HTMLElement;
  cam: CamStop;
  layer: string;
  depth: string;
};

let anchors: Anchor[] = [];
let centres: number[] = [];
let bound = false;

const smooth = (x: number) => x * x * (3 - 2 * x);

function parseCam(raw: string | null): CamStop {
  if (!raw) return { pos: [0, 0.6, 7.4], look: [0, 0.2, 0] };
  const [posPart, lookPart] = raw.split("|");
  const num = (s: string) => s.split(",").map(Number) as [number, number, number];
  return { pos: num(posPart), look: num(lookPart ?? posPart) };
}

function measure() {
  anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-cam]")).map((el) => ({
    el,
    cam: parseCam(el.dataset.cam ?? null),
    layer: el.dataset.layer ?? "SURFACE",
    depth: el.dataset.depth ?? "0000 m",
  }));
  centres = anchors.map((a) => {
    const r = a.el.getBoundingClientRect();
    return window.scrollY + r.top + r.height / 2;
  });
}

let lastMeasure = 0;

function read() {
  // heights change as plates and fonts settle, so the map is refreshed as we
  // scroll rather than only at mount — a stale map is a desynced camera.
  const now = performance.now();
  if (anchors.length === 0 || now - lastMeasure > 220) {
    measure();
    lastMeasure = now;
  }
  const y = window.scrollY + window.innerHeight / 2;
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  machine.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

  if (anchors.length < 2) return;

  // before the first stop / after the last one
  if (y <= centres[0]) {
    machine.from = anchors[0].cam;
    machine.to = anchors[0].cam;
    machine.t = 0;
    machine.camY = anchors[0].cam.pos[1];
    machine.layer = anchors[0].layer;
    machine.depth = anchors[0].depth;
    machine.index = 0;
    machine.count = anchors.length;
    return;
  }
  const last = anchors.length - 1;
  if (y >= centres[last]) {
    machine.from = anchors[last].cam;
    machine.to = anchors[last].cam;
    machine.t = 0;
    machine.camY = anchors[last].cam.pos[1];
    machine.layer = anchors[last].layer;
    machine.depth = anchors[last].depth;
    machine.index = last;
    machine.count = anchors.length;
    return;
  }

  let i = 0;
  while (i < last - 1 && y > centres[i + 1]) i++;
  const span = Math.max(1, centres[i + 1] - centres[i]);
  const t = Math.min(1, Math.max(0, (y - centres[i]) / span));

  machine.from = anchors[i].cam;
  machine.to = anchors[i + 1].cam;
  machine.t = t;
  machine.camY = machine.from.pos[1] + (machine.to.pos[1] - machine.from.pos[1]) * smooth(t);

  // the HUD reads the chapter you are closest to, and switches over the seam
  const owner = t < 0.55 ? i : i + 1;
  machine.layer = anchors[owner].layer;
  machine.depth = anchors[owner].depth;
  machine.index = owner;
  machine.count = anchors.length;
}

export function bindMachine() {
  if (bound || typeof window === "undefined") return () => {};
  bound = true;

  let queued = false;
  let raf = 0;

  const onScroll = () => {
    if (queued) return;
    queued = true;
    raf = requestAnimationFrame(() => {
      queued = false;
      read();
    });
  };

  const onResize = () => {
    // sections change height with the viewport and with late font swaps
    measure();
    read();
  };

  const onPointer = (e: PointerEvent) => {
    machine.px = (e.clientX / window.innerWidth) * 2 - 1;
    machine.py = (e.clientY / window.innerHeight) * 2 - 1;
  };

  const remeasure = () => window.setTimeout(onResize, 400);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("pointermove", onPointer, { passive: true });
  window.addEventListener("load", remeasure);
  if (document.fonts?.ready) document.fonts.ready.then(onResize).catch(() => {});
  measure();
  read();

  return () => {
    bound = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("load", remeasure);
  };
}

export function firePacket() {
  machine.packet = performance.now();
}
