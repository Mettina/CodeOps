// [EXERCISE 7] robots.txt: allow the public site, disallow private routes,
// and point crawlers at the sitemap.
import { SITE_URL } from "@/lib/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cart", // required by the exercise
          "/checkout", // required by the exercise
          "/orders", // extra: signed-in routes, also covers /orders/[id]
          "/my-orders",
          "/kitchen",
          "/dashboard", // staff only
          "/signin",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
