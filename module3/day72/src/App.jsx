import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Menu from "./Menu.jsx";
import DishDetail from "./DishDetail.jsx";
import OrderForm from "./OrderForm.jsx";
import Checkout from "./Checkout.jsx";
import SignIn from "./SignIn.jsx";
import NotFound from "./NotFound.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import RequireAuth from "./auth/RequireAuth.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:id" element={<DishDetail />} />
            <Route path="cart" element={<OrderForm />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="checkout"
              element={
                <RequireAuth>
                  <Checkout />
                </RequireAuth>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}