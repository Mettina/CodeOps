import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Addis Eats | Ethiopian Restaurant",
  description:
    "Discover delicious Ethiopian dishes, freshly prepared and delivered to your table.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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