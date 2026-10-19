"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartBadge from "./CartBadge";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo and branding */}
        <Link href="/" className="brand">
          <span className="brand-mark">A</span>

          <span className="brand-text">
            <span className="brand-name">Addis Eats</span>
            <span className="brand-tagline">
              THE TASTE OF ETHIOPIA
            </span>
          </span>
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="hamburger-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="main-navigation"
          className={menuOpen ? "header-nav is-open" : "header-nav"}
          aria-label="Main navigation"
        >
          <Link href="/" className="nav-link">
            Home
          </Link>

          <Link href="/#menu" className="nav-link">
            Menu
          </Link>

          <Link href="/my-orders" className="nav-link">
            My Orders
          </Link>

          <Link href="/signin" className="nav-link">
            Sign in
          </Link>

          <div className="header-actions">
            <CartBadge />

            <Link href="/checkout" className="checkout-link">
              Checkout
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}