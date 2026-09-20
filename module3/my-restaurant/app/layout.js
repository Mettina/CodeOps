
import './globals.css';

export const metadata = {
  title: 'My Restaurant App',
  description: 'Next.js App Router project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}