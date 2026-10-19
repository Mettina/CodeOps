import { categories, products } from "@/data/products";
import { SITE_URL } from "@/lib/site";

// Generated from the real product records, so a product added next month appears with no one
// editing a file. Private routes (cart, checkout, orders, account...) are deliberately not listed.
export default function sitemap() {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/shop`, priority: 0.8 },
    ...categories.map((c) => ({ url: `${SITE_URL}/${c.slug}`, priority: 0.7 })),
    ...products.map((p) => ({ url: `${SITE_URL}/product/${p.id}`, priority: 0.6 })),
    { url: `${SITE_URL}/about`, priority: 0.4 },
    { url: `${SITE_URL}/contact`, priority: 0.3 },
    { url: `${SITE_URL}/sell`, priority: 0.3 },
  ];
}
