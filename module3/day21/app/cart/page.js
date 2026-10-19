// [EXERCISE 2] /cart: server component page (so it CAN export metadata).
// Private + per-visitor, so it is noindex and disallowed in robots.js.
import CartView from "@/components/CartView";

export const metadata = {
  title: "Your cart",
  description: "Review the dishes in your Addis Eats cart.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartView />;
}
