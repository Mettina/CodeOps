import Link from "next/link";
import { notFound } from "next/navigation";
import { getDish, getReviews } from "@/lib/data";
import AddToCartButton from "@/components/AddToCartButton";

// Async server component. Both awaits start together, so the wait is
// the slower of the two (about 600ms) rather than their sum.
export default async function DishPage({ params }) {
  const { id } = await params;
  const [dish, reviews] = await Promise.all([getDish(id), getReviews(id)]);

  if (!dish) notFound(); // the "empty" state

  return (
    <article className="dish-detail">
      <Link href="/menu">← Back to menu</Link>
      <h1>{dish.name}</h1>
      <p>{dish.description}</p>
      <p className="price">{dish.price} ETB</p>
      {/* Plain data props only: id, name, price. No callbacks cross the boundary. */}
      <AddToCartButton id={dish.id} name={dish.name} price={dish.price} />

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p className="status">No reviews yet.</p>
      ) : (
        <ul className="reviews">
          {reviews.map((r) => (
            <li key={r.id}><strong>{r.author}</strong> {r.text}</li>
          ))}
        </ul>
      )}
    </article>
  );
}
