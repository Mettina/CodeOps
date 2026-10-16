"use client";

import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    const cards = listRef.current?.querySelectorAll(".dish-card[data-category]");
    if (!cards) return;

    const query = search.trim().toLocaleLowerCase();
    let count = 0;

    cards.forEach((card) => {
      const matchesCategory = selected === "All" || card.dataset.category === selected;
      const matchesSearch = (card.dataset.search ?? "").toLocaleLowerCase().includes(query);
      card.hidden = !matchesCategory || !matchesSearch;
      if (!card.hidden) count += 1;
    });

    setVisibleCount(count);
  }, [search, selected]);

  return (
    <div>
      <label className="dish-search">
        <span>Search dishes</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by dish, category, or description"
        />
      </label>
      <CategoryBar categories={categories} selected={selected} onSelect={setSelected} />
      <div ref={listRef}>
        {children}
        {visibleCount === 0 && <p className="status">No dishes match your search.</p>}
      </div>
    </div>
  );
}
