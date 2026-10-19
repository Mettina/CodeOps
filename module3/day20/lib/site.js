// [EXERCISE 1 / MINI-PROJECT] One place for the production URL and brand values.
// Used by metadataBase (layout), sitemap.js, robots.js and the JSON-LD.
// Not a secret, so it is a plain server env var (NOT NEXT_PUBLIC_).
// Set SITE_URL in .env.local; falls back to the production URL from the slides.
export const SITE_URL = (process.env.SITE_URL || "https://addiseats.et").replace(/\/$/, "");
export const SITE_NAME = "Addis Eats";

// Open Graph fields every page repeats. A page that defines its own `openGraph`
// REPLACES the parent's object (it is not deep-merged), so each page spreads this.
export const OG_BASE = { siteName: SITE_NAME, locale: "en_ET", type: "website" };

// Turns "/img/doro wot.jpg" into "https://.../img/doro%20wot.jpg" (absolute + encoded).
export function absoluteUrl(path) {
  return new URL(encodeURI(path), SITE_URL).href;
}
