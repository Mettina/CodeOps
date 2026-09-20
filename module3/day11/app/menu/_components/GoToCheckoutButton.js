'use client';

import { useRouter } from 'next/navigation';

export default function GoToCheckoutButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.push('/checkout')}>
      Go to Checkout
    </button>
  );
}