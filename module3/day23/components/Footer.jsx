import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <div className="site-footer-brand">
          <Link href="/" className="site-footer-logo">Addis Eats</Link>
          <p>Ethiopian favorites, made fresh.</p>
        </div>
        <nav className="site-footer-nav" aria-label="Footer navigation">
          <Link href="/menu">Menu</Link>
          <Link href="/my-orders">My Orders</Link>
        </nav>
        <p className="site-footer-note">Made with care in Addis Ababa.</p>
      </div>
    </footer>
  );
}
