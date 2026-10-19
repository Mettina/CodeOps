import Link from "next/link";
import HeroImage from "@/components/HeroImage";

export default function Home() {
  return (
    <section className="intro">
      <HeroImage
        sizes="(max-width: 480px) calc(100vw - 24px), (max-width: 850px) calc(100vw - 32px), (max-width: 1500px) calc(100vw - 48px), 1452px"
      />
      <h1>Addis Eats</h1>
      <p>Ethiopian dishes, cooked fresh and brought to your table.</p>
      <Link className="button" href="/menu">See the menu</Link>
    </section>
  );
}
