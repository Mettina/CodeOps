// Public site URL for metadataBase, sitemap and robots. Per environment, never hard-coded:
//   SITE_URL set (local .env.local or a Vercel variable) -> use it
//   Vercel production -> the project's production domain (Vercel supplies it)
//   Vercel preview    -> that preview's own URL, so og:image and the sitemap point at it
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
