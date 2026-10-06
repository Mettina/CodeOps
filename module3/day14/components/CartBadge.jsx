"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartBadge() {
  const { count } = useCart();
  return <Link href="/cart" className="cart-badge">Cart ({count})</Link>;
}
