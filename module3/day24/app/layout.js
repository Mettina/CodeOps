import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

// [EXERCISE 1] Root layout: metadataBase + title template + default title.
// [MINI-PROJECT] metadataBase = production URL, so og:image URLs become absolute.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · Addis Eats", // /menu -> "Menu · Addis Eats"
    default: "Addis Eats — Ethiopian food delivery in Addis Ababa", // used where a page sets no title
  },
  description:
    "Order Doro Wot, Tibs, Kitfo and Shiro from Addis Eats. Fresh Ethiopian dishes, cooked to order and delivered to your table.",
  openGraph: { siteName: SITE_NAME, locale: "en_ET", type: "website" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="site-shell">
            <Header />

            <main className="main-content">{children}</main>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}