import Link from 'next/link';

export default function HomePage() {
	return (
		<main>
			<h1>Welcome to Day 13</h1>
			<Link href="/menu">View the menu</Link>
		</main>
	);
}
