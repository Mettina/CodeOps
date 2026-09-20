import Link from 'next/link';

export default function CategoryBar() {
  return (
    <nav>
      <Link href="/menu">All</Link> |{' '}
      <Link href="/menu?cat=pizza">Pizza</Link> |{' '}
      <Link href="/menu?cat=drinks">Drinks</Link> |{' '}
      <Link href="/menu?cat=desserts">Desserts</Link>
    </nav>
  );
}