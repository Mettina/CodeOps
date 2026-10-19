import Link from "next/link";

export default function CategoryCard({ category, index = 0 }) {
  return <Link href={`/${category.slug}`} className={`category-card category-tone-${index % 3}`}><img src={category.image} alt={category.name} loading="lazy" decoding="async" width="900" height="600"/><div className="category-overlay"><span>EXPLORE</span><h3>{category.name}</h3><p>{category.description}</p></div><span className="category-arrow">↗</span></Link>;
}
