import "./globals.css";
import { DM_Sans, Manrope } from "next/font/google";
import { StoreProvider } from "@/components/StoreProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { getSession } from "@/lib/session";
import { isStaff } from "@/lib/staff";

// Self-hosted at build time: no render-blocking request to Google Fonts from the browser.
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap", variable: "--font-dm" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], display: "swap", variable: "--font-manrope" });

export const metadata = {
  // Makes every relative URL in metadata (canonical, og:image) absolute.
  metadataBase: new URL(SITE_URL),
  title: { default: "Merkato Finds | Discover Something Special", template: "%s" },
  description: "Discover thoughtful products, local sellers, and handmade finds with Merkato Finds.",
  openGraph: {
    siteName: "Merkato Finds",
    type: "website",
    title: "Merkato Finds | Discover Something Special",
    description: "Discover thoughtful products, local sellers, and handmade finds.",
    images: [{ url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80", alt: "A warm, curated home interior" }],
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  const staff = isStaff(session);

  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <StoreProvider><Header session={session} staff={staff} /><main id="main">{children}</main><Footer /></StoreProvider>
      </body>
    </html>
  );
}
