import Dish from "./Dish.jsx";
import Card from "./Card.jsx";
import { dishes } from "./data.js";

export default function Menu({ category = "All" }) {
  const shown =
    category === "All" ? dishes : dishes.filter((d) => d.category === category);

  if (shown.length === 0) {
    return <p className="empty-state">No dishes in this category yet.</p>;
  }

  return (
    <div className="menu">
      {shown.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </div>
  );
}
