'use client';

import Link from 'next/link';
import { useState } from 'react';
import './menu.css';

const categories = ['Pizza', 'Pasta', 'Salads', 'Desserts'];

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

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

        <div className="menu-counter">
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
      </aside>

      <section className="menu-content">{children}</section>
    </div>
  );
}