import { Link } from "react-router-dom";

const contactDetails = [
	{
		icon: "✉",
		label: "Email us",
		value: "betegaservice@gmail.com",
		href: "mailto:betegaservice@gmail.com",
	},
	{
		icon: "☎",
		label: "Call us",
		value: "+251 911 234 567",
		href: "tel:+251911234567",
	},
	{
		icon: "⌖",
		label: "Visit us",
		value: "Addis Ababa, Ethiopia",
		href: "https://maps.google.com/?q=Addis+Ababa,Ethiopia",
	},
];

function Contact() {
	return (
		<main className="contact-page">
			<section className="contact-hero">
				<div className="contact-hero-copy">
					<p className="contact-label">GET IN TOUCH</p>
					<h1>We’re here to make home easier.</h1>
					<p>
						Have a question about a service, a booking, or finding the right
						help for your home? Reach out and the Betenga team will be happy to
						help.
					</p>
				</div>
				<div className="contact-hero-mark" aria-hidden="true">
					<span>✦</span>
					<strong>Let&apos;s talk</strong>
				</div>
			</section>

			<section className="contact-content">
				<div className="contact-details">
					<p className="contact-label">CONTACT DETAILS</p>
					<h2>Choose the easiest way to reach us.</h2>
					<div className="contact-detail-list">
						{contactDetails.map((detail) => (
							<a
								className="contact-detail"
								href={detail.href}
								key={detail.label}
								target={detail.label === "Visit us" ? "_blank" : undefined}
								rel={detail.label === "Visit us" ? "noreferrer" : undefined}
							>
								<span className="contact-detail-icon" aria-hidden="true">
									{detail.icon}
								</span>
								<span>
									<strong>{detail.label}</strong>
									<span>{detail.value}</span>
								</span>
							</a>
						))}
					</div>
				</div>

				<div className="contact-message">
					<p className="contact-label">START HERE</p>
					<h2>Looking for a service?</h2>
					<p>
						Browse cleaning, repair, painting, electrical, plumbing, and home
						cooking services available through Betenga.
					</p>
					<Link to="/services" className="contact-action">
						Explore services 
					</Link>
				</div>
			</section>
		</main>
	);
}

export default Contact;
