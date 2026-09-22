import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem("betengaSession");
        setUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setUser(null);
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    window.addEventListener("betengaAuthChange", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("betengaAuthChange", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("betengaSession");
    setUser(null);
    window.dispatchEvent(new Event("betengaAuthChange"));
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span>🏠</span>
        <span>BETENGA</span>
      </Link>

      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links${menuOpen ? " menu-open" : ""}`}>
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/services" onClick={() => setMenuOpen(false)}>
          Services
        </NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>
          About
        </NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>
      </div>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="welcome-user">Welcome, {user.fullName}</span>
            <button type="button" className="login-btn" onClick={handleLogout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
