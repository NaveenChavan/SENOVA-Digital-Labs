# SENOVA Digital Labs — Advanced SEO Roadmap (Sprints 1–6)

**Status:** Sprint 1 implemented and verified on `feature/advanced-seo`. Sprints 2–6 are planned only — not implemented. Each sprint requires separate review and approval before work begins.

**Owner of business content/metrics:** SENOVA team. This codebase intentionally ships no fabricated metrics, testimonials, addresses, or claims — see "Content rules" at the end of this document.

---

## Sprint 1 — Critical Technical SEO (this PR)

**Goal:** Fix the technical foundation — metadata architecture, canonical URLs, duplicate H1, meta tag cleanup — without changing design, routes, or content scope.

Delivered:
- Reusable `src/components/SEO.jsx` (title, description, canonical, robots, OG, Twitter, structured data) built on the existing `react-helmet-async` dependency.
- `HelmetProvider` wired in `src/main.jsx`.
- `/` and `/upcoming-projects` each render their own `<SEO>` with unique title, description, and canonical URL.
- `index.html` no longer carries any route-specific static tags (title/description/canonical/OG/Twitter) — see "Technical finding" below for why.
- Removed `meta[name=keywords]`, `geo.region`, `geo.placename`, `ICBM` (no verified ranking value; kept geo data only in the already-verified `ProfessionalService` JSON-LD).
- Fixed duplicate `<h1>` (Hero + Offer both rendered an H1). Offer's heading is now `<h2>`. Added a visible descriptive subheading next to Hero's existing "THINK Creatively." H1.
- Fixed `/upcoming-projects` having zero H1s (promoted its main heading to `<h1>`).
- Fixed one inconsistent anchor (`Portfolio.jsx` bare `href="#contact-form"` → `Link to="/#contact-form"`).
- `sitemap.xml` `lastmod` corrected to reflect actual change date; `robots.txt` audited, no changes needed (already correct).

**Technical finding worth recording:** `react-helmet-async` only de-duplicates tags it itself has rendered in a previous commit — it does **not** remove or overwrite static tags already present in `index.html`. Keeping a "fallback" title/canonical in `index.html` alongside the `<SEO>` component therefore produces two `<title>` and two `<link rel="canonical">` tags in the final DOM, and on `/upcoming-projects` the leftover static tag was literally the *homepage's* canonical URL — a direct violation of "no duplicate/misleading canonical tags." This was caught via Playwright-rendered-DOM inspection, not by reading source code, which is why the task explicitly required verifying rendered HTML rather than JSX. Fix applied: `index.html` now contains no route-specific tags at all; `<SEO>` is the single source of truth for every route.

---

## Sprint 2 — JavaScript SEO and Schema

**Scope:** Prerendering decision + implementation (if approved), schema expansion.

### Prerendering recommendation (researched now, not implemented)

The brief requires evaluating Vite-compatible prerendering without migrating to Next.js. Three realistic options exist for this stack (React 19, Vite 8, React Router 7.9 in classic `<BrowserRouter>` mode, deployed on Vercel):

| | **A. Custom build-time prerender script** | **B. `vite-react-ssg`** | **C. React Router v7 Framework Mode** |
|---|---|---|---|
| **What it does** | After `vite build`, spin up the built app (e.g. via `vite preview` or a static file server), visit each known route with headless Chromium (Playwright, already a devDependency), and save the rendered DOM as that route's `dist/<route>/index.html`. | Third-party SSG tool. Pre-renders each route to static HTML at build time by running the app in Node during the build. | React Router's own Vite plugin with built-in SSG/prerendering, officially supported as of v7. |
| **SEO effectiveness** | High — crawlers get fully rendered HTML identical to what Playwright verified in this PR. | High — same end result. | High — same end result, plus can do true SSR later if ever needed. |
| **Build complexity** | Low-medium. ~80–120 lines of script, no change to `main.jsx`/`App.jsx`/routing. Vercel just serves the extra static files; `vercel.json`'s existing SPA rewrite still covers any route not prerendered. | Medium-high. Its own README (checked Oct 2026) now explicitly tells React Router v7 users to prefer option C instead. Requires converting the current `<BrowserRouter><Routes><Route>` declarative routing into a `RouteRecord[]` config array and replacing `main.jsx`'s render call with `ViteReactSSG(...)` — a real routing-layer rewrite, not an additive change. | High. Requires adopting React Router's "Framework Mode" — the `@react-router/dev` Vite plugin, a route-config file, and (per React Router's own docs) moving off the plain `vite build`/`vite preview` scripts to framework-mode equivalents. This is the kind of "major architectural change" the brief says needs separate approval. |
| **Vercel compatibility** | Excellent — output is still a static `dist/` folder, zero change to deployment model. | Good, but needs reconfiguring the Vercel build command/output since the build is driven by `vite-react-ssg build`, not `vite build`. | Good — Vercel has official React Router v7 framework support — but it changes the app from a static SPA deploy to a framework-managed deploy. |
| **Maintenance** | New routes must be added to the script's route list manually (same place the sitemap generator would list them — can share one source of truth in Sprint 2/3). | Routes are defined once in the `RouteRecord[]` config, so new routes are "free" once migrated — but the migration itself is the cost. | Same as B: free afterward, expensive to adopt. |
| **Performance impact** | None on runtime — output is static HTML, hydrates normally. Adds build time (one headless page load per route). | None on runtime. Adds build time. | None on runtime once adopted. |
| **React Router compatibility** | Full — no changes to how routing works today. | Requires replacing current routing style entirely. | Requires replacing current routing style entirely. |

**Recommendation:** **Option A (custom Playwright-based prerender script)** for this project, specifically because the site currently has only 2–7 real routes planned through Sprint 4 and uses plain declarative React Router — the cost of migrating routing architecture (B or C) is not justified yet. Playwright is already a devDependency (used for this PR's own verification), so no new dependency is introduced. Revisit option C later only if the route count and data-loading needs grow enough that React Router's own framework mode becomes worth the migration cost — that would be a separate, explicitly-approved architectural decision, consistent with the brief's instruction not to introduce major rendering-architecture changes without approval.

**Other Sprint 2 work (schema):**
- Audit/expand `ProfessionalService` schema (already present, already using only verified data).
- Add `Service` schema once Sprint 3 service pages exist with real content.
- Add `BreadcrumbList` schema once there is a real breadcrumb hierarchy (i.e. once service/case-study pages exist).
- Validate everything with Google's Rich Results Test before merging.

---

## Sprint 3 — Service Landing Pages

New routes (content to be supplied by SENOVA, not fabricated):
`/services/web-development`, `/services/ui-ux-design`, `/services/saas-development`, `/services/business-automation`, `/services/ecommerce-development`.

Each page: unique title/description/H1/canonical, real service explanation, real process, real tech stack, links to real case studies (Sprint 4), FAQs, contact CTA, `Service` + `BreadcrumbList` schema. Technical scaffolding (route, `<SEO>` usage, layout) can be built ahead of final copy using clearly-labeled placeholder content; nothing goes live with placeholder copy.

## Sprint 4 — Portfolio / Case Study SEO

New routes: `/case-studies/gleamstudio`, `/case-studies/mj-fitness-club`, `/case-studies/fitbitecafe`, `/case-studies/golden-crumb-bakery`.

Each page needs a verified problem/solution/outcome narrative and descriptive image filenames/alt text (e.g. `mj-fitness-club-website-design.webp`). **Existing claims in `Portfolio.jsx` ("60% management time saved," "200% increase in inquiries," "10,000+ active users," "Featured in local news") must be verified with real evidence before being reused as case-study content** — per the content rules below, nothing fabricated or unverified gets published as fact.

## Sprint 5 — Content, Blog, Local SEO

`/blog` architecture, editorial calendar grounded in real customer questions (not filler), stronger internal linking once Sprints 3–4 pages exist, Google Business Profile setup guidance, and location-relevant content for Raichur/Karnataka — all using only genuine business information.

## Sprint 6 — Performance, Core Web Vitals, Analytics

Lighthouse/PageSpeed audits (desktop + mobile), investigation of the pre-existing >500kB JS chunk warning (flagged during Sprint 1's build but explicitly out of scope there), image optimization pass, Google Search Console + GA4 setup, event tracking for contact form/WhatsApp/phone/email without duplicate events, and a privacy/consent check before adding any new tracking script.

---

## Content rules (apply to every sprint)

- No fabricated metrics, testimonials, reviews, ratings, awards, or addresses.
- Existing portfolio result claims are flagged for verification, not assumed true.
- SENOVA supplies real copy, screenshots, and verified facts; this codebase only supplies the technical scaffolding and placeholders until real content arrives.
- Each new page must serve a distinct search intent — no thin or near-duplicate pages, no city-name-swapped duplicate pages.
