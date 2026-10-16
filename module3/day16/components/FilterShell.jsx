"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";

function menuHref(page, category, search) {
  const params = new URLSearchParams({ page: String(page) });
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  return `/menu?${params.toString()}`;
}

export default function FilterShell({ categories, initialData, initialSearch }) {
  const router = useRouter();
  const selected = initialData.category || "All";
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const searchPage = debouncedSearch === initialSearch ? initialData.page : 1;
  const { data, error, isLoading } = useSWR(
    debouncedSearch
      ? `/api/dishes?search=${encodeURIComponent(debouncedSearch)}&page=${searchPage}&category=${encodeURIComponent(initialData.category)}`
      : null,
    fetcher,
    {
      fallbackData: debouncedSearch === initialSearch ? initialData : undefined,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    setSearch(initialSearch);
    setDebouncedSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const nextSearch = search.trim();
    if (nextSearch === debouncedSearch) return;

    const timeoutId = setTimeout(() => {
      setDebouncedSearch(nextSearch);
      router.replace(
        menuHref(1, selected === "All" ? "" : selected, nextSearch),
        { scroll: false }
      );
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [debouncedSearch, router, search, selected]);

  const pageData = debouncedSearch ? data : initialData;
  const pageInfo = pageData ?? initialData;
  const chooseCategory = (category) => {
    router.push(
      menuHref(1, category === "All" ? "" : category, debouncedSearch),
      { scroll: false }
    );
  };

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
      <CategoryBar categories={categories} selected={selected} onSelect={chooseCategory} />
      {error && <p className="status" role="alert">{error.message}</p>}
      {debouncedSearch && isLoading && !data ? (
        <p className="status" role="status">Searching dishes...</p>
      ) : pageData?.dishes.length > 0 ? (
        <DishList dishes={pageData.dishes} />
      ) : !pageData && error ? null : (
        <p className="status">No dishes match your search.</p>
      )}
      {pageInfo.totalPages > 1 && (
        <nav className="category-bar" aria-label="Menu pages">
          {pageInfo.page > 1 && (
            <Link
              className="chip"
              href={menuHref(pageInfo.page - 1, initialData.category, debouncedSearch)}
            >
              Previous
            </Link>
          )}
          {Array.from({ length: pageInfo.totalPages }, (_, index) => index + 1).map((page) => (
            <Link
              key={page}
              className={page === pageInfo.page ? "chip active" : "chip"}
              href={menuHref(page, initialData.category, debouncedSearch)}
              aria-current={page === pageInfo.page ? "page" : undefined}
            >
              {page}
            </Link>
          ))}
          {pageInfo.page < pageInfo.totalPages && (
            <Link
              className="chip"
              href={menuHref(pageInfo.page + 1, initialData.category, debouncedSearch)}
            >
              Next
            </Link>
          )}
        </nav>
      )}
      <p className="status" aria-live="polite">
        Page {pageInfo.page} of {pageInfo.totalPages || 1}
      </p>
    </div>
  );
}
