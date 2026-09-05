// Exercise 4: Import the Header and Dish components
import Header from "./Header.jsx";
import Dish from "./Dish.jsx";

// Exercise 5: Import the dishes array
import { dishes } from "./data.js";

export default function App() {
  return (
    <div className="app">

      {/* Exercise 4: Compose the Header component */}
      <Header />

      {/* Exercise 5: Render the dishes array using map()
          Each dish uses its unique id as the key */}
      <main className="menu">
        {dishes.map((dish) => (
          <Dish
            key={dish.id}
            name={dish.name}
            price={dish.price}
          />
        ))}
      </main>

    </div>
  );
}