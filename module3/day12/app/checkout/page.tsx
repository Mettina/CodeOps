import { cookies } from 'next/headers';

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