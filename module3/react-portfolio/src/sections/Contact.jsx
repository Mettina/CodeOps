import ContactForm from '../components/ContactForm.jsx';
import { GithubIcon, LinkedinIcon, TwitterIcon, EmailIcon, PhoneIcon, PinIcon } from '../components/icons.jsx';

export default function Contact() {
  return (
    <section className="panel-section contact-section" id="contact">
      <div className="contact-grid">
        <div className="contact-info">
          <p className="section-eyebrow">✦ GET IN TOUCH</p>
          <h2 className="section-title">Let&apos;s talk about your project</h2>
          <p className="section-body">
            Have something in mind? Send a few details and I&apos;ll get back to you within a
            day or two.
          </p>

          <ul className="contact-list">
            <li>
              <span className="contact-icon">
                <EmailIcon width="18" height="18" />
              </span>
              <div>
                <p className="contact-label">Email</p>
                <p className="contact-value">metagesasebecs.@gmail.com</p>
              </div>
            </li>
            <li>
              <span className="contact-icon">
                <PhoneIcon width="18" height="18" />
              </span>
              <div>
                <p className="contact-label">Phone</p>
                <p className="contact-value">+251 956691899</p>
              </div>
            </li>
            <li>
              <span className="contact-icon">
                <PinIcon width="18" height="18" />
              </span>
              <div>
                <p className="contact-label">Location</p>
                <p className="contact-value">Addis Ababa, Ethiopia</p>
              </div>
            </li>
          </ul>

          <div className="socials contact-socials">
            <a className="icon-btn" href="https://github.com/Mettina" aria-label="GitHub" title="GitHub">
              <GithubIcon width="16" height="16" />
            </a>
            <a
               className="icon-btn"
               href="https://www.linkedin.com/in/metages-asebe-7248223a2?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
               rel="noopener noreferrer"
>
              <LinkedinIcon width="16" height="16" />
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
