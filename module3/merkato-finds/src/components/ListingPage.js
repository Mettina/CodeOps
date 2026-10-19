"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductGrid from "./ProductGrid";

export default function ListingPage({ title = "Shop all finds", intro = "Explore thoughtfully chosen products from sellers worth discovering.", category, showSearch = false }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [activeCategory, setActiveCategory] = useState(category || "All");
  const filtered = useMemo(() => {
    let list = products.filter((p) => (activeCategory === "All" || p.category === activeCategory) && (`${p.name} ${p.category} ${p.seller} ${p.description}`).toLowerCase().includes(query.toLowerCase()));
    if (sort === "low") list = [...list].sort((a,b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a,b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a,b) => b.rating - a.rating);
    return list;
  }, [query, sort, activeCategory]);
  return <section className="listing-page page-shell">
    <div className="page-intro"><span className="eyebrow">THE MERKATO EDIT</span><h1>{title}</h1><p>{intro}</p></div>
    <div className="listing-tools">
      {showSearch ? <label className="search-field"><Search size={18}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, categories, sellers..." autoFocus/></label> : <div className="filter-label"><SlidersHorizontal size={17}/> Find your fit</div>}
      <select aria-label="Sort products" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select>
    </div>
    <div className="listing-categories"><button type="button" aria-pressed={activeCategory === "All"} className={activeCategory === "All" ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory("All")}>All finds</button>{categories.map((c) => <button type="button" key={c.slug} aria-pressed={activeCategory === c.name} className={activeCategory === c.name ? "filter-chip active" : "filter-chip"} onClick={() => setActiveCategory(c.name)}>{c.name}</button>)}</div>
    <div className="results-line"><span>{filtered.length} finds to explore</span><span>Prices shown in ETB</span></div>
    <ProductGrid products={filtered}/>
  </section>;
}
