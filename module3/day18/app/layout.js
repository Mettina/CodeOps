import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Addis Eats | Ethiopian Restaurant",
  description:
    "Discover delicious Ethiopian dishes, freshly prepared and delivered to your table.",
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