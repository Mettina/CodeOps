import { useSearchParams, Link } from "react-router-dom";
import categories from "../data/servicesData";

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = [];
  categories.forEach((category) => {
    category.services.forEach((service) => {
      const haystack = `${service.name} ${service.description} ${category.name}`.toLowerCase();
      if (haystack.includes(query.toLowerCase())) {
        results.push({ ...service, categorySlug: category.slug });
      }
    });
  });

  return (
    <section className="category-page">
      <div className="category-page-header">
        <h1>Search results</h1>
        <p>
          {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
        </p>
      </div>

      {results.length === 0 ? (
        <div style={{ textAlign: "center", color: "#6b7280" }}>
          <p>No services matched your search.</p>
          <Link to="/services">Browse all categories</Link>
        </div>
      ) : (
        <div className="category-services-grid">
          {results.map((service) => (
            <div className="listing-card" key={service.id}>
              <Link to={`/services/${service.categorySlug}/${service.slug}`}>
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
                  to={`/services/${service.categorySlug}/${service.slug}`}
                  className="book-btn"
                >
                  View Service
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchResultsPage;
