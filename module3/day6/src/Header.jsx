import { useCart } from "./cart/CartProvider.jsx";

export default function Header() {
  const { itemCount } = useCart();

  function openCart() {
    window.dispatchEvent(
      new CustomEvent("open-cart")
    );
  }

  return (
    <header className="header">
      <h1>Addis Eats</h1>

      <p>Fresh Ethiopian food</p>

      
    </header>
  );
}