"use client";

import { useState } from "react";
import CategoryBar from "./CategoryBar";


export default function FilterShell({ categories, children }) {
  const [selected, setSelected] = useState("All");

  return (
    <div>
      <CategoryBar categories={categories} selected={selected} onSelect={setSelected} />
      {selected !== "All" && (
        <style>{`.dish-card:not([data-category="${selected}"]) { display: none; }`}</style>
      )}
      {children}
    </div>
  );
}
