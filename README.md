# Tanmay Tiwari — Portfolio

A paper-and-ink portfolio for **Tanmay Tiwari** (*Silent Programmer*), full-stack engineer and
security builder in Kanpur, India.

Set like a printed volume: an oversized serif cover, numbered chapters, marginal notes, ruled
ledgers, drawn plates instead of screenshots, and a colophon to close. Two genuine palettes —
**Paper** (light, default) and **Ink** (dark) — with a physical two-position switch in the
masthead.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16** App Router, Turbopack |
| UI | **React 19** |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind 4** + a token layer (`--paper`, `--ink`, `--accent`, `--rule`…) |
| Motion | **Motion 14** — mask reveals, one drawn timeline, springs only where grabbed |
| Scroll | **Lenis** |
| Type | Instrument Serif · Bricolage Grotesque · JetBrains Mono (self-hosted) |

No images, no icon library, no analytics. Every plate is inline SVG that inherits the theme.

---

## The theme system

`<html data-theme>` + a `.dark` class drive both palettes from one token block in
`app/globals.css`. A pre-paint inline script reads `localStorage` (falling back to
`prefers-color-scheme`) so there is no flash. The switch lives in `components/theme-toggle.tsx`
and persists the choice.

Light is not an inversion of dark: hairlines, grain blend modes, halftone dot patterns and the
accent (vermilion `#c53c26` on paper, `#ff6041` on ink) are tuned per theme.

## Chapters

`01` The record · `02` Selected work · `03` How I work · `04` The security record ·
`05` Six years, in public · `06` The archive · `07` Colophon

## TryHackMe

`components/security.tsx` renders the dossier transcribed from
[tryhackme.com/p/TanmayTiwari](https://tryhackme.com/p/TanmayTiwari): **Legend** league,
**top 1%** global ranking, capability **70**, 40-day streak, five earned badges (with the real
badge artwork), top tools, completed rooms, the skill matrix, and the verified **DEADFACE CTF
2024** credential. Figures are labelled with the capture date rather than implied to be live;
`/api/tryhackme` remains available as an optional live source.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production
STATIC_EXPORT=1 npm run build   # static out/ for any CDN
```

Live: **https://tanmay-portfolio-mu.vercel.app**

Content lives in `lib/site.ts` (profile, stats, work, TryHackMe, timeline) and `lib/repos.ts`
(the 175-repository archive).

## Licence

Content © Tanmay Tiwari. Code MIT.
