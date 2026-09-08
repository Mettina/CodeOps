import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// Exercise 1: ThemeContext holding "light" or "dark", read from a
// deeply nested component (see Dish.jsx, three levels below App).
const ThemeContext = createContext(null);

// Exercise 1: the provider component. Holds the single piece of state
// ("light" | "dark") and a toggler, and exposes both through context so
// no component between here and Dish.jsx needs to know theme exists.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function toggleTheme() {
    setTheme((current) =>
      current === "light" ? "dark" : "light"
    );
  }

  // Memoised for the same reason as CartProvider's value (see the
  // comment there): without this, every ThemeProvider re-render would
  // hand every consumer a brand-new object, forcing them all to
  // re-render even when the theme itself didn't change.
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Exercise 1: the hook a deeply nested component calls to read the
// theme -- no prop drilling through Menu/DishList to get here.
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
