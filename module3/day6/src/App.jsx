import { Routes, Route } from "react-router-dom";
import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<OrderForm />} />
          </Routes>
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}