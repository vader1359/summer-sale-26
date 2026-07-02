"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-[#fffdfa]">
      <Image
        src="/figma/hero.png"
        alt={t.home.hero.imageAlt}
        width={2880}
        height={1620}
        preload
        className="h-auto w-full object-contain"
        sizes="100vw"
      />
    </section>
  );
}
