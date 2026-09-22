import { useState } from "react";
import { useNavigate } from "react-router-dom";

import heroImage from "../assets/hero.jpg";
function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

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

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="What service are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
