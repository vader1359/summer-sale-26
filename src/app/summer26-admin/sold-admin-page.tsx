"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import productData from "../summer26/products.json";

type AdminProduct = {
  sku: string;
  short_name: string;
  product_name: string;
  image: string;
};

const PRODUCTS = productData as AdminProduct[];

export default function SoldAdminPage() {
  const [soldSkus, setSoldSkus] = useState<Set<string>>(() => new Set());
  const [menu, setMenu] = useState<{ sku: string; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch("/api/summer26/sold-status", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { soldSkus?: unknown }) => {
        if (Array.isArray(data.soldSkus)) {
          setSoldSkus(new Set(data.soldSkus.filter((sku): sku is string => typeof sku === "string")));
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

  const setSold = async (sku: string, sold: boolean) => {
    setMenu(null);
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
      const rollback = new Set(next);
      if (sold) {
        rollback.delete(sku);
      } else {
        rollback.add(sku);
      }
      setSoldSkus(rollback);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#dddddd] bg-white px-5 py-4">
        <h1 className="text-[20px] font-semibold">Sold admin</h1>
        <Link href="/summer26-list-preview" className="bg-black px-4 py-2 text-[13px] font-semibold text-white">
          Preview
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-px bg-[#dddddd] md:grid-cols-4 xl:grid-cols-6">
        {PRODUCTS.map((product) => {
          const isSold = soldSkus.has(product.sku);
          return (
            <article
              key={product.sku}
              onContextMenu={(event) => {
                event.preventDefault();
                setMenu({ sku: product.sku, x: event.clientX, y: event.clientY });
              }}
              className="relative bg-white p-3"
            >
              <div className="relative h-[210px]">
                <Image
                  src={product.image}
                  alt={product.product_name}
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 768px) 25vw, 50vw"
                  className="object-contain p-5"
                />
                {isSold && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#930000] px-5 py-2 text-[20px] font-black uppercase leading-none tracking-[0.12em] text-white shadow-xl">
                    Sold
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] text-[#777777]">{product.sku}</p>
              <h2 className="truncate text-[14px] font-semibold">{product.short_name}</h2>
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
