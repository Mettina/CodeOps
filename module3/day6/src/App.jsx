import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Menu />} />
            <Route path="menu" element={<Menu />} />
            <Route path="cart" element={<OrderForm />} />
          </Route>
        </Routes>
      </CartProvider>
    </ThemeProvider>
  );
}