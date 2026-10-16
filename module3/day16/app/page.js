import Link from "next/link";

export default function Home() {
  return (
    <section className="intro">
      <h1>Addis Eats</h1>
      <p>Ethiopian dishes, cooked fresh and brought to your table.</p>
      <Link className="button" href="/menu">See the menu</Link>
    </section>
  );
}
