import { getDishes, categories } from "@/lib/data";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await getDishes();

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
        <FilterShell categories={categories}>
          <DishList dishes={dishes} />
        </FilterShell>
      </section>
    </main>
  );
}