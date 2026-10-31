# Sprint 1: Critical Technical SEO

**Branch:** `feature/advanced-seo` → `main`
**Scope:** Sprint 1 only. Sprints 2–6 are not part of this PR (see `docs/SEO-ROADMAP.md`). Nothing here has been merged or deployed.

## Read this first: one trade-off to approve

This PR moves all route metadata (title, description, canonical, Open Graph, Twitter) out of the static `index.html` and into a per-route `<SEO>` component that runs in the browser. That is required to get correct, unique tags per route, but it has a direct consequence:

Measured on the live site (production = `main`) on 2026-10-31: `/upcoming-projects` currently serves the homepage's title and canonical (`https://www.senovadigital.xyz/`) in its raw HTML, and no route has an `<h1>` in raw HTML.

| Raw HTML (what a crawler gets **without** running JavaScript) | `main` today | This PR |
|---|---|---|
| `<title>` | present (homepage title on every route) | **absent** |
| meta description, canonical, `og:*`, `twitter:*` | present (homepage values on every route) | **absent** |
| `<h1>` | absent (client-rendered) | **absent** |
| Body content | absent (client-rendered) | **absent** |
| JSON-LD | `ProfessionalService` | `ProfessionalService` |

After JavaScript runs, every route has exactly one correct title, canonical and H1 (verified below). Googlebot and Bing execute JavaScript, so search indexing should work. **Crawlers and link-preview scrapers that do not run JavaScript (WhatsApp, LinkedIn, Facebook, X/Twitter previews and similar) will lose the title, description and image preview** until the site is prerendered. Prerendering is the Sprint 2 work (implemented separately on `feature/advanced-seo-sprints-2-6`, not part of this PR and not approved yet).

Practical consequence: the "title, canonical, H1 and content exist in the raw HTML" check **cannot pass on this PR alone**. Options:
1. Merge and deploy this PR together with the Sprint 2 prerender once that is approved (recommended).
2. Merge this PR alone and accept weaker link previews until Sprint 2.
3. Hold this PR.

## Summary

Fixes the technical SEO foundation: route-specific metadata via a reusable `<SEO>` component, correct canonical URLs, removal of the duplicate homepage H1, removal of meta tags and schema fields with no supporting evidence, and a sitemap/robots/anchor audit. No design, branding, animation, routing or functional changes (Firebase, contact form, WhatsApp and OneSignal are untouched).

## Why this PR exists

`react-helmet-async` was already a dependency but had no `HelmetProvider` and was never used; all metadata was static and global in `index.html`, so every route (including future ones) shared one title and canonical. The homepage also rendered two `<h1>` elements (Hero's "THINK Creatively." and Offer's "Scale Your Business..."), `/upcoming-projects` had no `<h1>`, and `index.html` carried tags with no SEO value (`keywords`, `geo.region`, `geo.placename`, `ICBM`).

## Files modified

| File | Change |
|---|---|
| `src/components/SEO.jsx` (new) | Reusable per-route component: title, description, canonical, robots, Open Graph, Twitter Card, optional JSON-LD. Every route passes explicit values; nothing is built by string concatenation. |
| `src/main.jsx` | Wraps the app in `HelmetProvider`. |
| `index.html` | Removed `meta[name=keywords]`, `geo.region`, `geo.placename`, `ICBM`, and every static title/description/canonical/OG/Twitter tag (see "Bug found"). In the `ProfessionalService` JSON-LD, removed `priceRange` and `geo` coordinates (see "Schema"). |
| `src/pages/Home.jsx` | `<SEO>` with homepage title, description, canonical `https://www.senovadigital.xyz/`, plus `Organization` and `WebSite` JSON-LD built only from details the site already publishes. |
| `src/pages/UpcomingProjects.jsx` | `<SEO>` with its own title, description and canonical; main heading promoted from `h2` to `h1` (the page had no H1). |
| `src/components/Hero.jsx` | "THINK Creatively." stays the single homepage H1; added a visible descriptive subheading: "Custom Website Development, SaaS Solutions & Business Automation for Growing Businesses." |
| `src/components/Offer.jsx` | Heading demoted `h1` → `h2` (fixes the duplicate H1). No copy, style or layout change. |
| `src/components/Portfolio.jsx` | Bare `<a href="#contact-form">` → `<Link to="/#contact-form">`, consistent with every other in-page anchor. |
| `public/sitemap.xml` | `lastmod` corrected. `robots.txt` audited, no change needed. |
| `docs/SEO-ROADMAP.md`, `docs/PR-SPRINT-1.md` (new) | Roadmap for Sprints 2–6 and this description. |

## Technical implementation

- `<SEO>` renders `<title>`, `<meta>`, `<link rel="canonical">` and JSON-LD `<script>` tags through `react-helmet-async`. On React 19 that library lets React hoist those tags into `<head>`, so route changes update the head correctly (verified with client-side navigation).
- Each route supplies its own `title`, `description` and `canonicalUrl`. Social tags default to the same page's values, never another page's.
- `index.html` keeps only global tags: charset, viewport, theme-color, author, icons, manifest, the logo preload, the OneSignal script, and the static `ProfessionalService` JSON-LD.

### Bug found during verification

The first implementation kept a fallback title and canonical in `index.html`, assuming Helmet would replace them. It does not remove static tags it didn't render itself. Rendered-DOM inspection showed 2 `<title>` and 2 `<link rel="canonical">` tags on every page, and on `/upcoming-projects` the leftover static canonical was the homepage URL. Fixed by removing all route-specific static tags, so `<SEO>` is the single source per route. This is also the cause of the raw-HTML trade-off above.

### Schema (`ProfessionalService` in `index.html`)

Kept, because each is published on the site or was specified as the business's location: `name`, `url`, `image`, `email`, `telephone` (+91 9731133425, shown in the footer and contact section), `sameAs` social profiles (linked in the footer), `makesOffer` (matches the hero subheading), and a **city-level** `address` (Raichur, Karnataka, IN; no street address).

Removed, because nothing on the site supports them:
- `priceRange: "$$"`: no prices are published anywhere.
- `geo` coordinates (16.2076, 77.3463): these are city-centre coordinates for Raichur, not a verified office location.

Open items for SENOVA: "Raichur" and "Karnataka" appear in the page title and meta description but not in the visible page body, so the address is not corroborated by visible text; consider adding a visible "Based in Raichur, Karnataka" line. `areaServed` includes "Worldwide", matching the homepage description ("businesses in Raichur and worldwide").

## Test results

All checks run against the production build of this branch, served locally with a Vercel-style SPA rewrite (exact file, otherwise `index.html` with HTTP 200), in Chromium via Playwright with external hosts blocked.

**Build:** `npm run build` exits 0. `dist/index.html` is 4.24 kB (`main`: 5.30 kB). Main JS bundle is 689.4 kB / 214.7 kB gzip (`main`: 670.1 kB / 208.5 kB gzip); the 19 kB increase is `react-helmet-async`, which was a dependency but previously unused and tree-shaken out. The pre-existing ">500 kB chunk" warning remains and is out of scope.

**Rendered DOM (JavaScript on):**

| Check | `/` | `/upcoming-projects` | `/upcoming-projects/` |
|---|---|---|---|
| HTTP status | 200 | 200 | 200 |
| `<title>` count / text | 1 / "SENOVA Digital Labs \| Web Development & SaaS Company in Raichur" | 1 / "Upcoming Projects \| SENOVA Digital Labs" | same as left |
| Canonical count / value | 1 / `https://www.senovadigital.xyz/` | 1 / `https://www.senovadigital.xyz/upcoming-projects` | 1 / `.../upcoming-projects` (no trailing slash) |
| `<h1>` count / text | 1 / "THINK Creatively." | 1 / "Upcoming Projects" | 1 / same |
| Meta description, `og:title` | 1 each | 1 each | 1 each |
| `keywords`, `geo.*`, `ICBM` meta | none | none | none |
| JSON-LD types | ProfessionalService, Organization, WebSite | ProfessionalService | ProfessionalService |
| `priceRange` / `geo` in schema | removed | removed | removed |

**Raw HTML (JavaScript off):** HTTP 200 on all three URLs, but title, description, canonical, `og:*`, `<h1>` and body text are all absent; only the static `ProfessionalService` JSON-LD is present. See the trade-off at the top.

**Direct load / refresh:** `/upcoming-projects` and `/upcoming-projects/` return 200 and render correctly when requested directly (SPA rewrite). The same rewrite exists in the unchanged `vercel.json`; confirm on the real deployment.

**Navigation:** "Work" nav link → `/#portfolio`; `/upcoming-projects` early-access link → homepage `#contact-form` (cross-route hash scroll works); Portfolio's bottom CTA is now `href="/#contact-form"`. No new console errors; OneSignal rejects non-production hosts, which is pre-existing.

**Sitemap / robots:** `sitemap.xml` lists exactly `/` and `/upcoming-projects` with `lastmod` 2026-10-31. `robots.txt` allows all and points at the sitemap. No `noindex` anywhere.

**Lint:** `npm run lint` reports 3 problems (OneSignalSDKWorker.js, NotifyButton.jsx), identical to `main`. No new issues.

## Remaining limitations

- **Raw HTML has no per-route metadata or content until prerendering exists** (top of this document). Biggest effect: link previews on non-JS scrapers.
- Homepage schema declares the business twice (`ProfessionalService` in `index.html` and `Organization` from `Home.jsx`). Valid, but duplicated; Sprint 2 merges them into one entity.
- Sitemap is hand-maintained (two routes).
- Pre-existing >500 kB JS chunk (Sprint 6 scope); this PR adds 19 kB (`react-helmet-async`).
- Mobile performance is not addressed here and is not optimized. Lighthouse mobile on this branch: median 42 (5 runs, local), versus 44 for `main` under the same conditions, which is within run-to-run noise. Live production mobile: median 32 (3 runs). HTML reports and summaries in `docs/lighthouse/` on this branch.
- Schema `address` is not corroborated by visible body text (see Schema).
- Not validated by Google's Rich Results Test or Search Console; that needs the deployed URL.
- No Google Analytics or Search Console changes in this PR.

## How to verify locally

```
git checkout feature/advanced-seo
npm install
npm run build
npm run preview
# open http://localhost:4173/ and /upcoming-projects, inspect <head> and <h1> in DevTools
# View Source shows the metadata is absent from the raw HTML (see trade-off above)
```

## After deployment (checklist for the live site)

1. `/` and `/upcoming-projects`: rendered DOM has 1 title, 1 canonical, 1 H1 (DevTools Elements, or "Inspect" in Search Console URL Inspection → Live Test → View tested page).
2. `/sitemap.xml` and `/robots.txt` load, list the two URLs, no `noindex`.
3. Direct load and refresh of `/upcoming-projects` return 200.
4. Paste `/` into a link-preview tool (for example a WhatsApp chat or the LinkedIn Post Inspector) to see the effect of the raw-HTML trade-off.
5. Rich Results Test on `/` for the `ProfessionalService`, `Organization` and `WebSite` schema.
