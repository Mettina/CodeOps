import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import OrderForm from "./OrderForm.jsx";
import { CartProvider } from "./cart/CartProvider.jsx";
import { ThemeProvider } from "./theme/ThemeContext.jsx";

// Exercise 1: ThemeProvider wraps the whole tree here, at the top --
// Dish.jsx (App > Menu > DishList > Dish) reads it three levels down
// with useTheme(), no props passed through Menu or DishList at all.
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="app">
          <Header />
          <Menu />
          <OrderForm />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}