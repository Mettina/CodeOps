import { useParams, Link } from "react-router-dom";
import categories from "../data/servicesData";

function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <section className="category-page">
        <p>Category not found.</p>
        <Link to="/services">Back to all categories</Link>
      </section>
    );
  }

  return (
    <section className="category-page">
      <div
        className="category-hero"
        style={{ backgroundImage: `url(${category.image})` }}
      >
        <div className="category-hero-content">
          <p className="category-hero-label">SERVICES</p>
          <h1>{category.name}</h1>
          <p>{category.tagline}</p>
        </div>
      </div>

      <div className="category-services-grid">
        {category.services.map((service) => (
          <div className="listing-card" key={service.id}>
            <Link to={`/services/${category.slug}/${service.slug}`}>
              <img
                src={service.image}
                alt={`View ${service.name}`}
                className="listing-image"
              />
            </Link>
            <div className="listing-body">
              <h3>{service.name}</h3>
              <p className="listing-meta">
                ETB {service.price} · {service.duration}
              </p>
              <Link
                to={`/services/${category.slug}/${service.slug}`}
                className="book-btn"
              >
                View Service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryPage;
