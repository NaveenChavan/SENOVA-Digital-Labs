import { useEffect } from "react";

// react-helmet-async (last released for React 18) duplicates <title>/<meta>
// tags under React 19 instead of replacing them in place. This hook does the
// same job — per-route title, description, canonical, OG tags, and JSON-LD —
// with plain DOM upserts, so each tag is created once and updated in place.

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * @param {Object} opts
 * @param {string} [opts.title]
 * @param {string} [opts.description]
 * @param {string} [opts.canonical]
 * @param {string} [opts.ogTitle]
 * @param {string} [opts.ogDescription]
 * @param {string} [opts.ogUrl]
 * @param {{id: string, data: object} | {id: string, data: object}[]} [opts.jsonLd]
 */
export default function useSeoMeta({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  jsonLd,
} = {}) {
  useEffect(() => {
    if (title) document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", canonical);
    upsertMeta("property", "og:title", ogTitle);
    upsertMeta("property", "og:description", ogDescription);
    upsertMeta("property", "og:url", ogUrl);

    const entries = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    entries.forEach(({ id, data }) => upsertJsonLd(id, data));

    return () => {
      entries.forEach(({ id }) => {
        document.getElementById(id)?.remove();
      });
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogUrl, jsonLd]);
}
