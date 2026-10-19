"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useStore } from "./StoreProvider";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();
  const delivery = cart.length ? 180 : 0;
  return <section className="page-shell cart-page"><div className="page-intro"><span className="eyebrow">YOUR LITTLE FINDS</span><h1>Your bag<span className="title-period">.</span></h1><p>All the good things you picked out, in one place.</p></div>
    {!cart.length ? <div className="empty-state cart-empty"><ShoppingBag size={38}/><h2>Your bag is taking a little break.</h2><p>There are plenty of good things waiting to be found.</p><Link href="/shop" className="button button-dark">Explore the marketplace <ArrowRight size={17}/></Link></div> :
      <div className="cart-layout"><div className="cart-items"><div className="cart-table-head"><span>PRODUCT</span><span>QUANTITY</span><span>SUBTOTAL</span></div>{cart.map((item) => <article className="cart-item" key={item.id}><Link href={`/product/${item.id}`} className="cart-thumb"><img src={item.image} alt={item.name} loading="lazy" decoding="async" width="96" height="96"/></Link><div className="cart-item-copy"><span className="eyebrow">{item.category}</span><Link href={`/product/${item.id}`} className="product-name">{item.name}</Link><small>Sold by {item.seller}</small><strong>{formatPrice(item.price)}</strong><button type="button" className="remove-link" onClick={() => removeFromCart(item.id)}><Trash2 size={14}/> Remove</button></div><div className="quantity-control"><button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={13}/></button><span>{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={13}/></button></div><strong className="cart-subtotal">{formatPrice(item.price * item.quantity)}</strong></article>)}
        <Link href="/shop" className="text-link continue-shopping">← Continue shopping</Link></div>
        <aside className="order-summary"><span className="eyebrow">THE TOTALS</span><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div><div className="summary-row"><span>Estimated delivery</span><span>{formatPrice(delivery)}</span></div><div className="summary-row summary-total"><strong>Total</strong><strong>{formatPrice(cartTotal + delivery)}</strong></div><p className="summary-help">Delivery is an estimate for this demo and may change by location.</p><Link href="/checkout" className="button button-dark full-button">Continue to checkout <ArrowRight size={17}/></Link><div className="secure-note">♡ Your next great find is almost yours.</div></aside></div>}
  </section>;
}
