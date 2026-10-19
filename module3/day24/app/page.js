import Link from "next/link";
import HeroImage from "@/components/HeroImage";
import JsonLd from "@/components/JsonLd";
import FilterShell from "@/components/FilterShell";
import { categories, getDishPage } from "@/lib/data";
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

export default async function Home() {
  const initialData = await getDishPage();

  return (
    <div className="home-page">
      <JsonLd data={restaurantJsonLd} />
      <section className="intro">
        <HeroImage
          sizes="(max-width: 480px) calc(100vw - 24px), (max-width: 850px) calc(100vw - 32px), (max-width: 1500px) calc(100vw - 48px), 1452px"
        />
        <h1>Addis Eats</h1>
        <p>Ethiopian dishes, cooked fresh and brought to your table.</p>
        <Link className="button" href="#menu">See the menu</Link>
      </section>

      <section className="home-menu-section" id="menu" aria-labelledby="home-menu-heading">
        <div className="home-menu-heading">
          <div>
            <p className="home-menu-eyebrow">FRESH FROM OUR KITCHEN</p>
            <h2 id="home-menu-heading">Explore the menu</h2>
            <p>Discover Ethiopian favorites made fresh to order.</p>
          </div>
          <Link className="button" href="/menu">View full menu</Link>
        </div>
        <FilterShell categories={categories} initialData={initialData} initialSearch="" />
      </section>
    </div>
  );
}
