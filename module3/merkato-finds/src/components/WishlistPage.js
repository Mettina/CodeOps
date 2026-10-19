"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useStore } from "./StoreProvider";
import ProductGrid from "./ProductGrid";

export default function WishlistPage() {
  const { wishlist } = useStore();
  return <section className="page-shell wishlist-page"><div className="page-intro"><span className="eyebrow">SAVED FOR LATER</span><h1>Your wishlist<span className="title-period">.</span></h1><p>A little collection of things you have your eye on.</p></div>
    {wishlist.length ? <><div className="results-line"><span>{wishlist.length} saved {wishlist.length === 1 ? "find" : "finds"}</span><Link href="/shop" className="text-link">Keep exploring ↗</Link></div><ProductGrid products={wishlist}/></> : <div className="empty-state"><Heart size={38}/><h2>Keep the things you love close.</h2><p>Tap the heart on any product and it will appear here.</p><Link href="/shop" className="button button-dark">Explore products <ArrowRight size={17}/></Link></div>}
  </section>;
}
