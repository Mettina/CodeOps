import Link from 'next/link';

const dishData = [
	{ slug: 'margherita', name: 'Margherita Pizza' },
	{ slug: 'carbonara', name: 'Spaghetti Carbonara' },
	{ slug: 'caesar', name: 'Caesar Salad' },
];

async function getDishes() {
	return dishData;
}

export default async function MenuPage() {
	const dishes = await getDishes();

	return (
		<main>
			<h1>Menu</h1>
			<ul>
				{dishes.map((dish) => (
					<li key={dish.slug}>
						<Link href={`/menu/${dish.slug}`}>{dish.name}</Link>
					</li>
				))}
			</ul>
		</main>
	);
}