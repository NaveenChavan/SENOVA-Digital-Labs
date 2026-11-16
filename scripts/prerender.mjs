// Post-build static prerendering for SEO.
//
// This app is a client-rendered React SPA (Vite + react-router-dom). Google
// can execute JS and index it fine, but Bing, link-preview bots, and some
// crawlers either skip JS entirely or do it poorly. This script runs after
// `vite build`, boots a tiny static server over `dist/`, drives a headless
// Chrome through every real route, waits for in-view (framer-motion) content
// and react-helmet-async tags to settle, then writes the fully rendered HTML
// back to disk as that route's static file.
//
// The client bundle (<script type="module" src="/assets/...">) stays in the
// output, so once a real browser loads the page, React mounts normally and
// takes over — this only changes what crawlers and the very first paint see.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "..", "dist");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webmanifest": "application/manifest+json",
};

// Every real route the app serves. Add new routes here when new pages ship
// (and add a matching explicit rewrite in vercel.json so the static file
// wins over the SPA catch-all).
const ROUTES = [
  { route: "/", out: "index.html" },
  { route: "/upcoming-projects", out: "upcoming-projects/index.html" },
];

function createRequestHandler(originalShellHtml) {
  return function serveStatic(req, res) {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(distDir, urlPath);

    // Any real static asset (JS/CSS/images/etc.) is served as-is.
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        const ext = path.extname(filePath);
        res.writeHead(200, {
          "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
        });
        res.end(data);
      });
      return;
    }

    // Any route/document request (e.g. "/", "/upcoming-projects") gets the
    // original, untouched build shell — never a previously prerendered file
    // that this same run may have already written to disk for another
    // route. Otherwise route N+1 would inherit route N's baked-in meta tags
    // and JSON-LD as its starting document.
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(originalShellHtml);
  };
}

// Scrolls the full page height so framer-motion's `whileInView` sections
// mount and settle into their final (visible) state before we snapshot.
async function revealInViewContent(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      const step = 400;
      let total = 0;
      const timer = setInterval(() => {
        window.scrollBy({ top: step, behavior: "instant" });
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo({ top: 0, behavior: "instant" });
          resolve();
        }
      }, 100);
    });
  });
}

// Inline the (small) stylesheet so first paint doesn't wait on a CSS request,
// and preload the primary font so text doesn't visibly swap late.
function optimizeHead(html) {
  const assets = path.join(distDir, "assets");
  const latinFont = fs
    .readdirSync(assets)
    .find((f) => /^inter-latin-wght-normal-.*\.woff2$/.test(f));
  html = html.replace(
    /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/,
    (tag, href) => {
      const file = path.join(distDir, href);
      if (!fs.existsSync(file)) return tag;
      return `<style>${fs.readFileSync(file, "utf-8")}</style>`;
    },
  );
  if (latinFont) {
    html = html.replace(
      "</head>",
      `<link rel="preload" as="font" type="font/woff2" crossorigin href="/assets/${latinFont}"></head>`,
    );
  }
  return html;
}

async function startServer(originalShellHtml) {
  const server = http.createServer(createRequestHandler(originalShellHtml));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return { server, baseUrl: `http://127.0.0.1:${port}` };
}

async function run() {
  const shellPath = path.join(distDir, "index.html");
  if (!fs.existsSync(shellPath)) {
    throw new Error("dist/index.html not found, run `vite build` first.");
  }
  // Snapshot the pristine build output once, before any route's prerendered
  // HTML gets written back into dist/ and could otherwise leak into later
  // routes as their fallback shell.
  const originalShellHtml = fs.readFileSync(shellPath, "utf-8");

  const { server, baseUrl } = await startServer(originalShellHtml);
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    for (const { route, out } of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      // Lets components skip browser-only effects so the snapshot equals the
      // first client render (required for hydrateRoot to reuse the DOM).
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true;
      });
      // Third-party scripts must not run (or inject DOM) during the snapshot.
      // They still load normally for real visitors from the original tags.
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        const host = new URL(request.url()).hostname;
        if (host === "cdn.onesignal.com" || host.endsWith("onesignal.com")) {
          request.abort();
        } else {
          request.continue();
        }
      });
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });
      await page.evaluate(() => document.fonts.ready);
      await revealInViewContent(page);
      // Wait until the page is really back at the top and the navbar's scroll
      // state has reset, otherwise the snapshot bakes in its "scrolled" style.
      await page.waitForFunction(() => window.scrollY === 0);
      // Let react-helmet-async and the final re-render settle.
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Mark the snapshot so the CSS entrance animation doesn't replay when
      // React mounts over it (which would flash the hero on every load).
      // React renders `© {year} Name` as three adjacent text nodes, but HTML
      // serialization merges them into one, which breaks hydration (React
      // error #418). React's own server renderer separates such nodes with
      // `<!-- -->`; do the same here before serializing.
      await page.evaluate(() => {
        const walker = document.createTreeWalker(document.getElementById("root"), NodeFilter.SHOW_TEXT);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        for (const node of nodes) {
          const next = node.nextSibling;
          if (next && next.nodeType === Node.TEXT_NODE) {
            node.parentNode.insertBefore(document.createComment(" "), next);
          }
        }
      });

      // Scroll-reveal sections are un-revealed again so the snapshot matches
      // the client's first render. A <noscript> rule in index.html keeps them
      // visible without JavaScript, and crawlers read the text either way.
      let html = (await page.content())
        .replace(/(class="[^"]*?)\s*\bis-visible\b/g, "$1")
        .replace(
        /<html([^>]*)>/,
        (m, attrs) =>
          attrs.includes("data-prerendered") ? m : `<html${attrs} data-prerendered>`,
      );
      // `js-reveal` is added by main.jsx while the page runs in Chrome here; it
      // must not be baked in, or sections would be hidden before JS loads.
      html = html.replace(
        /<html([^>]*?)\s*class="([^"]*)"/,
        (m, before, classes) => {
          const kept = classes.split(/\s+/).filter((c) => c && c !== "js-reveal");
          return kept.length ? `<html${before} class="${kept.join(" ")}"` : `<html${before}`;
        },
      );
      html = optimizeHead(html);
      const outPath = path.join(distDir, out);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html);
      console.log(`Prerendered ${route} -> dist/${out}`);
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

// Keep sitemap <lastmod> equal to the build date so it never goes stale.
function refreshSitemap() {
  const sitemapPath = path.join(distDir, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) return;
  const today = new Date().toISOString().slice(0, 10);
  const xml = fs
    .readFileSync(sitemapPath, "utf-8")
    .replace(/<lastmod>[^<]*<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Sitemap lastmod -> ${today}`);
}

// If prerendering can't run (e.g. the build host has no Chrome), the site must
// still deploy. Fall back to the plain client-rendered build and make sure every
// route file that vercel.json rewrites to exists.
function fallbackToSpa(err) {
  console.warn("Prerender skipped, deploying client-rendered build:", err?.message || err);
  const shell = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
  for (const { out } of ROUTES) {
    const outPath = path.join(distDir, out);
    if (!fs.existsSync(outPath)) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, shell);
    }
  }
}

run()
  .catch(fallbackToSpa)
  .finally(() => {
    refreshSitemap();
    // The local static server may still hold the event loop open if Chrome
    // failed to launch; always exit so the build never hangs.
    process.exit(0);
  });
