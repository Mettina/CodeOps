import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">Addis Eats</Link>
      <nav>
        <Link href="/menu">Menu</Link>
        <CartBadge />
      </nav>
    </header>
  );
}
