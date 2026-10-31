// Post-build SEO and hydration verification for the prerendered site.
//
//   npm run build && npm run verify:seo
//
// Serves dist/ exactly the way vercel.json does on Vercel (a real file wins,
// then <dir>/index.html, otherwise the rewrite to /spa-fallback.html, all
// with HTTP 200), then checks each route in Chromium via Playwright:
//
//   1. JavaScript DISABLED: what a non-rendering crawler or link-preview
//      scraper receives. Title, description, canonical, robots, og:title,
//      og:url, JSON-LD, the <h1> text and key body text must be present and
//      correct in the raw HTML.
//   2. JavaScript ENABLED: the page must HYDRATE (reuse the prerendered DOM)
//      with zero hydration errors, then still have exactly one of each tag.
//
// Plus: trailing-slash URL, an unknown URL (must get the empty shell, not
// another page's canonical), client-side navigation and sitemap contents.
// External hosts (fonts, OneSignal, Firebase, ...) are blocked so results
// are deterministic and no third-party traffic is generated.
//
// Set CHROMIUM_PATH if Playwright's expected browser build isn't installed.
// Exit code 1 if any check fails.

import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const SITE_URL = "https://www.senovadigital.xyz";
const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");

// What each route must contain in its RAW HTML (before any JavaScript).
const EXPECT = {
  "/": {
    title: "SENOVA Digital Labs | Web Development & SaaS Company in Raichur",
    canonical: `${SITE_URL}/`,
    h1: "THINKCreatively.",
    jsonLd: ["ProfessionalService", "Organization", "WebSite"],
    bodyText: ["Custom Website Development, SaaS Solutions", "Latest Projects", "GleamStudio", "Start Your Digital Journey"],
  },
  "/upcoming-projects": {
    title: "Upcoming Projects | SENOVA Digital Labs",
    canonical: `${SITE_URL}/upcoming-projects`,
    h1: "UpcomingProjects",
    jsonLd: ["ProfessionalService"],
    bodyText: ["In-house products we're building right now", "Want early access when these launch?"],
  },
};

// ---- static server with Vercel semantics --------------------------------
const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };
const isFile = (p) => existsSync(p) && statSync(p).isFile();
const server = createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const safe = normalize(urlPath).replace(/^([/\\]\.\.)+/, "");
  const file =
    [join(distDir, safe), join(distDir, safe, "index.html")].find(isFile) ||
    join(distDir, "spa-fallback.html");
  res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const results = [];
const check = (scope, name, ok, detail = "") => results.push({ scope, name, ok: Boolean(ok), detail });

const newPage = async (javaScriptEnabled) => {
  const context = await browser.newContext({ javaScriptEnabled });
  await context.route("**/*", (route) =>
    route.request().url().startsWith(origin) ? route.continue() : route.abort(),
  );
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/ERR_FAILED|net::/.test(m.text())) errors.push(m.text()); });
  return { context, page, errors };
};

const snapshot = (page) =>
  page.evaluate(() => {
    const all = (s) => [...document.querySelectorAll(s)];
    const attr = (s, a) => document.querySelector(s)?.getAttribute(a) ?? null;
    const ld = all('script[type="application/ld+json"]').map((s) => {
      try { return JSON.parse(s.textContent)["@type"]; } catch { return "INVALID"; }
    });
    return {
      titles: all("title").length, title: document.title,
      descriptions: all('meta[name="description"]').length, description: attr('meta[name="description"]', "content"),
      canonicals: all('link[rel="canonical"]').length, canonical: attr('link[rel="canonical"]', "href"),
      robots: attr('meta[name="robots"]', "content"),
      ogTitles: all('meta[property="og:title"]').length, ogUrl: attr('meta[property="og:url"]', "content"),
      h1s: all("h1").length, h1: document.querySelector("h1")?.textContent.replace(/\s+/g, "") ?? "",
      ld, text: document.body.textContent.replace(/\s+/g, " "),
      rootFilled: document.getElementById("root")?.children.length > 0,
    };
  });

for (const [path, want] of Object.entries(EXPECT)) {
  // ---- 1. raw HTML, no JavaScript ---------------------------------------
  {
    const { context, page } = await newPage(false);
    const response = await page.goto(origin + path);
    const s = await snapshot(page);
    const sc = `${path} raw`;
    check(sc, "HTTP 200", response.status() === 200, response.status());
    check(sc, "exactly 1 <title>, correct text", s.titles === 1 && s.title === want.title, `${s.titles} "${s.title}"`);
    check(sc, "exactly 1 meta description, non-empty", s.descriptions === 1 && (s.description || "").length > 50, `${s.descriptions} "${s.description}"`);
    check(sc, "exactly 1 canonical, correct URL", s.canonicals === 1 && s.canonical === want.canonical, `${s.canonicals} ${s.canonical}`);
    check(sc, "robots index, follow", s.robots === "index, follow", s.robots);
    check(sc, "og:title present, og:url = canonical", s.ogTitles === 1 && s.ogUrl === want.canonical, `${s.ogTitles} ${s.ogUrl}`);
    check(sc, "exactly 1 <h1>, correct text", s.h1s === 1 && s.h1 === want.h1, `${s.h1s} "${s.h1}"`);
    check(sc, "JSON-LD types present and valid", !s.ld.includes("INVALID") && want.jsonLd.every((t) => s.ld.includes(t)) && s.ld.length === want.jsonLd.length, s.ld.join(","));
    check(sc, "key page content present", want.bodyText.every((t) => s.text.includes(t)), want.bodyText.filter((t) => !s.text.includes(t)).join(" | "));
    await context.close();
  }

  // ---- 2. with JavaScript: hydration, then tag counts --------------------
  {
    const { context, page, errors } = await newPage(true);
    // Tag the prerendered H1 before React runs: if React adopts the DOM
    // (hydration) the same node survives; if it re-renders, it's replaced.
    await page.addInitScript(() => {
      document.addEventListener("DOMContentLoaded", () => {
        const h1 = document.querySelector("#root h1");
        if (h1) window.__prerenderedH1 = h1;
      });
    });
    await page.goto(origin + path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(600);
    const s = await snapshot(page);
    const hydrated = await page.evaluate(() => Boolean(window.__prerenderedH1 && window.__prerenderedH1.isConnected && window.__prerenderedH1 === document.querySelector("h1")));
    const sc = `${path} JS`;
    check(sc, "hydrated: prerendered DOM reused, not replaced", hydrated);
    check(sc, "no hydration or page errors", errors.length === 0, errors.join(" | ").slice(0, 400));
    check(sc, "exactly 1 <title>, correct text", s.titles === 1 && s.title === want.title, `${s.titles} "${s.title}"`);
    check(sc, "exactly 1 meta description", s.descriptions === 1, s.descriptions);
    check(sc, "exactly 1 canonical, correct URL", s.canonicals === 1 && s.canonical === want.canonical, `${s.canonicals} ${s.canonical}`);
    check(sc, "exactly 1 og:title", s.ogTitles === 1, s.ogTitles);
    check(sc, "exactly 1 <h1>", s.h1s === 1, s.h1s);
    check(sc, "JSON-LD not duplicated", s.ld.length === want.jsonLd.length, s.ld.join(","));
    await context.close();
  }
}

// ---- 3. trailing slash serves the same page --------------------------------
{
  const { context, page } = await newPage(false);
  const r = await page.goto(origin + "/upcoming-projects/");
  const s = await snapshot(page);
  check("/upcoming-projects/ raw", "200 with the page's own title and canonical", r.status() === 200 && s.title === EXPECT["/upcoming-projects"].title && s.canonical === EXPECT["/upcoming-projects"].canonical, `${r.status()} ${s.canonical}`);
  await context.close();
}

// ---- 4. unknown URL: empty shell, never another page's canonical ----------
{
  const { context, page } = await newPage(false);
  const r = await page.goto(origin + "/definitely-not-a-page");
  const s = await snapshot(page);
  check("unknown URL raw", "200 shell with no canonical and no prerendered content", r.status() === 200 && s.canonicals === 0 && !s.rootFilled, `${r.status()} canonicals=${s.canonicals} rootFilled=${s.rootFilled}`);
  await context.close();
}

// ---- 5. client-side navigation updates the head --------------------------
{
  const { context, page, errors } = await newPage(true);
  await page.goto(origin + "/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("link", { name: /what's next/i }).click();
  await page.waitForURL("**/upcoming-projects");
  await page.waitForTimeout(500);
  const s = await snapshot(page);
  check("nav / -> /upcoming-projects", "1 title and 1 canonical, both updated", s.titles === 1 && s.title === EXPECT["/upcoming-projects"].title && s.canonicals === 1 && s.canonical === EXPECT["/upcoming-projects"].canonical, `${s.title} ${s.canonical}`);
  check("nav / -> /upcoming-projects", "1 h1, no errors", s.h1s === 1 && errors.length === 0, errors.join(" | "));
  await context.close();
}

// ---- 6. images that load before hydration must still become visible -----
// Prerendered <img> tags can finish loading before React attaches onLoad.
// Delay all JavaScript so every image wins that race, then require that no
// loaded image is left at opacity 0 (the fade-in placeholders' failure mode).
{
  const slowServer = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const safe = normalize(urlPath).replace(/^([/\\]\.\.)+/, "");
    const file = [join(distDir, safe), join(distDir, safe, "index.html")].find(isFile) || join(distDir, "spa-fallback.html");
    const send = () => { res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" }); res.end(readFileSync(file)); };
    extname(file) === ".js" ? setTimeout(send, 2000) : send();
  });
  await new Promise((r) => slowServer.listen(0, "127.0.0.1", r));
  const slowOrigin = `http://127.0.0.1:${slowServer.address().port}`;
  for (const path of Object.keys(EXPECT)) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    await context.route("**/*", (r) => (r.request().url().startsWith(slowOrigin) ? r.continue() : r.abort()));
    const page = await context.newPage();
    await page.goto(slowOrigin + path);
    await page.waitForLoadState("networkidle");
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 400) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(100); }
    await page.waitForTimeout(1200);
    const stuck = await page.evaluate(() => [...document.querySelectorAll("#root img")]
      .filter((i) => i.complete && i.naturalWidth > 0 && i.getAttribute("aria-hidden") !== "true" && getComputedStyle(i).opacity === "0")
      .map((i) => i.getAttribute("src")));
    check(`${path} slow JS`, "no loaded image stuck invisible after hydration", stuck.length === 0, stuck.join(", "));
    await context.close();
  }
  await new Promise((r) => slowServer.close(r));
}

// ---- 7. sitemap lists exactly the prerendered routes ---------------------
{
  const xml = readFileSync(join(distDir, "sitemap.xml"), "utf8");
  const listed = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]).sort();
  const expected = Object.values(EXPECT).map((e) => e.canonical).sort();
  check("sitemap", "lists exactly the prerendered routes", JSON.stringify(listed) === JSON.stringify(expected), listed.join(", "));
}

await browser.close();
await new Promise((r) => server.close(r));

for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  [${r.scope}] ${r.name}${r.ok ? "" : `  -> ${r.detail}`}`);
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
