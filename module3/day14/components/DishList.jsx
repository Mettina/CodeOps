import DishCard from "./DishCard";

// Server component: pure markup from data. Ships no JavaScript.
export default function DishList({ dishes }) {
  return (
    <ul className="dish-list">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </ul>
  );
}
