import Link from "next/link";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">Addis Eats</Link>
      <nav>
        <Link href="/menu">Menu</Link>
        <CartBadge />
        <Link href="/checkout">Checkout</Link>
        <Link href="/my-orders">My Orders</Link>
        <Link href="/signin">Sign in</Link>
      </nav>
    </header>
  );
}
