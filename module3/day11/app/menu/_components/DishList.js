import Link from 'next/link';

const dishes = [
  { id: 1, name: 'Margherita Pizza' },
  { id: 2, name: 'Pepperoni Pizza' },
  { id: 3, name: 'Cola' },
  { id: 4, name: 'Ice Cream' },
];

export default function DishList() {
  return (
    <ul>
      {dishes.map((dish) => (
        <li key={dish.id}>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </li>
      ))}
    </ul>
  );
}