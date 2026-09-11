import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h2>Welcome to Addis Eats</h2>
      <p>Authentic Ethiopian dishes, delivered fresh to your door.</p>
      <Link to="/menu" className="cta-button">
        Browse the Menu
      </Link>
    </div>
  );
}