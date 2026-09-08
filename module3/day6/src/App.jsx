import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import NotFound from "./NotFound.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import DishDetail from "./DishDetail.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<DishDetail />} />
          <Route path="cart" element={<OrderForm />} />
          <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

      </CartProvider>
    </ThemeProvider>
  );
}