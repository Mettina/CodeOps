// [EXERCISE 6] Sitemap generated from the real dish records at build time.
// A dish added next month appears with no one editing a file.
// Private/signed-in routes (/cart, /checkout, /orders, /my-orders, /kitchen,
// /signin) are deliberately NOT listed.
import { getDishes } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default async function sitemap() {
  const dishes = await getDishes();
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/menu`, priority: 0.8 },
    ...dishes.map((dish) => ({
      url: `${SITE_URL}/menu/${dish.id}`,
      priority: 0.6,
    })),
  ];
}
