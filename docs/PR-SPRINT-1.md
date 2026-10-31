# Sprint 1: Critical Technical SEO, with build-time prerendering

**Branch:** `feature/advanced-seo-prerender` → `main`
**Replaces:** the earlier `feature/advanced-seo` PR draft. This branch contains all of it, plus the prerender that fixes the raw-HTML blocker.
**Status:** for review. Nothing merged or deployed to production. Sprints 2–6 are not included.

## The blocker this fixes

Before this change, the page metadata was set by JavaScript only. A crawler or link-preview scraper that doesn't run JavaScript received no `<title>`, description, canonical or `<h1>` for either route. Today's production site serves the homepage's title and canonical on `/upcoming-projects`.

After this change, both routes ship their correct metadata and visible content in the initial HTML, before any JavaScript runs:

| Raw HTML (`curl`, no JavaScript) | `/` | `/upcoming-projects` |
|---|---|---|
| `<title>` | SENOVA Digital Labs \| Web Development & SaaS Company in Raichur | Upcoming Projects \| SENOVA Digital Labs |
| Canonical | `https://www.senovadigital.xyz/` | `https://www.senovadigital.xyz/upcoming-projects` |
| Meta description | 1, page-specific | 1, page-specific |
| `og:url` | matches canonical | matches canonical |
| `<h1>` | 1: "THINK Creatively." | 1: "Upcoming Projects" |
| Body content | full page (79.8 kB) | full page (25.1 kB) |
| JSON-LD | ProfessionalService, Organization, WebSite | ProfessionalService |

`/upcoming-projects/` (trailing slash) serves the same page. Unknown URLs get an empty shell with **no** canonical, so no URL can be indexed as a copy of the homepage.

## How it works

This is **not** a framework migration. Routing, components and the deployment model are unchanged; Vercel still serves static files from `dist/`.

1. **Build** (`npm run build`) now runs three steps:
   - `vite build` builds the browser bundle, as before.
   - `vite build --ssr src/entry-server.jsx --outDir dist-ssr` builds a Node version of the same app.
   - `node scripts/prerender.mjs` renders `/` and `/upcoming-projects` to HTML with `react-dom/server` and writes `dist/index.html` and `dist/upcoming-projects/index.html`.
2. **The build fails** if either page doesn't have exactly 1 `<title>`, 1 `<h1>`, 1 meta description and 1 canonical with the expected URL. A broken page can't ship silently.
3. **In the browser**, `src/main.jsx` calls `hydrateRoot`, so React reuses the prerendered DOM instead of discarding and re-rendering it.
4. **Unknown URLs**: `vercel.json` rewrites them to `spa-fallback.html`, the untouched shell. Vercel serves real files before applying rewrites, so the two prerendered pages are served directly.

### Deployment implications

| | Before | After |
|---|---|---|
| Build command | `vite build` | `npm run build` (3 steps), pinned in `vercel.json` so a dashboard override can't skip the prerender |
| Build time | about 3 s | about 7 s locally (prerender step about 2 s) |
| New dependencies | | **none**: Node built-ins plus packages already in `dependencies` |
| Needs a browser at build time | no | no (works on Vercel's standard build image) |
| Network access at build time | no | no (verified with all outbound blocked) |
| Runtime / hosting | static files | static files, unchanged |
| Adding a route | add to `App.jsx` | add to `AppShell.jsx` **and** the `ROUTES` list in `scripts/prerender.mjs` (and the sitemap) |

**Not verified on real Vercel:** branch previews are behind Vercel login (Deployment Protection), so I couldn't fetch them. To verify, open the preview deployment for this branch while logged in, or run the commands in "After deployment" below.

## Hydration: what broke and how it was fixed

Hydration requires the server-rendered and browser-rendered markup to be identical. Four problems surfaced, each confirmed by a failing test before it was fixed:

1. **`NotifyButton` read `Notification` and `navigator` during render.** In Node these don't exist, so the server rendered nothing while the browser rendered a button. React error #418 followed: hydration failed, and React re-rendered but left the prerendered `<head>` tags behind, giving **2 titles and 2 canonicals**. Fix: a `useHasMounted` hook (`useSyncExternalStore` with a separate server snapshot). The button renders nothing until after hydration, matching the HTML, then reads the browser state. Behaviour checked against `main` with permission at default, granted, and the API unavailable: identical in all three.
2. **Fade-in images stayed invisible.** Portfolio, founder and upcoming-project images start at `opacity: 0` and fade in on React's `onLoad`. With prerendering, the browser can finish loading an image before React attaches that listener, so the event is missed. Reproduced deterministically with JavaScript delayed 1.5 s: 7 images stayed invisible; `main` had 0. Fix: a `useImageLoaded` hook whose ref callback checks `img.complete` when React attaches. 0 invisible images at 0 s, 1.5 s and 4 s JavaScript delay.
3. **The hero was invisible in the HTML.** Framer Motion writes its `initial` state into the HTML, so the H1, both paragraphs, the CTA row and the logo were prerendered at `opacity: 0`. The H1 was present but not visible until JavaScript ran, which cancels most of the LCP benefit and leaves a blank hero if JavaScript fails. Fix: the hero change already approved for Sprints 2–6. The H1, paragraphs and CTA render without a fade-in, and the logo keeps a scale-in with no fade. The trust badge keeps its fade.
4. **Footer year** used `new Date()` at render, which would mismatch for a build served across a new year. Fix: a build-time constant (`__BUILD_YEAR__` in `vite.config.js`).

Hydration warnings are not suppressed anywhere. `verify:seo` fails on any hydration error.

## Other changes

- **CSS reset moved into `@layer base`** (`src/index.css`), approved earlier. In Tailwind v4, utilities live in a cascade layer and unlayered CSS beats every layer, so the old `* { margin: 0; padding: 0 }` overrode them. Measured on this build: **364 of 372** padding/margin declarations on the homepage were inert before, **0** after (64 of 64 inert on `/upcoming-projects` before, 0 after). See "Spacing review".
- **Tailwind scanning excludes `docs/`** (`@source not "../docs"`). The committed Lighthouse HTML reports contain thousands of class-like strings, and Tailwind was generating unused CSS from them (57.16 → 59.39 kB). That was a bug from my own earlier commit; CSS is back to 57.14 kB.
- **`fetchPriority` casing** in Hero and Navbar. React printed a warning for the lowercase form during prerender. The priority hint still reached the browser before, so this only silences the warning.
- **Schema:** `priceRange` and `geo` coordinates removed (earlier commit), as nothing on the site supports them.

## Files changed vs `main`

| File | Change |
|---|---|
| `src/components/SEO.jsx` (new) | Per-route title, description, canonical, robots, Open Graph, Twitter, JSON-LD |
| `src/AppShell.jsx` (new) | Layout and routes, shared by browser and prerender |
| `src/entry-server.jsx` (new) | Build-time render entry |
| `src/hooks/useHasMounted.js` (new) | Hydration-safe "has mounted" flag |
| `src/hooks/useImageLoaded.js` (new) | Hydration-safe image load tracking |
| `scripts/prerender.mjs` (new) | Writes the two pages and validates them |
| `scripts/verify-seo.mjs` (new) | 41 checks (below) |
| `scripts/capture-layout.mjs`, `scripts/lighthouse-run.mjs` (new) | Screenshot/spacing audit and repeatable Lighthouse runs (dev tools, not part of the build) |
| `src/main.jsx` | `HelmetProvider`; `hydrateRoot` when prerendered HTML is present |
| `src/App.jsx` | Wraps `AppShell` in `BrowserRouter` |
| `src/components/NotifyButton.jsx` | Browser checks moved after mount |
| `src/components/Hero.jsx` | Hero text/CTA without fade-in; one visible descriptive subheading; `fetchPriority` |
| `src/components/Portfolio.jsx`, `FoundersSection.jsx`, `src/pages/UpcomingProjects.jsx` | `useImageLoaded`; `/#contact-form` link fix (Portfolio); `<SEO>` and `h1` (UpcomingProjects) |
| `src/components/Offer.jsx` | Duplicate `h1` demoted to `h2` |
| `src/components/Footer.jsx` | Build-time year |
| `src/components/Navbar.jsx` | `fetchPriority` casing |
| `src/pages/Home.jsx` | `<SEO>` with Organization + WebSite JSON-LD |
| `src/index.css` | Reset in `@layer base`; `@source not "../docs"` |
| `index.html` | Route-specific static tags removed (prerender now provides them); `priceRange`/`geo` removed |
| `vercel.json` | Pinned build command and output directory; rewrite to `spa-fallback.html` |
| `vite.config.js` | `__BUILD_YEAR__` |
| `eslint.config.js` | Ignore `dist-ssr`; declare `__BUILD_YEAR__` |
| `package.json` | `build` runs the 3 steps; `verify:seo` script |
| `public/sitemap.xml` | `lastmod` corrected |
| `docs/` | This description, the roadmap, Lighthouse reports, screenshots |

## Test results

All on a clean build of this branch.

**`npm run build`**: exit 0. `dist/index.html` 79.8 kB (prerendered), `dist/upcoming-projects/index.html` 25.1 kB. CSS 57.14 kB. JS 689.9 kB / 214.9 kB gzip (`main`: 670.1 / 208.5); the +19 kB is `react-helmet-async`. The pre-existing ">500 kB chunk" warning remains (Sprint 6 scope).

**`npm run verify:seo`: 41/41 pass.** It serves `dist/` with Vercel's resolution rules and checks in Chromium:
- **JavaScript off, both routes:** HTTP 200; exactly 1 title with the expected text; 1 non-empty description; 1 canonical with the expected URL; `robots` = `index, follow`; `og:url` = canonical; 1 `h1` with the expected text; expected JSON-LD types, all valid; key body text present.
- **JavaScript on, both routes:** the prerendered DOM is reused, not replaced; zero hydration or page errors; still exactly 1 of each tag; JSON-LD not duplicated.
- **Other URLs:** the trailing-slash URL serves the right page; unknown URLs get the shell with no canonical.
- **Navigation and images:** client-side navigation updates title and canonical; no loaded image stays invisible with JavaScript delayed 2 s.
- **Sitemap:** lists exactly the two routes.

The suite was checked against known-bad code. With the original `NotifyButton` restored it reports 14 failures, including React #418 and the duplicate titles. With the image fix removed from Portfolio it fails naming the 4 Portfolio images.

**`npm run lint`:** 2 problems, both pre-existing on `main`: `importScripts` in `OneSignalSDKWorker.js`, and an unused-import false positive for `motion` in `NotifyButton.jsx`. `main` has 3; the `exhaustive-deps` warning is gone.

## Spacing review (CSS reset)

Screenshots are in `docs/screenshots/` (`before-*` / `after-*`, desktop 1280 px and mobile 390 px, both routes, 50% scale). They differ only in the reset change.

| Page | Before | After |
|---|---|---|
| `/` desktop | 4,657 px | 8,641 px |
| `/` mobile | 6,666 px | 10,508 px |
| `/upcoming-projects` desktop | 1,350 px | 1,967 px |
| `/upcoming-projects` mobile | 1,548 px | 2,159 px |

- **Every section's padding now equals its class.** The root font size is `clamp(16px, 15.6px + 0.12vw, 18px)`, so `lg:py-32` = 8rem = 137.1 px at 1280 px and `py-20` = 5rem = 80.3 px at 390 px. Before, all of them computed 0 px. Per-section numbers are in `docs/screenshots/*-layout.json`.
- **No unintended gaps:** space between consecutive sections is 0–1 px (rounding) everywhere. The extra height is entirely the padding the sections already declared.
- **No layout regressions detected:** no horizontal scroll and no element wider than the viewport, on either route, before or after.
- **Every spacing utility checked, not just sections:** 372 declarations on `/` and 64 on `/upcoming-projects` all match their classes after the change, on desktop and mobile.

This is a large visual change. The numbers show the classes now do what they say; whether the designed spacing is the spacing you want is a design call. Please look at the screenshots.

## Performance (Lighthouse, mobile, `/`)

Interleaved with `main` on the same machine, 6 runs each, simulated slow 4G and 4x CPU:

| | Performance median (range) | FCP | LCP | TBT | CLS |
|---|---|---|---|---|---|
| `main` | 46 (45–50) | 3.74 s | 5.78 s | 865 ms | 0 |
| This branch | 49 (45–59) | 3.41 s | **4.40 s** | 1,187 ms | 0.002 |

- **LCP improves.** In 5 of 6 runs it was 4.33–5.37 s, against 5.71–6.14 s for every `main` run. One run spiked to 9.18 s.
- **TBT is higher.** Hydration runs on page load (865 → 1,187 ms median).
- **The score difference is within run-to-run noise.** Treat it as unchanged.
- **Mobile is still not optimized:** LCP is above the 2.5 s target. Desktop: median 96 (81–96) vs 92 for `main`.

HTML reports are in `docs/lighthouse/`. The follow-up plan is in the Sprints 2–6 review (`docs/MOBILE-PERFORMANCE.md`), not in this PR.

## Remaining limitations

- Real Vercel behaviour (build log, file serving) not observed; previews require login.
- Lighthouse numbers are local and noisy. Use PageSpeed Insights on the deployed preview for decisions.
- The navbar's slide-in starts off-screen (`y: -100`), so without JavaScript it isn't visible. Its links are still in the HTML for crawlers. Not changed here.
- Homepage schema declares the business twice (`ProfessionalService` and `Organization`). Valid, but merged into one entity in Sprint 2.
- Routes are listed by hand in `prerender.mjs` and `sitemap.xml` (two routes).
- Not validated by Google's Rich Results Test or Search Console; that needs the deployed URL.

## How to verify locally

```
git checkout feature/advanced-seo-prerender
npm install
npm run build
npm run verify:seo      # set CHROMIUM_PATH if Playwright's browser build isn't installed
npm run preview         # then View Source on / and /upcoming-projects
```

## After deployment

1. `curl -s https://www.senovadigital.xyz/upcoming-projects | grep -E "<title>|rel=\"canonical\"|<h1"`: must show the Upcoming Projects title, its own canonical, and an h1.
2. The same for `/`.
3. `/upcoming-projects/` and a refresh on `/upcoming-projects`: HTTP 200, same page.
4. `/sitemap.xml` and `/robots.txt`: 200, two URLs, no `noindex`.
5. An unknown URL: 200 shell, and View Source shows no canonical.
6. Rich Results Test on `/`; LinkedIn Post Inspector or a WhatsApp paste for the link preview.
7. PageSpeed Insights (mobile) on `/` before and after.
