// Week 1 project requirement: "a category filter driving the fetch".
// Called from Menu.jsx as the `fetcher` passed into useFetch, with
// `category` in the dependency array -- so switching categories re-runs
// the fetch instead of only re-filtering already-fetched data.
// (dishes.json is a static file, so every request actually returns the
// same bytes -- a real API would filter server-side. What matters here
// is that the *request itself* re-fires when category changes.)
export async function loadDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error(`Failed to load menu (status ${res.status})`);
  }

  const data = await res.json();

  return category === "All" ? data : data.filter((dish) => dish.category === category);
}

// Exercise 2 (second usage): a plain fetcher with no filtering, used by
// MenuStats.jsx to independently pull the same dishes.json through the
// same useFetch hook, proving the hook isn't tied to one component.
export async function loadAllDishes(signal) {
  const res = await fetch("/dishes.json", { signal });

  if (!res.ok) {
    throw new Error(`Failed to load menu (status ${res.status})`);
  }

  return res.json();
}
