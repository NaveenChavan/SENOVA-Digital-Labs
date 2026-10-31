// Build-time prerender. Runs after `vite build` (client bundle in dist/)
// and `vite build --ssr` (server bundle in dist-ssr/).
//
// For each route below it renders the React app to HTML in Node and writes
// dist/<route>/index.html. Crawlers and link-preview scrapers that do not
// run JavaScript then receive the page's real <title>, meta description,
// canonical, Open Graph tags, JSON-LD, <h1> and body content. In the
// browser, src/main.jsx hydrates that markup (reuses it) instead of
// rendering the page again.
//
// No browser is needed, so this runs on Vercel's standard build image.
//
// The build FAILS if any page does not have exactly 1 <title>, 1 <h1>,
// 1 meta description and 1 canonical (with the expected URL), or if the
// rendered body is suspiciously small.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SITE_URL = "https://www.senovadigital.xyz";

// Every route in src/AppShell.jsx. Adding a route there means adding it
// here (and to public/sitemap.xml).
const ROUTES = ["/", "/upcoming-projects"];

const root = fileURLToPath(new URL("..", import.meta.url));
const distDir = join(root, "dist");
const { render } = await import(
  pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href
);
const template = readFileSync(join(distDir, "index.html"), "utf8");

if (!template.includes('<div id="root"></div>')) {
  throw new Error(
    'prerender: dist/index.html has no empty <div id="root"></div>. ' +
      "It is either malformed or already prerendered; run `vite build` first.",
  );
}

// Unknown URLs are rewritten to this untouched shell (vercel.json), so they
// never receive another page's prerendered content or canonical.
writeFileSync(join(distDir, "spa-fallback.html"), template);

// React 19 hoists <title>/<meta>/<link> to the start of the rendered output
// (before the app's root <div>). Those belong in <head>; everything from the
// root <div> on is the app markup that goes inside #root.
//
// JSON-LD <script> tags stay where React rendered them, inside the app
// markup. Moving them would make the DOM differ from what React expects
// during hydration.
const splitHeadAndBody = (rendered) => {
  const firstElement = rendered.indexOf("<div");
  if (firstElement === -1) throw new Error("prerender: no app markup rendered");
  return {
    head: rendered.slice(0, firstElement),
    body: rendered.slice(firstElement),
  };
};

const count = (haystack, regex) => (haystack.match(regex) || []).length;
const attr = (haystack, regex) => (haystack.match(regex) || [])[1];
const canonicalFor = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);
const outputPathFor = (path) =>
  path === "/" ? join(distDir, "index.html") : join(distDir, path.slice(1), "index.html");

const failures = [];
for (const path of ROUTES) {
  const { head, body } = splitHeadAndBody(render(path));
  const page = template
    .replace("</head>", `${head}</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  const problems = [];
  if (count(page, /<title[\s>]/g) !== 1) problems.push("expected exactly 1 <title>");
  if (count(page, /<h1[\s>]/g) !== 1) problems.push("expected exactly 1 <h1>");
  if (count(page, /<meta[^>]+name="description"/g) !== 1)
    problems.push("expected exactly 1 meta description");
  if (count(page, /<link[^>]+rel="canonical"/g) !== 1)
    problems.push("expected exactly 1 canonical");
  const canonical = attr(page, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/);
  if (canonical !== canonicalFor(path))
    problems.push(`canonical is ${canonical}, expected ${canonicalFor(path)}`);
  if (body.length < 500) problems.push("body content suspiciously small");

  if (problems.length > 0) {
    failures.push(`${path}: ${problems.join("; ")}`);
    continue;
  }

  const outFile = outputPathFor(path);
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, page);
  console.log(`prerender: ${path.padEnd(20)} ${(page.length / 1024).toFixed(1)} kB`);
}

if (failures.length > 0) {
  console.error("\nprerender FAILED:\n  " + failures.join("\n  "));
  process.exit(1);
}
console.log(`prerender: ${ROUTES.length} page(s) written`);
