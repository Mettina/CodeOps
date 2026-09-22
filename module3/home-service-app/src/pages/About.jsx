import { Link } from "react-router-dom";
import homeImage from "../assets/hero.jpg";

const values = [
	{
		icon: "✓",
		title: "People you can trust",
		description:
			"Every service starts with professionals who care about the work and the homes they enter.",
	},
	{
		icon: "◷",
		title: "Simple from start to finish",
		description:
			"Find the right help, choose a time that works, and keep your day moving without the back and forth.",
	},
	{
		icon: "⌂",
		title: "Care that feels personal",
		description:
			"Your home is not a checklist. We make room for the details that make your space yours.",
	},
];

function About() {
	return (
		<main className="about-page">
			<section className="about-hero">
				<div className="about-hero-content">
					<p className="about-label">ABOUT BETENGA</p>
					<h1>Good help makes home feel lighter.</h1>
					<p className="about-intro">
						Betenga connects you with dependable people for the everyday work
						that keeps your home comfortable, cared for, and ready for life.
					</p>
					<Link to="/services" className="about-primary-action">
						Explore our services
					</Link>
				</div>
				<div className="about-hero-image-wrap">
					<img src={homeImage} alt="A welcoming, well-kept home" />
					<div className="about-image-note">
						<strong>Home, made easier.</strong>
						<span>One trusted service at a time.</span>
					</div>
				</div>
			</section>

			<section className="about-story">
				<div className="about-story-heading">
					<p className="about-label">WHY WE EXIST</p>
					<h2>More time for the parts of home that matter.</h2>
				</div>
				<div className="about-story-copy">
					<p>
						There is always something to fix, clean, prepare, or improve at
						home. Betenga was created to make finding reliable help feel less
						like a chore.
					</p>
					<p>
						From a quick repair to regular home care, we bring useful services
						into one calm, straightforward place. You get more confidence in
						who you invite in, and more time back in your day.
					</p>
				</div>
			</section>

			<section className="about-values" aria-labelledby="about-values-heading">
				<div className="about-section-heading">
					<p className="about-label">THE BETENGA WAY</p>
					<h2 id="about-values-heading">Built around how home really works.</h2>
				</div>
				<div className="about-values-grid">
					{values.map((value) => (
						<article className="about-value-card" key={value.title}>
							<div className="about-value-icon" aria-hidden="true">
								{value.icon}
							</div>
							<h3>{value.title}</h3>
							<p>{value.description}</p>
						</article>
					))}
				</div>
			</section>

			<section className="about-cta">
				<div>
					<p className="about-label">READY WHEN YOU ARE</p>
					<h2>Let’s make your next home task the easy one.</h2>
				</div>
				<Link to="/services" className="about-secondary-action">
					Find a service 
				</Link>
			</section>
		</main>
	);
}

export default About;
