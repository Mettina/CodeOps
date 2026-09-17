import heroImage from "../assets/hero.jpg";

function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <p className="hero-small-title">WELCOME TO BETENGA</p>

        <h1>
          Your Home.
          <br />
          Our Priority.
        </h1>

        <p className="hero-description">
          Trusted professionals for a cleaner, safer,
          <br />
          and more comfortable home.
        </p>

        <div className="search-box">
          <select>
            <option>Select a service</option>
            <option>Cleaning</option>
            <option>Painting</option>
            <option>Cooking</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Maintenance</option>
          </select>

          <input
            type="text"
            placeholder="Enter your location"
          />

          <button>Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;