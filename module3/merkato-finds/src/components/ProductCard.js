"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "./StoreProvider";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.id);
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link href={`/product/${product.id}`} className="product-image-link"><Image className="product-image" src={product.image} alt={product.name} fill sizes="(max-width: 800px) 50vw, 25vw"/></Link>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <button type="button" aria-pressed={saved} className={`favorite-button ${saved ? "is-saved" : ""}`} onClick={() => toggleWishlist(product)} aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}><Heart size={18} fill={saved ? "currentColor" : "none"}/></button>
      <button type="button" className="quick-add" onClick={() => addToCart(product)}><ShoppingBag size={16}/> Add to bag</button>
    </div>
    <div className="product-info">
      <div className="product-meta"><span>{product.category}</span><span className="rating"><Star size={13} fill="currentColor"/> {product.rating}</span></div>
      <Link href={`/product/${product.id}`} className="product-name">{product.name}</Link>
      <div className="price-line"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
      <p className="seller-name">Sold by {product.seller}</p>
    </div>
  </article>;
}
