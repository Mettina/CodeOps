import Link from "next/link";

export default function NotFound() {
  return (
    <section className="status">
      <h1>Page not found</h1>
      <p>We couldn't find that page.</p>
      <Link href="/menu">Browse the menu</Link>
    </section>
  );
}
