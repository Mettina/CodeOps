// [EXERCISE 1 / MINI-PROJECT] One place for the production URL and brand values.
// Used by metadataBase (layout), sitemap.js, robots.js and the JSON-LD.
// Not a secret, so it is a plain server env var (NOT NEXT_PUBLIC_).
// Set SITE_URL in .env.local; falls back to the production URL from the slides.
// [DAY 48 · EXERCISE 5] Per environment, never hard-coded:
//   SITE_URL set (local .env.local, or a Vercel variable)  -> use it
//   on Vercel production -> the project's production domain (Vercel supplies it)
//   on a Vercel preview  -> that preview's own URL, so og:image and the sitemap point at it
//   anywhere else (your laptop) -> http://localhost:3000
function resolveSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  const host =
    process.env.VERCEL_ENV === "production"
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.VERCEL_URL;
  return host ? `https://${host}` : "http://localhost:3000";
}
export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");
export const SITE_NAME = "Addis Eats";

// Open Graph fields every page repeats. A page that defines its own `openGraph`
// REPLACES the parent's object (it is not deep-merged), so each page spreads this.
export const OG_BASE = { siteName: SITE_NAME, locale: "en_ET", type: "website" };

// Turns "/img/doro wot.jpg" into "https://.../img/doro%20wot.jpg" (absolute + encoded).
export function absoluteUrl(path) {
  return new URL(encodeURI(path), SITE_URL).href;
}
