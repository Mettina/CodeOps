import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { etb } from "@/lib/format";

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
              width={dish.imageWidth}
              height={dish.imageHeight}
              sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 850px) calc(50vw - 40px), (max-width: 1200px) calc(33.333vw - 45.333px), (max-width: 1500px) calc(25vw - 39px), 336px"
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
            {etb(dish.price)}
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