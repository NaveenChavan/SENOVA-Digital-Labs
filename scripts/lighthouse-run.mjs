// Repeatable Lighthouse runner for a built `dist/` folder or a live URL.
//
//   node scripts/lighthouse-run.mjs --label <name> (--dir <dist> | --url <https://...>)
//        [--path /] [--runs 5] [--form mobile|desktop] [--block <url-pattern>]... [--out docs/lighthouse]
//
// Local mode serves --dir with brotli compression and long-lived cache
// headers on hashed assets (like Vercel's CDN), so results are not skewed
// by missing compression. Each run uses a fresh Chromium. The run closest
// to the median performance score is saved as <label>.html / <label>.json.
//
// Requires Lighthouse installed outside the repo (it is not a project
// dependency):   npm install --prefix %TEMP%\lh lighthouse@12
// and a Chromium:  set CHROMIUM_PATH (Playwright's expected build may be missing).

import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { brotliCompressSync, constants } from "node:zlib";
import { extname, join, normalize, resolve } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const all = (name) => args.flatMap((a, i) => (a === `--${name}` ? [args[i + 1]] : []));

const label = opt("label");
const dir = opt("dir");
const liveUrl = opt("url");
const path = opt("path", "/");
const runs = Number(opt("runs", "5"));
const form = opt("form", "mobile");
const blocked = all("block");
const outDir = resolve(opt("out", "docs/lighthouse"));
if (!label || (!dir && !liveUrl)) {
  console.error("usage: --label <name> (--dir <dist> | --url <url>) [--path /] [--runs 5] [--form mobile|desktop] [--block pattern] [--out dir]");
  process.exit(1);
}

const lhEntry = join(process.env.LIGHTHOUSE_DIR || join(process.env.TEMP || tmpdir(), "lh"), "node_modules", "lighthouse", "core", "index.js");
const { default: lighthouse } = await import(pathToFileURL(lhEntry).href);

let server;
let base = liveUrl;
if (dir) {
  const root = resolve(dir);
  const mime = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json", ".ico": "image/x-icon", ".webmanifest": "application/manifest+json" };
  const compressible = new Set([".html", ".js", ".css", ".svg", ".xml", ".txt", ".json", ".webmanifest"]);
  const cache = new Map();
  const isFile = (p) => existsSync(p) && statSync(p).isFile();
  server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const safe = normalize(urlPath).replace(/^([/\\]\.\.)+/, "");
    // Same resolution order as vercel.json: file, directory index, SPA fallback.
    const file =
      [join(root, safe), join(root, safe, "index.html")].find(isFile) ||
      (isFile(join(root, "spa-fallback.html")) ? join(root, "spa-fallback.html") : join(root, "index.html"));
    const ext = extname(file);
    const headers = { "Content-Type": mime[ext] || "application/octet-stream" };
    headers["Cache-Control"] = /\/assets\/.+-[A-Za-z0-9_-]{8}\./.test(urlPath) ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate";
    let body = readFileSync(file);
    if (compressible.has(ext) && /\bbr\b/.test(req.headers["accept-encoding"] || "")) {
      if (!cache.has(file)) cache.set(file, brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } }));
      body = cache.get(file);
      headers["Content-Encoding"] = "br";
    }
    res.writeHead(200, headers);
    res.end(body);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  base = `http://127.0.0.1:${server.address().port}`;
}
const target = base + path;

const desktopConfig = {
  extends: "lighthouse:default",
  settings: {
    formFactor: "desktop",
    screenEmulation: { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false },
    throttling: { rttMs: 40, throughputKbps: 10240, cpuSlowdownMultiplier: 1, requestLatencyMs: 0, downloadThroughputKbps: 0, uploadThroughputKbps: 0 },
    emulatedUserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36",
  },
};

const results = [];
for (let i = 0; i < runs; i++) {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--remote-debugging-port=9444"] });
  try {
    const flags = { port: 9444, output: ["json", "html"], logLevel: "error", onlyCategories: ["performance", "seo", "accessibility", "best-practices"], blockedUrlPatterns: blocked.length ? blocked : undefined };
    const r = await lighthouse(target, flags, form === "desktop" ? desktopConfig : undefined);
    const lhr = r.lhr;
    results.push({ lhr, json: r.report[0], html: r.report[1] });
    const a = lhr.audits;
    console.log(`  run ${i + 1}/${runs}: perf=${Math.round(lhr.categories.performance.score * 100)} FCP=${(a["first-contentful-paint"].numericValue / 1000).toFixed(2)}s LCP=${(a["largest-contentful-paint"].numericValue / 1000).toFixed(2)}s TBT=${Math.round(a["total-blocking-time"].numericValue)}ms CLS=${a["cumulative-layout-shift"].numericValue.toFixed(3)} SI=${(a["speed-index"].numericValue / 1000).toFixed(2)}s TTI=${(a["interactive"].numericValue / 1000).toFixed(2)}s`);
  } catch (e) {
    console.log(`  run ${i + 1}/${runs} FAILED: ${String(e.message).slice(0, 200)}`);
  }
  await browser.close();
}
if (server) await new Promise((r) => server.close(r));
if (results.length === 0) process.exit(1);

const median = (xs) => xs.slice().sort((a, b) => a - b)[Math.floor((xs.length - 1) / 2)];
const pick = (fn) => results.map((r) => fn(r.lhr));
const perf = pick((l) => Math.round(l.categories.performance.score * 100));
const summary = {
  label, target, form, runs: results.length, blocked,
  performance: { median: median(perf), min: Math.min(...perf), max: Math.max(...perf) },
  seo: median(pick((l) => Math.round(l.categories.seo.score * 100))),
  accessibility: median(pick((l) => Math.round(l.categories.accessibility.score * 100))),
  bestPractices: median(pick((l) => Math.round(l.categories["best-practices"].score * 100))),
  FCP_s: +(median(pick((l) => l.audits["first-contentful-paint"].numericValue)) / 1000).toFixed(2),
  LCP_s: +(median(pick((l) => l.audits["largest-contentful-paint"].numericValue)) / 1000).toFixed(2),
  TBT_ms: Math.round(median(pick((l) => l.audits["total-blocking-time"].numericValue))),
  CLS: +median(pick((l) => l.audits["cumulative-layout-shift"].numericValue)).toFixed(3),
  SI_s: +(median(pick((l) => l.audits["speed-index"].numericValue)) / 1000).toFixed(2),
  TTI_s: +(median(pick((l) => l.audits["interactive"].numericValue)) / 1000).toFixed(2),
};
console.log("MEDIAN " + JSON.stringify(summary));

// Save the run closest to the median performance score.
const best = results.reduce((a, b) => (Math.abs(Math.round(b.lhr.categories.performance.score * 100) - summary.performance.median) < Math.abs(Math.round(a.lhr.categories.performance.score * 100) - summary.performance.median) ? b : a));
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, `${label}.html`), best.html);
writeFileSync(join(outDir, `${label}.json`), best.json);
writeFileSync(join(outDir, `${label}.summary.json`), JSON.stringify({ ...summary, allRuns: perf }, null, 2));
console.log(`saved ${join(outDir, label)}.{html,json,summary.json}`);
