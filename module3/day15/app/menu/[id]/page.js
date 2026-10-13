import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getDish, getDishes, getReviews } from "@/lib/data";

export const dynamicParams = false;

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const [dish, reviews] = await Promise.all([getDish(id), getReviews(id)]);

  if (!dish) notFound();

  return (
    <article className="dish-detail">
      <Link href="/menu">Back to menu</Link>

      <div className="dish-detail-layout">
        {dish.image && (
          <div className="dish-detail-image-wrap">
            <Image
              className="dish-detail-image"
              src={dish.image}
              alt={dish.name}
              width={640}
              height={480}
              priority
            />
          </div>
        )}

        <div className="dish-detail-copy">
          <h1>{dish.name}</h1>
          <p>{dish.description}</p>
          <p className="price">{dish.price} ETB</p>
          <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />
        </div>
      </div>

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p className="status">No reviews yet.</p>
      ) : (
        <ul className="reviews">
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.author}</strong> {review.text}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
