import React from 'react';
import Header from './Header';
import Card from './Card';
import Dish from './Dish';

function Menu() {
  const practiceDishes = [
    { id: 101, name: "Beef Tibs", price: 280, category: "meat", spicy: false },
    { id: 102, name: "Yebeg Wat", price: 310, category: "meat", spicy: true },
    { id: 103, name: "Gomen", price: 120, category: "veggie", spicy: false }
  ];

   // Exercise 4: Filter items by a specific category property
 
  const filterType = "meat";
  const matchedItems = practiceDishes.filter(dish => dish.category === filterType);

  // Exercise 4: Early return empty-state guard check logic
  if (matchedItems.length === 0) {
    return (
      <div className="exercise-layout">
        <Header />
        <p>Empty State: No dishes available matching the "{filterType}" category layout criteria.</p>
      </div>
    );
  }

  return (
    <div className="exercise-layout">
      <Header />
      
      <h3>Showing category: {filterType}</h3>
      <div className="exercise-list">
        {/* Exercise 5: Rendering filtered entries sequentially with unique id tracking keys */}
        {matchedItems.map((item) => (
          <Card key={item.id}>
            <Dish 
              name={item.name} 
              price={item.price} 
              spicy={item.spicy} 
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Menu;
