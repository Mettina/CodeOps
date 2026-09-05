import { useState } from "react";

const TELEBIRR_PATTERN = /^(?:\+251|0)9\d{8}$/;

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const phoneIsValid = TELEBIRR_PATTERN.test(form.phone);
  const canSubmit = form.name.trim() !== "" && form.area.trim() !== "" && phoneIsValid;

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Delivery details</h2>

      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
      </label>

      <label>
        TeleBirr number
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="0911223344 or +251911223344"
        />
        {form.phone.length > 0 && (
          <span className={phoneIsValid ? "hint hint-ok" : "hint hint-bad"}>
            {phoneIsValid ? "Looks good" : "Enter a valid TeleBirr number"}
          </span>
        )}
      </label>

      <label>
        Delivery area
        <input name="area" value={form.area} onChange={handleChange} placeholder="e.g. Bole" />
      </label>

      <button type="submit" disabled={!canSubmit}>
        Place order
      </button>

      {submitted && (
        <p className="confirmation">
          Thanks, {form.name.trim()} — your order is on its way to {form.area.trim()}.
        </p>
      )}
    </form>
  );
}
