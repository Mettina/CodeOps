import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BadgeCheck, HeartHandshake, PackageCheck } from "lucide-react";
import { categories, products } from "@/data/products";
import CategoryCard from "@/components/CategoryCard";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";

export default function HomePage() {
  return <>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow hero-eyebrow"><span className="eyebrow-dot"/> A MARKETPLACE WITH LOCAL SOUL</span><h1>Find your next<br/><em>favorite thing.</em></h1><p>Thoughtful pieces, everyday essentials, and one-of-a-kind finds from sellers worth discovering.</p><div className="hero-buttons"><Link href="/shop" className="button button-dark">Explore the marketplace <ArrowRight size={17}/></Link><Link href="/handmade" className="text-link">Shop handmade <ArrowUpRight size={17}/></Link></div><div className="hero-proof"><div className="avatar-stack"><span>ሀ</span><span>m</span><span>እ</span></div><span><strong>Local stories, real finds</strong><small>Discover something with meaning</small></span></div></div>
      <div className="hero-visual"><Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=90" alt="Warm, curated home interior with thoughtful design details" fill priority sizes="(max-width: 800px) 100vw, 50vw"/><div className="hero-note"><span className="note-icon">✳</span><div><strong>Made to be discovered</strong><small>Finds for every kind of home</small></div><ArrowUpRight size={19}/></div><div className="hero-stamp">LOCAL<br/>FINDS<br/><span>✳</span></div></div>
      <div className="hero-side-label">CURATED IN ETHIOPIA · 2026</div>
    </section>
    <section className="trust-strip"><div><BadgeCheck/><span><strong>Thoughtfully selected</strong><small>Products with personality</small></span></div><div><HeartHandshake/><span><strong>Support local sellers</strong><small>Every purchase has a story</small></span></div><div><PackageCheck/><span><strong>Easy to explore</strong><small>Your next find is waiting</small></span></div></section>
    <section className="section section-categories"><SectionHeading eyebrow="A LITTLE OF EVERYTHING" title="What are you looking for?" description="From daily essentials to pieces that make you pause." link={<Link href="/shop" className="text-link">Explore all categories <ArrowRight size={16}/></Link>}/><div className="category-grid">{categories.map((category, i) => <CategoryCard key={category.slug} category={category} index={i}/>)}</div></section>
    <section className="section featured-section"><SectionHeading eyebrow="GOOD THINGS, FOUND" title="A few favorites" description="A curated mix to get your discovery started." link={<Link href="/shop" className="text-link">Shop all finds <ArrowRight size={16}/></Link>}/><ProductGrid products={products.slice(0, 4)}/></section>
    <section className="maker-banner"><div className="maker-image"><img src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=85" alt="Handmade ceramic pottery" loading="lazy" decoding="async" width="1000" height="750"/></div><div className="maker-copy"><span className="eyebrow">THE PEOPLE BEHIND THE PIECES</span><h2>Good finds.<br/><em>Great stories.</em></h2><p>Meet independent sellers, discover handmade details, and find things that feel a little more personal. Shopping local has never felt so good.</p><Link href="/handmade" className="button button-light">Discover handmade <ArrowRight size={17}/></Link></div><div className="maker-decoration">MADE<br/>WITH<br/>PURPOSE</div></section>
    <section className="section best-section"><SectionHeading eyebrow="MORE TO LOVE" title="Worth a closer look" description="Fresh inspiration for your everyday." link={<Link href="/shop" className="text-link">See everything <ArrowRight size={16}/></Link>}/><ProductGrid products={products.slice(4, 8)}/></section>
    <section className="sell-cta"><div><span className="eyebrow">HAVE SOMETHING SPECIAL?</span><h2>Your story belongs<br/>on our marketplace.</h2><p>Bring your products to a community that loves discovering something new.</p></div><Link href="/sell" className="button button-dark">Become a seller <ArrowUpRight size={17}/></Link></section>
  </>;
}
