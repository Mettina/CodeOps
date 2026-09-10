import useFetch from "./hooks/useFetch.js";
import { loadAllDishes } from "./api.js";

// Exercise 2 (second usage): a small, independent component that also
// calls useFetch -- proving the hook works outside of Menu.jsx and
// isn't secretly coupled to it. Shown in the header as a dish count.
export default function MenuStats() {
  const { data, loading, error } = useFetch(
    (signal) => loadAllDishes(signal),
    []
  );

  if (loading || error || !data) {
    // Keep quiet on loading/error here -- Menu.jsx already surfaces
    // those states prominently; this is just a small header detail.
    return null;
  }

  return (
    <p className="menu-stats">
      {data.length} dishes on the menu today
    </p>
  );
}
