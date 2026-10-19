import { categories, getDishPage } from "@/lib/data";
import FilterShell from "@/components/FilterShell";
import HeroImage from "@/components/HeroImage";
import { OG_BASE } from "@/lib/site";

// [EXERCISE 2] Static metadata for /menu.
// [MINI-PROJECT] canonical: /menu accepts ?page= ?category= ?search=, so every
// variant tells crawlers "the real page is /menu".
const description =
  "Browse the Addis Eats menu: Doro Wot, Tibs, Kitfo and Shiro, plus breakfast, lunch, pizza, burgers and drinks. Order online.";

export const metadata = {
  title: "Menu", // becomes "Menu · Addis Eats" via the root template
  description,
  alternates: { canonical: "/menu" },
  openGraph: { ...OG_BASE, title: "Menu · Addis Eats", description, url: "/menu" },
};

export default async function MenuPage({ searchParams }) {
  const { page = "1", category = "", search = "" } = await searchParams;
  const initialSearch = typeof search === "string" ? search.trim() : "";
  const initialData = await getDishPage(page, initialSearch, category);

  return (
    <main className="menu-page">
      {/* Hero Banner */}
      <section className="menu-hero">
        <HeroImage
          sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 850px) calc(100vw - 64px), (max-width: 1500px) calc(100vw - 96px), 1404px"
        />
        <div className="hero-content">
          <p className="hero-eyebrow">
            AUTHENTIC ETHIOPIAN FLAVORS
          </p>

          <h1>Our Menu</h1>

          <p className="hero-description">
            Fresh ingredients, traditional recipes,
            unforgettable taste.
          </p>
        </div>
      </section>

      {/* Menu and Filters */}
      <section className="menu-content">
        <FilterShell categories={categories} initialData={initialData} initialSearch={initialSearch} />
      </section>
    </main>
  );
}