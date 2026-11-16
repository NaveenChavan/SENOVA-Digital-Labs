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
        window.scrollBy(0, step);
        total += step;
        if (total >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });
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
    console.error("dist/index.html not found — run `vite build` first.");
    process.exit(1);
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
      await page.goto(`${baseUrl}${route}`, {
        waitUntil: "networkidle0",
        timeout: 60000,
      });
      await revealInViewContent(page);
      // Let react-helmet-async and the final re-render settle.
      await new Promise((resolve) => setTimeout(resolve, 400));

      const html = await page.content();
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

run().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
