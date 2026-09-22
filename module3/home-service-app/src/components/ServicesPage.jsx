import { Link } from "react-router-dom";
import categories from "../data/ServicesData"

function ServicesPage() {
  return (
    <section className="services-page">
      <div className="services-page-header">
        <p className="services-page-label">WHAT WE OFFER</p>
        <h1>All Categories</h1>
        <p className="services-page-subtitle">
          Find the right service for your home.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            to={`/services/${category.slug}`}
            className="category-card"
            key={category.id}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p className="category-count">
              {category.services.length} Services
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ServicesPage;
