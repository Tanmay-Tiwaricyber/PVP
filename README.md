# Tanmay Tiwari — Portfolio

Award-grade personal site for **Tanmay Tiwari** (*Silent Programmer*), full-stack engineer
and cybersecurity builder in Kanpur, India. Built as a single, fast, image-free
experience: every project preview on the page is drawn in CSS/SVG, not a screenshot.

> Live build: run `npm run dev` → <http://localhost:3000>

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack) | Static-first, but keeps metadata routes (`opengraph-image`, `sitemap`, `robots`, `manifest`) |
| UI | **React 19** | Server components for content, client components only where motion lives |
| Language | **TypeScript** (strict) | Content is typed (`Project`, `Repo`), so a typo is a build error |
| Styling | **Tailwind CSS 4** + custom `@theme` tokens | Design tokens: `ink`, `bone`, `signal`, `acid`, `cyan` |
| Motion | **Motion 14** (`motion/react`) | Mask reveals, scroll-linked timeline, layout transitions |
| Smooth scroll | **Lenis** | The long-form editorial scroll feel |
| Type | **Bricolage Grotesque** · **Instrument Serif** · **JetBrains Mono** | Self-hosted via Fontsource — no Google Fonts request at runtime |
| Graphics | Hand-written **Canvas 2D** | The hero "signal field" — no three.js, keeps the JS under budget |

Zero image assets, zero icon libraries, zero analytics.

---

## Design system

- **Palette** — near-black `#07070a`, bone `#f2efe6`, signal orange `#ff4d1f`,
  acid `#d9f24b`, cyan `#6fe3ff`.
- **Type scale** — fluid `clamp()` everywhere; display weight 600 at `-0.045em`
  tracking, mono labels at `0.18em` tracking and 9–11px.
- **Motion rules** — one easing curve (`cubic-bezier(.16,1,.3,1)`), 0.5–1.2s
  durations, `MotionConfig reducedMotion="user"` plus a `prefers-reduced-motion`
  CSS fallback that neutralises every keyframe.
- **Cursor** — difference-blend dot + lagging ring that grows on interactive targets
  (desktop, fine pointer only).
- **Grain** — a fixed SVG-turbulence layer at 3% opacity to kill banding in the gradients.

## Sections

1. **Hero** — scroll-linked wordmark, live ISK clock, canvas signal field, availability state.
2. **Marquee** — stack strip.
3. **Record** — animated counters from public GitHub data (175 repos, 435 stars, 101 followers).
4. **Work** — editorial index with an accent-coloured preview instrument panel per project
   (Hyper Island, ContribMatch, C Visualize, SyncPlay, Judge-Ready, GARUDA Club).
5. **Craft** — four capability accordions.
6. **Archive** — live, filterable, searchable index of all 175 public repositories.
7. **Path** — scroll-drawn six-year timeline + awards marquee.
8. **Contact** — copy-to-clipboard email, social list, oversized wordmark.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

### Static export (GitHub Pages / any CDN)

```bash
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/PVP npm run build   # → out/
```

`.github/workflows/deploy-pages.yml` does exactly this on every push to `main` and
publishes `out/` to GitHub Pages. Enable **Settings → Pages → Source: GitHub Actions**
once and the site is live at `https://tanmay-tiwaricyber.github.io/PVP/`.

### Vercel / Netlify

Import the repo, framework preset **Next.js**, no environment variables required.
Set `NEXT_PUBLIC_SITE_URL` to the final domain so `metadataBase`, `sitemap.xml` and
`robots.txt` point at the right origin.

---

## Content

All copy and numbers live in two files:

- `lib/site.ts` — profile, stats, projects, capabilities, timeline, awards, socials.
- `lib/repos.ts` — the 175-repository archive (name, language, stars, description, year).

Updating the portfolio is editing `lib/site.ts`; no component changes needed.

## Accessibility & performance notes

- One `<h1>` (screen-reader only) with a decorative wordmark, so the outline stays sane.
- Animated headline lines are `aria-hidden` pairs of their real, readable text.
- Every interactive element is a real `<a>`/`<button>` with `:focus-visible` rings.
- Canvas pauses when the tab is hidden; resize handled with `ResizeObserver`, capped DPR.
- Fonts are self-hosted and subset by Fontsource (latin / latin-ext / vietnamese).

## Licence

Content © Tanmay Tiwari. Code MIT.
