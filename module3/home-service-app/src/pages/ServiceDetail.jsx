import { useParams, Link, useNavigate } from "react-router-dom";
import categories from "../data/servicesData";

function ServiceDetail() {
  const { slug, serviceSlug } = useParams();
  const navigate = useNavigate();
  const category = categories.find((c) => c.slug === slug);
  const service = category?.services.find((s) => s.slug === serviceSlug);

  const bookingPath = `/booking/${slug}/${serviceSlug}`;

  const handleBookNow = () => {
    const destination = localStorage.getItem("betengaSession")
      ? bookingPath
      : "/login";

    navigate(destination, {
      state: destination === "/login" ? { redirectTo: bookingPath } : undefined,
    });
  };

  if (!category || !service) {
    return (
      <section className="service-detail">
        <p>Service not found.</p>
        <Link to="/services">Back to all categories</Link>
      </section>
    );
  }

  return (
    <section className="service-detail">
      <div className="breadcrumb">
        <Link to="/services">Services</Link> ›{" "}
        <Link to={`/services/${category.slug}`}>{category.name}</Link> ›{" "}
        {service.name}
      </div>

      <div className="detail-layout">
        <img src={service.image} alt={service.name} className="detail-image" />

        <div className="detail-info">
          <h1>{service.name}</h1>
          <p className="detail-price">
            {service.price} ETB · {service.duration}
          </p>

          {service.provider && (
            <p className="detail-provider">by {service.provider}</p>
          )}

          <button
            type="button"
            onClick={handleBookNow}
            className="book-btn-large"
          >
            Book Now
          </button>

          <div className="detail-section">
            <h3>About this service</h3>
            <p>{service.description}</p>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="detail-section">
              <h3>Features</h3>
              <ul className="feature-list">
                {service.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ServiceDetail;
