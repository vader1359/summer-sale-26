"use client";

import Image from "next/image";
import { useRef } from "react";
import { products, type Product } from "@/lib/products";

export function SaleList() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "previous" | "next") => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    carousel.scrollBy({
      left: direction === "next" ? 275 : -275,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#fffdfa] pb-[60px] pt-[60px]">
      <div className="content-shell mb-[75px] flex flex-col items-center gap-4 text-center max-md:mb-10">
        <h2 className="text-[72px] font-semibold uppercase leading-[72px] text-[#ff3401] max-md:text-[48px] max-md:leading-[50px] max-sm:text-[38px]">
          Summer Sale List
        </h2>
        <p className="text-[24px] font-semibold uppercase leading-[25.2px] text-[#1a1a1a] max-sm:text-[18px]">
          Danh sách sản phẩm
        </p>
      </div>

      <div className="content-shell relative">
        <button
          className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-[0_2px_12px_rgba(17,17,17,0.12)] max-md:hidden"
          aria-label="Previous products"
          type="button"
          onClick={() => scrollCarousel("previous")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div
          ref={carouselRef}
          className="scrollbar-none flex gap-6 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory"
        >
          {products.map((product) => (
            <SaleProductCard key={product.id} product={product} />
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#111] shadow-[0_2px_12px_rgba(17,17,17,0.12)] max-md:hidden"
          aria-label="Next products"
          type="button"
          onClick={() => scrollCarousel("next")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}

function SaleProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-[379.2px] w-[251.2px] shrink-0 snap-center flex-col rounded-[8px] bg-[#F7F6F5] shadow-[0_4px_18px_rgba(17,17,17,0.10)]">
      <div className="relative m-4 h-[219.2px] w-[219.2px] overflow-hidden rounded-[6px] bg-[#F7F6F5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-1"
          sizes="220px"
        />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4">
        <BrandLogo brand={product.brand} />
        <h3 className="mt-2 line-clamp-1 text-[16px] font-normal leading-6 text-[#111]">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center gap-4">
          <button className="h-9 rounded-full bg-black px-4 text-[14px] font-semibold leading-4 text-white">
            Nhận ưu đãi
          </button>
          <button className="flex h-9 items-center gap-1 text-[14px] font-semibold leading-4 text-[#111]">
            Nhận tư vấn
            <svg width="5" height="9" viewBox="0 0 5 9" fill="none">
              <path d="m1 1 3 3.5L1 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function BrandLogo({ brand }: { brand: string }) {
  const normalizedBrand = brand.toLowerCase();
  const logo = normalizedBrand.includes("fritz")
    ? "fritz_hansen_black.svg"
    : normalizedBrand.includes("louis")
      ? "louis_poulsen_black.svg"
      : "usm_black.svg";

  return (
    <Image
      src={`/figma/${logo}`}
      alt={brand}
      width={120}
      height={24}
      className="h-6 w-auto object-contain object-left"
    />
  );
}
