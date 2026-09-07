// Fetches the menu from /dishes.json (acts as our mock API endpoint).
// Filtering by category happens after the fetch, so switching categories
// actually triggers a new network request -- which is the whole point of
// wiring `category` into the effect's dependency array.
export async function loadDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error(`Failed to load menu (status ${res.status})`);
  }

  const data = await res.json();

  return category === "All" ? data : data.filter((dish) => dish.category === category);
}
