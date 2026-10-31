import { Helmet } from "react-helmet-async";

const SITE_NAME = "SENOVA Digital Labs";
const DEFAULT_OG_IMAGE =
  "https://www.senovadigital.xyz/android-chrome-512x512.png";

/**
 * Reusable per-route SEO component.
 *
 * Every public route must pass its own explicit `title`, `description` and
 * `canonicalUrl` — this component never derives them via string
 * concatenation or fallbacks to avoid duplicate/misleading metadata across
 * routes. Open Graph and Twitter fields fall back to sensible per-page
 * values (title/description/canonical) only when not explicitly provided,
 * never to a different page's content.
 *
 * `structuredData` accepts one JSON-LD object or an array of JSON-LD
 * objects to render as <script type="application/ld+json"> tags.
 */
const SEO = ({
  title,
  description,
  canonicalUrl,
  robots = "index, follow",
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogUrl,
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
}) => {
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgUrl = ogUrl || canonicalUrl;
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription;
  const resolvedTwitterImage = twitterImage || ogImage;

  const schemaList = Array.isArray(structuredData)
    ? structuredData
    : structuredData
      ? [structuredData]
      : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      {resolvedOgUrl && <meta property="og:url" content={resolvedOgUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
      {resolvedTwitterImage && (
        <meta name="twitter:image" content={resolvedTwitterImage} />
      )}

      {/* Structured data (JSON-LD) */}
      {schemaList.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
