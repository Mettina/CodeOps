import { categories, getDishPage } from "@/lib/data";
import FilterShell from "@/components/FilterShell";

export default async function MenuPage({ searchParams }) {
  const { page = "1", category = "", search = "" } = await searchParams;
  const initialSearch = typeof search === "string" ? search.trim() : "";
  const initialData = await getDishPage(page, initialSearch, category);

  return (
    <main className="menu-page">
      {/* Hero Banner */}
      <section className="menu-hero">
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