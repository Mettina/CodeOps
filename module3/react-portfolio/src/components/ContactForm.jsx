import { useState } from 'react';
import { SendIcon } from './icons.jsx';

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

function isValidEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: null, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((errs) => ({ ...errs, [name]: false }));
  };

  const validate = () => {
    const nextErrors = {
      name: values.name.trim() === '',
      email: values.email.trim() === '' || !isValidEmail(values.email),
      subject: values.subject.trim() === '',
      message: values.message.trim() === '',
    };
    setErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fill in every field with a valid value.' });
      return;
    }

    setSubmitting(true);

    // Simulated send — replace with a real request, e.g.:
    // fetch('https://your-endpoint', { method: 'POST', body: JSON.stringify(values) })
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ type: 'success', message: "Message sent — thanks! I'll reply within a day or two." });
      setValues(EMPTY_FORM);
    }, 900);
  };

  const fieldClass = (name) => `form-field${errors[name] ? ' invalid' : ''}`;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className={fieldClass('name')}>
          <label htmlFor="cf-name">Name</label>
          <input
            type="text"
            id="cf-name"
            name="name"
            placeholder="Your name"
            value={values.name}
            onChange={handleChange}
            required
          />
          <span className="field-error">Enter your name</span>
        </div>
        <div className={fieldClass('email')}>
          <label htmlFor="cf-email">Email</label>
          <input
            type="email"
            id="cf-email"
            name="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={handleChange}
            required
          />
          <span className="field-error">Enter a valid email</span>
        </div>
      </div>

      <div className={fieldClass('subject')}>
        <label htmlFor="cf-subject">Subject</label>
        <input
          type="text"
          id="cf-subject"
          name="subject"
          placeholder="What's this about?"
          value={values.subject}
          onChange={handleChange}
          required
        />
        <span className="field-error">Enter a subject</span>
      </div>

      <div className={fieldClass('message')}>
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          rows="5"
          placeholder="Tell me a bit about your project..."
          value={values.message}
          onChange={handleChange}
          required
        />
        <span className="field-error">Enter a message</span>
      </div>

      <button className="btn-primary form-submit" type="submit" disabled={submitting}>
        <span className="submit-label">{submitting ? 'Sending...' : 'Send Message'}</span>
        <SendIcon width="16" height="16" />
      </button>

      <p className={`form-status${status.type ? ` ${status.type}` : ''}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
