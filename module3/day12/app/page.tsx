import Link from 'next/link';

export const revalidate = 60;


const dishes = [
  { slug: 'margherita', name: 'Margherita Pizza' },
  { slug: 'carbonara', name: 'Spaghetti Carbonara' },
  { slug: 'caesar', name: 'Caesar Salad' },
];

export default function MenuPage() {
  return (
    <>
      <h2>Menu</h2>
      <ul className="menu-list">
        {dishes.map((d) => (
          <li key={d.slug}>
            <Link href={`/menu/${d.slug}`}>{d.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}