import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products.length) return <div className="empty-state"><span className="empty-icon">✳</span><h3>No finds just yet</h3><p>Try another search or explore all products.</p></div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product}/>)}</div>;
}
