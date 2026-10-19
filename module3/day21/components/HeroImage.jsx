import Image from "next/image";

export default function HeroImage({ sizes }) {
  return (
    <Image
      className="hero-image"
      src="/img/doro wot.jpg"
      alt="Ethiopian doro wot with injera"
      width={735}
      height={490}
      sizes={sizes}
      priority
      fetchPriority="high"
    />
  );
}
