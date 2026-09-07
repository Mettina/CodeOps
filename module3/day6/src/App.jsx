import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";

export default function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Menu />
        <OrderForm />
      </div>
    </CartProvider>
  );
}