import React from 'react';

// Using destructuring inside the function arguments ({ name, price }) 
// allows us to use the variables directly without writing "props.name"
export default function Dish({ name, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ETB{price}</p>
    </div>
  );
}
