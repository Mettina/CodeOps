import DishCard from "./DishCard";

// Server component: pure markup from data. Ships no JavaScript.
export default function DishList({ dishes }) {
  return (
    <ul className="dish-list menu-dish-list">
      {dishes.map((dish, index) => (
        <DishCard key={dish.id} dish={dish} priority={index === 0} />
      ))}
    </ul>
  );
}
