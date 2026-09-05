// Exercise 3: Create a Dish component
export default function Dish({ name, price }) {
  return (
    <div className="dish">
      <h3>{name}</h3>
      <p>{price} ETB</p>
    </div>
  );
}
