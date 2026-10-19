import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, OG_BASE, absoluteUrl } from "@/lib/site";


// [EXERCISE 2] Home: no title set on purpose, so the root "default" title is used
// (the template is not applied to it). Own description + canonical.
const description =
  "Order Doro Wot, Tibs, Kitfo and Shiro from Addis Eats. Fresh Ethiopian dishes, cooked to order and delivered to your table.";

export const metadata = {
  description,
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_BASE,
    title: "Addis Eats — Ethiopian food delivery in Addis Ababa",
    description,
    url: "/",
  },
};

// [EXERCISE 5 - home] Restaurant JSON-LD. Only facts the page shows (name, cuisine, menu link).
const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE_NAME,
  url: SITE_URL,
  servesCuisine: "Ethiopian",
  hasMenu: absoluteUrl("/menu"),
};

export default function Home() {
  return (
    <section className="intro">
      <JsonLd data={restaurantJsonLd} />
      <HeroImage
        sizes="(max-width: 480px) calc(100vw - 24px), (max-width: 850px) calc(100vw - 32px), (max-width: 1500px) calc(100vw - 48px), 1452px"
      />
      <h1>Addis Eats</h1>
      <p>Ethiopian dishes, cooked fresh and brought to your table.</p>
      <Link className="button" href="/menu">See the menu</Link>
    </section>
  );
}
