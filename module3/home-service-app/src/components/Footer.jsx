import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className="site-footer">
			<div className="footer-main">
				<div className="footer-brand">
					<Link to="/" className="footer-logo">
						<span>🏠</span>
						<span>BETENGA</span>
					</Link>
					<p>
						Trusted home services that make everyday life more comfortable.
					</p>
				</div>

				<div className="footer-column">
					<h3>Explore</h3>
					<Link to="/services">Services</Link>
					<Link to="/about">About us</Link>
					<Link to="/contact">Contact</Link>
				</div>

				<div className="footer-column footer-contact">
					<h3>Contact us</h3>
					<a href="mailto:betengaservice@gmail.com">betengaservice@gmail.com</a>
					<a href="tel:+251911234567">+251 911 234 567</a>
					<a
						href="https://maps.google.com/?q=Addis+Ababa,Ethiopia"
						target="_blank"
						rel="noreferrer"
					>
						Addis Ababa, Ethiopia
					</a>
				</div>

				<div className="footer-action">
					<h3>Need a hand at home?</h3>
					<Link to="/services" className="footer-button">
						Find a service 
					</Link>
				</div>
			</div>

			<div className="footer-bottom">
				<span>© 2026 Betenga. All rights reserved.</span>
				<span>Made for better homes.</span>
			</div>
		</footer>
	);
}

export default Footer;
