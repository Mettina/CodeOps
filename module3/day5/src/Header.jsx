import { useCart } from "./cart/CartProvider.jsx";
import { useTheme } from "./theme/ThemeContext.jsx";
import MenuStats from "./MenuStats.jsx";

// Week 1 project requirement: a header cart badge that reads the cart
// via useContext -- no prop drilling. Previously this component called
// useCart() and destructured itemCount but never rendered it, so the

export default function Header() {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  function openCart() {
    window.dispatchEvent(
      new CustomEvent("open-cart")
    );
  }

  return (
    <header className="header">
      <h1>Addis Eats</h1>

      <p>Fresh Ethiopian food</p>

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