// Full-page screenshots + per-section spacing audit for a built dist/.
//
//   node scripts/capture-layout.mjs --dir <dist> --label <name> [--out docs/screenshots]
//
// For every route, at desktop (1280x900) and mobile (390x844):
//   - scrolls the page top to bottom so scroll-triggered (whileInView)
//     content is revealed, then takes a full-page screenshot;
//   - records each top-level <section>/<footer>: its height, its computed
//     padding, the Tailwind padding/margin classes it declares, and the
//     empty space between it and the next block;
//   - checks for horizontal overflow and for any element wider than the
//     viewport.
// Writes <label>-<viewport>-<route>.png and <label>-layout.json.
// External requests are blocked (fonts fall back to system fonts), so
// "before" and "after" captures are pixel-comparable.

import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const dir = resolve(opt("dir", "dist"));
const label = opt("label");
const outDir = resolve(opt("out", "docs/screenshots"));
const routes = (opt("routes", "/,/upcoming-projects")).split(",");
if (!label) { console.error("usage: --dir <dist> --label <name> [--out dir] [--routes /,/x]"); process.exit(1); }

const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".json": "application/json", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };
const isFile = (p) => existsSync(p) && statSync(p).isFile();
const server = createServer((req, res) => {
  const safe = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\]\.\.)+/, "");
  const file = [join(dir, safe), join(dir, safe, "index.html")].find(isFile) ||
    (isFile(join(dir, "spa-fallback.html")) ? join(dir, "spa-fallback.html") : join(dir, "index.html"));
  res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const report = {};

for (const [vp, size] of [["desktop", { width: 1280, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
  const context = await browser.newContext({ viewport: size, deviceScaleFactor: 1, reducedMotion: "no-preference" });
  await context.route("**/*", (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
  const page = await context.newPage();
  for (const route of routes) {
    await page.goto(origin + route);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(600);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y <= height; y += 400) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(110);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);

    const layout = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const blocks = [...document.querySelectorAll("main > section, main > * > section, main > section ~ section, footer")]
        .filter((el, i, arr) => arr.indexOf(el) === i && !el.parentElement.closest("section"));
      const rows = blocks.map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const heading = el.querySelector("h1,h2")?.textContent.replace(/\s+/g, " ").trim().slice(0, 40) || el.id || el.tagName.toLowerCase();
        const spacingClasses = (el.getAttribute("class") || "").split(/\s+/).filter((c) => /^([a-z0-9]+:)?(p|py|pt|pb|m|my|mt|mb)-/.test(c));
        return { heading, id: el.id || null, top: Math.round(r.top + window.scrollY), height: Math.round(r.height),
          paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, marginTop: cs.marginTop, marginBottom: cs.marginBottom, spacingClasses };
      });
      rows.forEach((row, i) => { row.gapToNext = i < rows.length - 1 ? rows[i + 1].top - (row.top + row.height) : null; });
      const wide = [...document.querySelectorAll("body *")].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.right > vw + 1 || r.left < -1) && getComputedStyle(el).position !== "fixed" && !el.closest("[class*='overflow-hidden']");
      }).slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
      return { docHeight: document.documentElement.scrollHeight, horizontalScroll: document.documentElement.scrollWidth > vw, overflowingElements: wide, blocks: rows };
    });

    const name = `${label}-${vp}-${route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_")}`;
    await page.screenshot({ path: join(outDir, `${name}.png`), fullPage: true });
    report[`${vp} ${route}`] = layout;
    console.log(`${name}: height=${layout.docHeight}px horizontalScroll=${layout.horizontalScroll} overflowing=${layout.overflowingElements.length}`);
  }
  await context.close();
}
await browser.close();
server.close();
writeFileSync(join(outDir, `${label}-layout.json`), JSON.stringify(report, null, 2));
console.log(`wrote ${join(outDir, label)}-*.png and ${label}-layout.json`);
