import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import { products } from "@/data/products";
import { etb } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import ProductActions from "@/components/ProductActions";
import ProductGrid from "@/components/ProductGrid";

// Static: every product id is known at build time, so each page is prerendered HTML.
// An id that was not generated is a 404 (dynamicParams = false), not a blank page.
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

const findProduct = (id) => products.find((item) => item.id === id);

// Each product gets its own title, description and share image (it used to share one).
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: "Product not found | Merkato Finds" };
  return {
    title: `${product.name} | Merkato Finds`,
    description: product.description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
      type: "website",
    },
  };
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) notFound();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: product.seller },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
    offers: { "@type": "Offer", priceCurrency: "ETB", price: product.price, url: `${SITE_URL}/product/${product.id}`, availability: "https://schema.org/InStock" },
  };

  return (
    <div className="page-shell product-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Link href="/shop" className="back-link"><ArrowLeft size={16} /> Back to all finds</Link>
      <div className="product-detail">
        <div className="detail-image">
          {/* The LCP element on this page: priority preloads it, sizes avoids over-fetching. */}
          <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 800px) 100vw, 50vw" />
          {product.badge && <span className="product-badge">{product.badge}</span>}
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category.toUpperCase()} · {product.seller.toUpperCase()}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><Star size={16} fill="currentColor" /> {product.rating} <span>({product.reviews} reviews)</span></div>
          <div className="detail-price">{etb(product.price)} {product.oldPrice && <del>{etb(product.oldPrice)}</del>}</div>
          <p className="detail-description">{product.description}</p>
          <div className="detail-seller"><span className="seller-avatar">{product.seller.charAt(0)}</span><span><strong>{product.seller}</strong><small>Independent marketplace seller</small></span><ShieldCheck size={19} /></div>
          <ProductActions product={product} />
          <div className="delivery-note"><Truck size={19} /><span><strong>Delivery details</strong><small>Delivery options can be confirmed at checkout.</small></span></div>
          <p className="demo-note">Demo product listing. Availability and seller details are illustrative.</p>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <div><span className="eyebrow">KEEP EXPLORING</span><h2>More from {product.category}</h2></div>
            <Link href={`/${product.category === "Home & Living" ? "home-living" : product.category.toLowerCase()}`} className="text-link">See collection ↗</Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  );
}
