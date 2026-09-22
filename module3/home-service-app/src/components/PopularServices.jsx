import { Link } from "react-router-dom";
import categories from "../data/servicesData";
import { getLowestPriceInCategory } from "../utils/helpers";

function PopularServices() {
  return (
    <section className="popular-services">
      <div className="section-header">
        <h2>Popular Services</h2>
        <Link to="/services" className="view-all">
          View all services
        </Link>
      </div>

      <div className="services-grid">
        {categories.map((category) => (
          <Link
            to={`/services/${category.slug}`}
            className="service-card"
            key={category.id}
          >
            <div className="service-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <div className="price-from">
              From ETB {getLowestPriceInCategory(category)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default PopularServices;
