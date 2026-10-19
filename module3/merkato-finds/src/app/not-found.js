import Link from "next/link";

export const metadata = { title: "Page not found | Merkato Finds" };

export default function NotFound() {
  return (
    <section className="page-shell empty-state">
      <h1>We couldn&apos;t find that page.</h1>
      <p>It may have moved, or the link may be wrong.</p>
      <Link href="/shop" className="button button-dark">Back to the marketplace</Link>
    </section>
  );
}
