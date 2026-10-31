import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AppShell from "./AppShell";

/**
 * Build-time render of one route, used only by scripts/prerender.mjs.
 *
 * The tree must match src/main.jsx exactly (StrictMode > HelmetProvider >
 * router > AppShell) so the browser can hydrate the prerendered markup
 * instead of re-rendering it.
 */
export function render(url) {
  return renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <AppShell />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );
}
