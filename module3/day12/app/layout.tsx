
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Exercise app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1> My Restaurant</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2026 My Restaurant</p>
        </footer>
      </body>
    </html>
  );
}