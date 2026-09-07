import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Contact Us</h2>

      <div className="checkout-grid">
        <div className="checkout-card">
          <h4>Get in Touch</h4>
          <p className="about-text">Addis Ababa, Ethiopia</p>
          <p className="about-text">mettinaskincare@gmail.com</p>
          <p className="about-text">+251 956691899</p>
        </div>

        <div className="checkout-card">
          <h4>Send a Message</h4>

          {submitted ? (
            <>
              <p className="about-text">Thanks — your message has been noted.</p>
    
            </>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <label>
                Name
                <input
                  type="text"
                    value={form.name}
                    placeholder="selamawit"
                  onChange={handleChange("name")}
                  required
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                    value={form.email}
                    placeholder="example@gmail.com"
                  onChange={handleChange("email")}
                  required
                />
              </label>
              <label>
                Message
                <textarea
                  rows="4"
                    value={form.message}
                    placeholder="your message please"
                  onChange={handleChange("message")}
                  required
                />
              </label>
              <button className="place-order-btn" type="submit">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
