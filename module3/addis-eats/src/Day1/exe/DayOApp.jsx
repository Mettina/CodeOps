import React from 'react';
import Header from './Header';
import Dish from './Dish';

export default function App() {
  // 1. Create the array of dish data objects
  const dishes = [
    { id: 1, name: "Doro Wot", price: " 250.00" },
    { id: 2, name: "Shero", price: " 180.00" },
    { id: 3, name: "Kitfo", price: " 300.00" },
    { id: 4, name: "Firfer", price: " 200.00" }
  ];

  return (
    <div >
      <Header />
      
      <h2>Our Featured Specialties</h2>
      
      {/* 2. Use .map() to loop through the array dynamically */}
      <main>
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
