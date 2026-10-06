import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";

export const metadata = { title: "Addis Eats" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
