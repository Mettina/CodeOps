import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

// Server component. data-category lets the client FilterShell hide cards with CSS
// without ever importing this component.
export default function DishCard({ dish }) {
  return (
    <li className="dish-card" data-category={dish.category}>
      <div>
        <Link href={`/dish/${dish.id}`}>{dish.name}</Link>
        <span className="meta"> {dish.category} · {dish.price} ETB</span>
      </div>
      <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
    </li>
  );
}
