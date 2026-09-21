import Link from 'next/link';
import './menu.css';

const categories = ['Pizza', 'Pasta', 'Salads', 'Desserts'];

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="menu-shell">
      <aside className="menu-sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map((c) => (
            <li key={c}>
              <Link href={`/menu?category=${c.toLowerCase()}`}>{c}</Link>
            </li>
          ))}
        </ul>
      </aside>

      <section className="menu-content">{children}</section>
    </div>
  );
}