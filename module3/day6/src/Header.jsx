import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "./cart/CartProvider.jsx";
import { useTheme } from "./theme/ThemeContext.jsx";
import MenuStats from "./MenuStats.jsx";

export default function Header() {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function openCart() {
    navigate("/cart");
  }

  return (
    <header className="header">
      <Link to="/" className="logo-link">
        <h1>Addis Eats</h1>
      </Link>

      <p>Fresh Ethiopian food</p>

      <nav className="main-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Menu
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Cart
        </NavLink>
        <NavLink
          to="/checkout"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Checkout
        </NavLink>
      </nav>

      <MenuStats />

      <div className="header-actions">

        <button
          className="cart-badge"
          onClick={openCart}
        >
           Cart
          <span>{itemCount}</span>
        </button>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

      </div>
    </header>
  );
}