import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private or per-browser pages: not for search results.
        disallow: ["/cart", "/checkout", "/orders", "/order-success", "/account", "/dashboard", "/track", "/api", "/login", "/signup", "/wishlist"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
