import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'My Restaurant App',
  description: 'Next.js App Router project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link> |{' '}
          <Link href="/menu">Menu</Link> |{' '}
          <Link href="/cart">Cart</Link> |{' '}
          <Link href="/checkout">Checkout</Link>
        </nav>
        <hr />
        {children}
      </body>
    </html>
  );
}