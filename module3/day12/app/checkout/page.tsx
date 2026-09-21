import { cookies } from 'next/headers';

// This route is dynamic because it reads cookies() — a runtime API
// that opts the page out of static rendering.
export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const cart = cookieStore.get('cart')?.value ?? 'empty';

  return (
    <>
      <h2>Checkout</h2>
      <p>Cart: {cart}</p>
    </>
  );
}