"use client";

import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, LogOut } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { useStore } from "./StoreProvider";

export default function Header({ session, staff }) {
  const { cartCount, wishlist } = useStore();
  return (
    <>
      <div className="announcement">Thoughtful finds. Local stories. All in one place.</div>
      <header className="site-header">
        <Link href="/" className="brand"><span className="brand-mark">m.</span><span>merkato<span className="brand-light">finds</span><small>DISCOVER SOMETHING SPECIAL</small></span></Link>
        <nav className="desktop-nav" aria-label="Main">
          <Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/fashion">Fashion</Link><Link href="/handmade">Handmade</Link><Link href="/about">Our Story</Link>
        </nav>
        <div className="header-actions">
          <Link aria-label="Search" href="/search" className="icon-button"><Search size={19}/></Link>
          <Link aria-label="Wishlist" href="/wishlist" className="icon-button"><Heart size={19}/><span className="count">{wishlist.length}</span></Link>
          <Link aria-label="Cart" href="/cart" className="icon-button"><ShoppingBag size={19}/><span className="count">{cartCount}</span></Link>
          {session ? (
            <>
              <Link href="/account" className="account-link">Account</Link>
              {staff && <Link href="/dashboard" className="account-link">Dashboard</Link>}
              <span className="welcome-message">Welcome, {session.name}</span>
              <form action={signOut} className="logout-form">
                <button type="submit" className="logout-button"><LogOut size={15}/>Log out</button>
              </form>
            </>
          ) : (
            <Link href="/account" className="account-link">Account</Link>
          )}
        </div>
        <div className="mobile-icons" aria-hidden="true">
          <Link aria-label="Search" href="/search" className="icon-button"><Search size={19}/></Link>
          <Link aria-label="Wishlist" href="/wishlist" className="icon-button"><Heart size={19}/><span className="count">{wishlist.length}</span></Link>
          <Link aria-label="Cart" href="/cart" className="icon-button"><ShoppingBag size={19}/><span className="count">{cartCount}</span></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><Menu aria-hidden="true" /></summary>
          <div className="mobile-menu-panel">
            <nav
              className="mobile-menu-links"
              aria-label="Mobile navigation"
              onClick={(event) => { event.currentTarget.closest("details").open = false; }}
            >
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/search">Search</Link>
              <Link href="/fashion">Fashion</Link>
              <Link href="/electronics">Electronics</Link>
              <Link href="/home-living">Home &amp; Living</Link>
              <Link href="/beauty">Beauty</Link>
              <Link href="/handmade">Handmade</Link>
              <Link href="/accessories">Accessories</Link>
              <Link href="/about">Our Story</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/wishlist">Wishlist ({wishlist.length})</Link>
              <Link href="/cart">My bag ({cartCount})</Link>
              <Link href="/account">{session ? "My account" : "Account"}</Link>
              {session && <Link href="/orders">My orders</Link>}
              {staff && <Link href="/dashboard">Staff dashboard</Link>}
            </nav>
          </div>
        </details>
      </header>
    </>
  );
}
