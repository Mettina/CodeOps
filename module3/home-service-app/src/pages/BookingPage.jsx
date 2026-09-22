import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import categories from "../data/ServicesData";
import { phonePattern, emailPattern } from "../utils/validate";

function BookingPage() {
  const { slug, serviceSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = categories.find((c) => c.slug === slug);
  const service = category?.services.find((s) => s.slug === serviceSlug);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    address: "",
    notes: "",
    paymentMethod: "cash",
  });
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("betengaSession")) {
      navigate("/login", {
        replace: true,
        state: { redirectTo: location.pathname },
      });
    }
  }, [location.pathname, navigate]);

  if (!category || !service) {
    return (
      <section className="booking-page">
        <p>Service not found.</p>
        <Link to="/services">Back to all categories</Link>
      </section>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailPattern.test(form.email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    if (!phonePattern.test(form.phone)) {
      setPhoneError(
        "Enter a valid phone number: 09XXXXXXXX, 07XXXXXXXX, or +2519XXXXXXXX."
      );
      return;
    }

    setEmailError("");
    setPhoneError("");
    setSubmitted(true);
  };

  if (submitted) {
    const paymentLabels = {
      cash: "Cash on Service",
      telebirr: "Telebirr",
      bank: "Bank Transfer",
    };

    return (
      <section className="booking-page">
        <div className="booking-confirmed">
          <h1>Booking Confirmed!</h1>
          <p>Your service has been booked successfully.</p>

          <div className="confirm-details">
            <div>
              <span>Service</span>
              <strong>{service.name}</strong>
            </div>
            <div>
              <span>Date & Time</span>
              <strong>
                {form.date} · {form.time}
              </strong>
            </div>
            <div>
              <span>Address</span>
              <strong>{form.address}</strong>
            </div>
            <div>
              <span>Total Price</span>
              <strong>{service.price} ETB</strong>
            </div>
            <div>
              <span>Payment Method</span>
              <strong>{paymentLabels[form.paymentMethod]}</strong>
            </div>
          </div>

          <Link to="/" className="book-btn-large">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="booking-page">
      <div className="booking-summary">
        <h2>{service.name}</h2>
        <p>
          {service.price} ETB · {service.duration}
        </p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            placeholder="Enter ur name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          {emailError && <span className="field-error">{emailError}</span>}
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            name="phone"
            placeholder="09XXXXXXXX, 07XXXXXXXX or +2519XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            required
          />
          {phoneError && <span className="field-error">{phoneError}</span>}
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Time
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Address
          <input
            type="text"
            name="address"
            placeholder="Enter your full address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Notes (optional)
          <textarea
            name="notes"
            placeholder=" special instructions..."
            value={form.notes}
            onChange={handleChange}
          />
        </label>

        <label>
          Payment Method
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={form.paymentMethod === "cash"}
                onChange={handleChange}
              />
              Cash on Service
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="telebirr"
                checked={form.paymentMethod === "telebirr"}
                onChange={handleChange}
              />
              Telebirr
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={form.paymentMethod === "bank"}
                onChange={handleChange}
              />
              Bank Transfer
            </label>
          </div>
        </label>

        <button type="submit" className="book-btn-large">
          Confirm Booking
        </button>
      </form>
    </section>
  );
}

export default BookingPage;
