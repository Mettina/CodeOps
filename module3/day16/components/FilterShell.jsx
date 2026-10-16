"use client";

import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import CategoryBar from "./CategoryBar";

export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(null);
  const listRef = useRef(null);
  const { data: searchResults, error, isLoading } = useSWR(
    debouncedSearch
      ? `/api/dishes?search=${encodeURIComponent(debouncedSearch)}`
      : null,
    fetcher
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const cards = listRef.current?.querySelectorAll(".dish-card[data-category]");
    if (!cards) return;

    const matchingIds = searchResults
      ? new Set(searchResults.map((dish) => String(dish.id)))
      : null;
    let count = 0;

    cards.forEach((card) => {
      const matchesCategory = selected === "All" || card.dataset.category === selected;
      const matchesSearch = !debouncedSearch || matchingIds?.has(card.dataset.id);
      card.hidden = !matchesCategory || !matchesSearch;
      if (!card.hidden) count += 1;
    });

    setVisibleCount(isLoading || error ? null : count);
  }, [debouncedSearch, error, isLoading, searchResults, selected]);

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
        {isLoading && <p className="status" role="status">Searching dishes...</p>}
        {error && <p className="status" role="alert">{error.message}</p>}
        {visibleCount === 0 && <p className="status">No dishes match your search.</p>}
      </div>
    </div>
  );
}
