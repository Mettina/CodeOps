import Link from "next/link";

export default function Footer() {
  return <footer className="footer">
    <div className="footer-main">
      <div><Link href="/" className="brand footer-brand"><span className="brand-mark">m.</span><span>merkato<span className="brand-light">finds</span><small>DISCOVER SOMETHING SPECIAL</small></span></Link><p>Good things are closer than you think.<br/>Discover products and people worth knowing.</p></div>
      <div><h4>Explore</h4><Link href="/shop">Shop all</Link><Link href="/fashion">Fashion</Link><Link href="/home-living">Home & Living</Link><Link href="/handmade">Handmade</Link></div>
      <div><h4>Help</h4><Link href="/contact">Contact us</Link><Link href="/orders">My orders</Link><Link href="/account">My account</Link><Link href="/sell">Become a seller</Link></div>
      <div><h4>Stay in the know</h4><p>Fresh finds and local stories, delivered occasionally.</p><form className="newsletter" action="/contact"><input aria-label="Email address" type="email" placeholder="Your email address" required/><button aria-label="Subscribe">→</button></form></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Merkato Finds. A marketplace demo.</span><span>Made with care in Ethiopia · Prices in ETB</span></div>
  </footer>;
}
