import { useState } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import { dishes, categories } from "./data.js";

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [orderTotal, setOrderTotal] = useState(0);

  const shown =
    category === "All" ? dishes : dishes.filter((d) => d.category === category);

  function addToTotal(price) {
    setOrderTotal((total) => total + price);
  }

  return (
    <section className="menu">
      <CategoryBar categories={categories} selected={category} onSelect={setCategory} />
      <DishList dishes={shown} onAdd={addToTotal} />
      <div className="order-total">
        Order total: <strong>{orderTotal} ETB</strong>
      </div>
    </section>
  );
}
