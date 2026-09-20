import { notFound } from 'next/navigation';

export default async function DishPage({ params }) {
  const { id } = await params;

  if (id === '999') {
    notFound();
  }

  return (
    <div>
      <h1>Dish Details</h1>
      <p>Viewing details for Dish ID: {id}</p>
    </div>
  );
}