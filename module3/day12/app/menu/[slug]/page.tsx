const dishes = [
  { slug: 'margherita', name: 'Margherita Pizza' },
  { slug: 'carbonara', name: 'Spaghetti Carbonara' },
  { slug: 'caesar', name: 'Caesar Salad' },
];

export function generateStaticParams() {
  return dishes.map((d) => ({ slug: d.slug }));
}

export default async function DishPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dish = dishes.find((d) => d.slug === slug);

  return (
    <>
      <h2>Dish: {dish?.name ?? slug}</h2>
      <p>Slug: {slug}</p>
    </>
  );
}