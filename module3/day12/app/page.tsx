import { Suspense } from 'react';
import Link from 'next/link';

export const revalidate = 60;

const dishes = [
  { slug: 'margherita', name: 'Margherita Pizza' },
  { slug: 'carbonara', name: 'Spaghetti Carbonara' },
  { slug: 'caesar', name: 'Caesar Salad' },
];

async function DishList() {

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <ul className="menu-list">
      {dishes.map((d) => (
        <li key={d.slug}>
          <Link href={`/menu/${d.slug}`}>{d.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default function MenuPage() {
  return (
    <>
      <h2>Menu</h2>
      <Suspense fallback={<p className="menu-loading">Loading dishes…</p>}>
        <DishList />
      </Suspense>
    </>
  );
}