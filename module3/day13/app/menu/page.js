import { getDishes, categories } from "@/lib/data";
import FilterShell from "@/components/FilterShell";
import DishList from "@/components/DishList";

// Async server component: awaits its data. No hooks, no loading/error state.
export default async function MenuPage() {
  const dishes = await getDishes();

  return (
    <section>
      <h1>Addis Eats Menu</h1>
      <p>{dishes.length} dishes available</p>
      <FilterShell categories={categories}>
        <DishList dishes={dishes} />
      </FilterShell>
    </section>
  );
}
