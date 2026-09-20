import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Dish Not Found</h2>
      <p>Couldn't find the dish you're looking for.</p>
      <Link href="/menu">Back to Menu</Link>
    </div>
  );
}