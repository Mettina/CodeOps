import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <li
      className="dish-card menu-dish-card"
    >
      {/* Food Image */}
      {dish.image && (
        <Link href={`/menu/${dish.id}`} className="dish-image-link">
          <div className="dish-image-wrap">
            <Image
              className="dish-card-image"
              src={dish.image}
              alt={dish.name}
              fill
              sizes="(max-width: 480px) 100vw, (max-width: 800px) 50vw, 25vw"
            />

            <span className="dish-category-badge">
              {dish.category}
            </span>
          </div>
        </Link>
      )}

      {/* Dish Information */}
      <div className="dish-copy">
        <Link href={`/menu/${dish.id}`} className="dish-name">
          {dish.name}
        </Link>

        <p className="dish-description">
          {dish.description}
        </p>

        <div className="dish-card-bottom">
          <span className="price">
            {dish.price} ETB
          </span>
        </div>
      </div>

      {/* Add to Cart */}
      <div className="dish-card-action">
        <AddToCartButton
          id={dish.id}
          name={dish.name}
          price={dish.price}
        />
      </div>
    </li>
  );
}