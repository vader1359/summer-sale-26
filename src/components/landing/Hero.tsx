import Image from "next/image";

export function Hero() {
  return (
    <section className="w-full bg-[#fffdfa]">
      <Image
        src="/figma/hero.jpg"
        alt="nanoHome interior"
        width={2880}
        height={1620}
        preload
        className="h-auto w-full object-contain"
        sizes="100vw"
      />
    </section>
  );
}
