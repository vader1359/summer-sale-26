"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import productData from "../summer26/products.json";

type AdminProduct = {
  category: string;
  sku: string;
  short_name: string;
  product_name: string;
  retail_price: number;
  preorder_price: number;
  image: string;
};

type BrandFilter = "all" | "fritzHansen" | "usm" | "louisPoulsen";

const PRODUCTS = productData as AdminProduct[];

const BRAND_LOGOS: Partial<Record<BrandFilter, { src: string; alt: string; width: number; height: number; className: string }>> = {
  usm: {
    src: "/figma/usm_black.svg",
    alt: "USM",
    width: 128,
    height: 32,
    className: "h-6 w-auto object-contain object-left",
  },
  fritzHansen: {
    src: "/figma/fritz_hansen_black.svg",
    alt: "Fritz Hansen",
    width: 120,
    height: 24,
    className: "h-6 w-auto object-contain",
  },
  louisPoulsen: {
    src: "/figma/louis_poulsen_black.svg",
    alt: "Louis Poulsen",
    width: 132,
    height: 24,
    className: "h-6 w-auto object-contain",
  },
};

function getProductBrand(sku: string): BrandFilter {
  if (sku.startsWith("USMUS")) return "usm";
  if (sku.startsWith("CHRFR") || sku.startsWith("CHRFH") || sku.startsWith("TBLFH")) return "fritzHansen";
  if (sku.startsWith("LTLLP") || sku.startsWith("LPLLP")) return "louisPoulsen";
  return "all";
}

function formatVndPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("₫", "vnd");
}

function getDiscountPercent(retailPrice: number, preorderPrice: number): number {
  if (retailPrice <= 0) return 0;
  return Math.round((1 - preorderPrice / retailPrice) * 100);
}

export default function SoldAdminPage() {
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [query, setQuery] = useState("");
  const [soldSkus, setSoldSkus] = useState<Set<string>>(() => new Set());
  const [error, setError] = useState("");
  const [menu, setMenu] = useState<{ sku: string; x: number; y: number } | null>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const suppressNextClickRef = useRef(false);

  useEffect(() => {
    fetch("/api/summer26/sold-status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { soldSkus?: unknown }) => {
        if (Array.isArray(data.soldSkus)) {
          setSoldSkus(new Set(data.soldSkus.filter((sku): sku is string => typeof sku === "string")));
        }
      })
      .catch(() => setError("Database is not connected."));
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenu(null);
    window.addEventListener("click", closeMenu);
    return () => {
      window.removeEventListener("click", closeMenu);
      if (longPressTimerRef.current) {
        window.clearTimeout(longPressTimerRef.current);
      }
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesBrand = brand === "all" || getProductBrand(product.sku) === brand;
      if (!matchesBrand) return false;
      if (!normalizedQuery) return true;
      return [product.sku, product.short_name, product.product_name, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [brand, query]);

  const clearLongPressTimer = () => {
    if (!longPressTimerRef.current) return;
    window.clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = null;
  };

  const setSold = async (sku: string, sold: boolean) => {
    setMenu(null);
    setError("");
    const previous = new Set(soldSkus);
    const next = new Set(soldSkus);
    if (sold) {
      next.add(sku);
    } else {
      next.delete(sku);
    }
    setSoldSkus(next);

    const response = await fetch("/api/summer26/sold-status", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sku, sold }),
    });

    if (!response.ok) {
      setSoldSkus(previous);
      setError("Could not save. Check the database connection.");
      return;
    }

    const data = (await response.json()) as { soldSkus?: unknown };
    if (Array.isArray(data.soldSkus)) {
      setSoldSkus(new Set(data.soldSkus.filter((item): item is string => typeof item === "string")));
    }
  };

  const brands: { id: BrandFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "fritzHansen", label: "Fritz Hansen" },
    { id: "usm", label: "USM" },
    { id: "louisPoulsen", label: "Louis Poulsen" },
  ];

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#dddddd] bg-white">
        <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-[60px]">
          <h1 className="text-[20px] font-semibold">Sold admin</h1>
          <Link href="/summer26-list-preview" className="bg-black px-4 py-2 text-[13px] font-semibold text-white">
            Preview
          </Link>
        </div>
        <div className="flex flex-col gap-4 border-t border-[#eeeeee] px-5 py-4 sm:px-8 lg:px-[60px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search SKU or product"
            className="h-11 w-full border border-[#D8D8D8] px-3 text-[14px] outline-none transition focus:border-[#111111] sm:max-w-[360px]"
          />
          <div className="flex flex-wrap items-center gap-7 sm:gap-12">
            {brands.map((item) => {
              const logo = BRAND_LOGOS[item.id];
              const isSelected = brand === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setBrand(item.id)}
                  className={`flex min-h-9 items-center justify-center text-[13px] font-medium transition sm:text-[14px] ${
                    isSelected ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {logo ? (
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className={logo.className}
                      style={{ width: "auto" }}
                    />
                  ) : (
                    item.label
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <section className="grid w-full grid-cols-2 gap-0 divide-x divide-y divide-[#E5E5E5] md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {error && (
          <div className="col-span-full bg-[#930000] px-5 py-3 text-[13px] font-semibold text-white sm:px-8 lg:px-[60px]">
            {error}
          </div>
        )}
        {filteredProducts.map((product) => {
          const isSold = soldSkus.has(product.sku);
          const discountPercent = getDiscountPercent(product.retail_price, product.preorder_price);
          const brandLogo = BRAND_LOGOS[getProductBrand(product.sku)];

          return (
            <article
              key={product.sku}
              onContextMenu={(event) => {
                event.preventDefault();
                setMenu({ sku: product.sku, x: event.clientX, y: event.clientY });
              }}
              onClick={(event) => {
                if (!suppressNextClickRef.current) return;
                suppressNextClickRef.current = false;
                event.preventDefault();
                event.stopPropagation();
              }}
              onTouchStart={(event) => {
                clearLongPressTimer();
                const touch = event.touches[0];
                longPressTimerRef.current = window.setTimeout(() => {
                  suppressNextClickRef.current = true;
                  setMenu({ sku: product.sku, x: touch.clientX, y: touch.clientY });
                }, 550);
              }}
              onTouchMove={clearLongPressTimer}
              onTouchEnd={clearLongPressTimer}
              onTouchCancel={clearLongPressTimer}
              className="group flex h-full w-full flex-col bg-white"
            >
              <div className="relative h-[260px] w-full overflow-hidden bg-white sm:h-[320px] lg:h-[360px]">
                <Image
                  src={product.image}
                  alt={product.product_name}
                  width={600}
                  height={600}
                  className="h-full w-full object-contain p-8 transition duration-500 group-hover:scale-105 sm:p-10 lg:p-12"
                />
                {isSold && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#930000]/70 px-7 py-3 text-[24px] font-black uppercase leading-none tracking-[0.12em] text-white shadow-xl sm:text-[30px]">
                    Sold
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1 p-3 sm:p-4">
                <div className="mb-2 flex min-h-6 items-center justify-between gap-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[#767676]">
                  {brandLogo ? (
                    <Image
                      src={brandLogo.src}
                      alt={brandLogo.alt}
                      width={brandLogo.width}
                      height={brandLogo.height}
                      className={brandLogo.className}
                      style={{ width: "auto" }}
                    />
                  ) : (
                    <span>{product.category}</span>
                  )}
                </div>
                <h2 className="truncate text-[15px] font-semibold leading-tight text-[#000000] sm:text-[16px]">
                  {product.short_name}
                </h2>
                <p className="line-clamp-2 max-w-[34ch] text-balance text-[12px] leading-tight text-[#767676]">
                  {product.product_name}
                </p>
                <div className="mt-2 flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-[10px] leading-4 text-[#767676]">
                    <span className="line-through">{formatVndPrice(product.retail_price)}</span>
                    {discountPercent > 0 && (
                      <span className="bg-[#930000] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-semibold leading-5 text-[#111111]">
                    {formatVndPrice(product.preorder_price)}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {menu && (
        <button
          type="button"
          onClick={() => void setSold(menu.sku, !soldSkus.has(menu.sku))}
          className="fixed z-50 border border-[#cccccc] bg-white px-5 py-3 text-[14px] shadow-lg hover:bg-[#f4f4f4]"
          style={{ left: menu.x, top: menu.y }}
        >
          {soldSkus.has(menu.sku) ? "Unsold" : "Sold"}
        </button>
      )}
    </main>
  );
}
