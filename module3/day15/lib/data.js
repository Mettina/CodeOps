// Data layer. Server only: never import this file from a client component.
const dishes = [
  { id: 1, name: "Doro Wot", price: 240, category: "Main", description: "Slow-cooked chicken stew in spiced berbere sauce with a boiled egg, served with injera.", image: "/img/doro wot.jpg" },
  { id: 2, name: "Kitfo", price: 260, category: "Main", description: "Minced beef seasoned with mitmita and spiced butter.", image: "/img/kitfo.jpg" },
  { id: 3, name: "Shiro", price: 150, category: "Main", description: "Creamy chickpea stew simmered with garlic and berbere.", image: "/img/shiro wot.jpg" },
  { id: 4, name: "Chechebsa", price: 120, category: "Breakfast", description: "Pan-fried flatbread pieces tossed in spiced butter and berbere.", image: "/img/chechebsa.jpg" },
  { id: 5, name: "Fetira", price: 100, category: "Breakfast", description: "Flaky layered flatbread served with honey or eggs.", image: "/img/fetira.jpg" },
  { id: 6, name: "Firfir", price: 130, category: "Breakfast", description: "Shredded injera soaked in a spicy sauce.", image: "/img/firfir.jpg" },
  { id: 7, name: "Tibs", price: 230, category: "Lunch", description: "Sauteed beef with onions, peppers and rosemary.", image: "/img/tibs.jpg" },
  { id: 8, name: "Beyaynetu", price: 180, category: "Lunch", description: "A fasting platter of assorted vegetarian stews on injera.", image: "/img/beyaynet.jpg" },
  { id: 9, name: "Vegetable Pasta", price: 160, category: "Lunch", description: "Pasta with seasonal vegetables in a light tomato sauce.", image: "/img/pasta.jpg" },
  { id: 10, name: "Special Doro Wot", price: 280, category: "Dinner", description: "Our doro wot with extra chicken and two eggs.", image: "/img/specialdoro.jpg" },
  { id: 11, name: "Special Tibs", price: 260, category: "Dinner", description: "Sizzling tibs served on a hot clay dish.", image: "/img/specialtibs.jpg" },
  { id: 12, name: "Gored Gored", price: 270, category: "Dinner", description: "Cubed raw beef in spiced butter and mitmita.", image: "/img/goredgored.jpg" },
  { id: 13, name: "Fresh Mango Juice", price: 80, category: "Drinks", description: "Pressed to order.", image: "/img/mangojuice.jpg" },
  { id: 14, name: "Avocado Juice", price: 90, category: "Drinks", description: "Thick layered avocado and lime juice.", image: "/img/avocadojuice.jpg" },
  { id: 15, name: "Macchiato", price: 70, category: "Drinks", description: "Ethiopian espresso with steamed milk.", image: "/img/Macchiato.jpg" },
  { id: 16, name: "Margherita Pizza", price: 280, category: "Pizza", description: "Tomato, mozzarella and basil.", image: "/img/margaritapizaa.jpg" },
  { id: 17, name: "Chicken Pizza", price: 320, category: "Pizza", description: "Grilled chicken, peppers and mozzarella.", image: "/img/chickenpizaa.jpg" },
  { id: 18, name: "Vegetable Pizza", price: 260, category: "Pizza", description: "Seasonal vegetables and mozzarella.", image: "/img/vegitablepizza.jpg" },
  { id: 19, name: "Classic Burger", price: 220, category: "Burger", description: "Beef patty, lettuce, tomato and house sauce.", image: "/img/cheese burger.jpg" },
  { id: 20, name: "Chicken Burger", price: 240, category: "Burger", description: "Crispy chicken fillet with slaw.", image: "/img/chickenburger.jpg" },
  { id: 21, name: "Cheese Burger", price: 250, category: "Burger", description: "Beef patty with melted cheddar.", image: "/img/cheese burger.jpg" },
];

const reviews = [
  { id: 1, dishId: 1, author: "Selam", text: "Rich and properly spicy." },
  { id: 2, dishId: 1, author: "Dawit", text: "Best doro wot near Bole." },
  { id: 3, dishId: 2, author: "Hana", text: "Fresh and well seasoned." },
  { id: 4, dishId: 7, author: "Biruk", text: "Tender and juicy." },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const categories = ["Main", "Breakfast", "Lunch", "Dinner", "Drinks", "Pizza", "Burger"];

export async function getDishes() {
  await wait(300);
  return dishes;
}

export async function getDish(id) {
  await wait(300);
  return dishes.find((d) => d.id === Number(id)) ?? null;
}

export async function getReviews(id) {
  await wait(600);
  return reviews.filter((r) => r.dishId === Number(id));
}
