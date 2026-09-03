import React from 'react';
import Header from './Header';
import Dish from './Dish';

function Day1MiniProject() {
  // Static array of dish objects with unique keys
  const menuItems = [
    { id: 1, name: "Doro Wat", price: 240 },
    { id: 2, name: "Injera Fitfit", price: 150 },
    { id: 3, name: "Kitfo", price: 320 },
    { id: 4, name: "Shiro Wat", price: 130 },
    { id: 5, name: "Tibs", price: 280 }
  ];

  return (
    <div className="app-container">
      {/* Component Composition */}
      <Header />
      
      {/* Dynamic list rendering using map and unique keys */}
      <main className="menu-grid">
        {menuItems.map((dish) => (
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

export default Day1MiniProject;
