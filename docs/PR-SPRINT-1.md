# Sprint 1 — Critical Technical SEO

**Branch:** `feature/advanced-seo` → `main`
**Scope:** Sprint 1 only (per the Advanced SEO Audit master task). Sprints 2–6 are documented but not implemented — see `docs/SEO-ROADMAP.md`.

## Summary

Fixes the technical SEO foundation: route-specific metadata via a reusable `<SEO>` component, correct canonical URLs, removal of the duplicate homepage H1, cleanup of meta tags with no ranking value, and a sitemap/robots/anchor-link audit. No design, branding, animation, routing, or functional changes (Firebase, contact form, WhatsApp, OneSignal all untouched).

## Why this PR exists

`react-helmet-async` was already a dependency but had no `HelmetProvider` and was never actually used anywhere — all metadata was static and global in `index.html`, so every route (including future ones) would have shared the same title/description/canonical. The homepage also rendered two `<h1>` elements (Hero's "THINK Creatively." and Offer's "Scale Your Business..."), and `index.html` carried several meta tags with no SEO value (`keywords`, `geo.region`, `geo.placename`, `ICBM`).

## What changed

### New
- `src/components/SEO.jsx` — reusable per-route component (title, description, canonical, robots, Open Graph, Twitter Card, optional JSON-LD). No string-concatenated titles/canonicals; every route passes explicit values.
- `docs/SEO-ROADMAP.md` — Sprint 1 summary + Sprints 2–6 high-level plan + researched prerendering recommendation (not implemented).

### Modified
- `src/main.jsx` — wrap the app in `HelmetProvider`.
- `index.html` — removed `meta[name=keywords]`, `geo.region`, `geo.placename`, `ICBM`, and all static title/description/canonical/OG/Twitter tags (see "Bug found" below for why). Kept only global tags (charset, viewport, theme-color, author, icons, manifest, preload, OneSignal script) and the existing, verified `ProfessionalService` JSON-LD as a static fallback for non-JS crawlers.
- `src/pages/Home.jsx` — added `<SEO>` with homepage title/description/canonical (`https://www.senovadigital.xyz/`) plus `Organization` + `WebSite` JSON-LD built only from already-verified business data (name, url, logo, email, telephone, social links).
- `src/pages/UpcomingProjects.jsx` — added `<SEO>` with its own unique title/description/canonical (`https://www.senovadigital.xyz/upcoming-projects`); promoted its main heading from `h2` to `h1` (the page previously had zero H1s).
- `src/components/Hero.jsx` — kept "THINK Creatively." as the homepage's single H1; added a new, visible (not screen-reader-only) descriptive subheading between the H1 and the existing tagline: *"Custom Website Development, SaaS Solutions & Business Automation for Growing Businesses."*
- `src/components/Offer.jsx` — demoted its heading from `h1` to `h2` (fixes the duplicate H1). No copy, styling, or layout change.
- `src/components/Portfolio.jsx` — replaced a bare `<a href="#contact-form">` with `<Link to="/#contact-form">` for consistency with every other in-page anchor in the codebase.
- `public/sitemap.xml` — corrected `lastmod` dates. `robots.txt` was audited and needs no changes (already correct: allows all crawling, correct sitemap reference, no accidental noindex, no blocked assets).

## Bug found during verification (important)

Initial implementation kept a "fallback" title/canonical in `index.html` for non-JS crawlers, assuming Helmet would overwrite it. **It does not.** `react-helmet-async` only de-duplicates tags it has itself previously rendered — it never removes or replaces static tags already present in the HTML. Rendering both routes with Playwright showed **2 `<title>` tags and 2 `<link rel="canonical">` tags** on every page, and on `/upcoming-projects` the leftover static tag was literally the homepage's canonical URL — a direct violation of "no duplicate/misleading canonical tags." Fixed by removing all route-specific static tags from `index.html` entirely; the `<SEO>` component is now the single source of truth per route. Re-verified: exactly 1 canonical and 1 title tag on each route after the fix.

## Test results

**Production build:** `npm run build` — succeeds, exit 0, ~3–46s depending on cache. `dist/index.html` shrank from 5.69 kB to 4.14 kB (removed duplicate static tags). JS bundle unchanged (689.40 kB / 214.68 kB gzip). The pre-existing ">500kB chunk" warning is unrelated to this PR and is deferred to Sprint 6 performance work.

**Rendered HTML verification (Playwright, both routes):**

| Check | `/` | `/upcoming-projects` |
|---|---|---|
| HTTP status | 200 | 200 |
| `<title>` count | 1 | 1 |
| `<link rel="canonical">` count | 1 (`.../`) | 1 (`.../upcoming-projects`) |
| `<h1>` count | 1 ("THINK Creatively.") | 1 ("Upcoming Projects") |
| `meta[name=keywords]` / `geo.*` / `ICBM` present | none | none |
| JSON-LD scripts | 3 (ProfessionalService, Organization, WebSite) | 1 (ProfessionalService) |
| Unique title/description/OG/Twitter vs. other route | yes | yes |

**Direct route access / refresh:** `/upcoming-projects` and `/upcoming-projects/` both return 200 directly (simulated via `vite preview`, same SPA-rewrite mechanism as `vercel.json` in production).

**Navigation/anchor checks (Playwright):**
- Homepage "Work" nav link → `/#portfolio` ✓
- `/upcoming-projects` → "Want early access" link → navigates to homepage and lands on `#contact-form` ✓ (confirms `ScrollToHash.jsx` handles cross-route hash links correctly)
- Portfolio's bottom CTA now has `href="/#contact-form"` (previously a bare, route-fragile anchor) ✓
- No new console errors. The only console errors observed are OneSignal rejecting `localhost` (it's domain-locked to `senovadigital.xyz`) — pre-existing, expected, unrelated to this PR.

**Lint:** `npm run lint` — 3 pre-existing problems (2 errors in `OneSignalSDKWorker.js`, 1 error + 1 warning in `NotifyButton.jsx`). Confirmed identical on `main` via `git stash` + `git checkout main` — **zero new lint issues introduced by this branch.**

## Remaining limitations / explicitly out of scope for this PR

- No prerendering/SSG implemented yet. Researched three options (custom Playwright script, `vite-react-ssg`, React Router v7 framework mode) — see `docs/SEO-ROADMAP.md`. Recommend the custom-script approach for Sprint 2, since the other two require migrating off the current declarative `react-router-dom` setup. Not implemented here per instructions not to introduce rendering-architecture changes without separate approval.
- Sitemap is still manually maintained (only 2 real routes exist today). Automated generation becomes worthwhile once Sprint 3+ adds more routes.
- Pre-existing >500 kB JS chunk warning is untouched — Sprint 6 scope.
- Service pages, case studies, blog, and local SEO content are Sprint 3–5 scope and require real content/business info from SENOVA before implementation (see content rules in the roadmap doc).

## How to verify locally

```
git checkout feature/advanced-seo
npm install
npm run build
npm run preview
# then visit http://localhost:4173/ and http://localhost:4173/upcoming-projects
# view-source or inspect <head> to confirm single title/canonical/H1 per route
```
