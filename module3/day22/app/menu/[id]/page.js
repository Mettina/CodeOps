import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getDish, getDishes, getReviews } from "@/lib/data";
import JsonLd from "@/components/JsonLd";
import { OG_BASE, SITE_NAME, absoluteUrl } from "@/lib/site";
import { etb } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: String(dish.id) }));
}

// [EXERCISE 3] Metadata generated from the dish record (name, price, description).
// Different description per dish, so the pages are never duplicates.
// [MINI-PROJECT] canonical per dish.
export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish not found" };

  const description = `${dish.name} — ${etb(dish.price)}. ${dish.description}`;
  return {
    title: dish.name, // "Kitfo · Addis Eats" via the template
    description,
    alternates: { canonical: `/menu/${dish.id}` },
    // No `images` here on purpose: the generated opengraph-image.jsx in this folder
    // (Exercise 4) is attached automatically.
    openGraph: { ...OG_BASE, title: `${dish.name} · ${SITE_NAME}`, description, url: `/menu/${dish.id}` },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const [dish, reviews] = await Promise.all([getDish(id), getReviews(id)]);

  if (!dish) notFound();

  // [EXERCISE 5] MenuItem JSON-LD built from the SAME dish object the page renders
  // (name, description, price in ETB all appear on the page below).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    ...(dish.image && { image: absoluteUrl(dish.image) }),
    offers: { "@type": "Offer", price: dish.price, priceCurrency: "ETB" },
  };

  return (
    <article className="dish-detail">
      <JsonLd data={jsonLd} />
      <Link href="/menu">Back to menu</Link>

      <div className="dish-detail-layout">
        {dish.image && (
          <div className="dish-detail-image-wrap">
            <Image
              className="dish-detail-image"
              src={dish.image}
              alt={dish.name}
              width={dish.imageWidth}
              height={dish.imageHeight}
              priority
              sizes="(max-width: 480px) calc(100vw - 24px), (max-width: 700px) calc(100vw - 32px), 560px"
            />
          </div>
        )}

        <div className="dish-detail-copy">
          <h1>{dish.name}</h1>
          <p>{dish.description}</p>
          <p className="price">{etb(dish.price)}</p>
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
