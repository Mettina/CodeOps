import Link from "next/link";

export default function NotFound() {
  return (
    <div className="status">
      <p>That dish isn't on our menu.</p>
      <Link href="/menu">Back to the menu</Link>
    </div>
  );
}
