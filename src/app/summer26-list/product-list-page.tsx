"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState, useEffect } from "react";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { STORAGE_KEY } from "@/lib/i18n";
import { localizePreorderProductText, translations, Language } from "../summer26/i18n";
import { CartProvider, useCart } from "../summer26/cart-context";
import { CartModal } from "../summer26/cart-modal";
import { ContactGateModal, hasCompletedContactGate } from "../summer26/contact-gate-modal";
import productData from "../summer26/products.json";

// ----- DATA -----

type PreorderProduct = {
  category: string;
  sku: string;
  short_name: string;
  product_name: string;
  retail_price: number;
  preorder_price: number;
  image: string;
};

const PRODUCTS = productData as PreorderProduct[];

const PRICE_LOCALES: Record<Language, string> = {
  vi: "vi-VN",
  en: "en-US",
  ko: "ko-KR",
};

function formatVndPrice(value: number, lang: Language): string {
  const formatted = new Intl.NumberFormat(PRICE_LOCALES[lang], {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

  return lang === "vi" ? formatted.replace("₫", "vnd") : formatted;
}

function getDiscountPercent(retailPrice: number, preorderPrice: number): number {
  if (retailPrice <= 0) return 0;
  return Math.round((1 - preorderPrice / retailPrice) * 100);
}

const SHARED_LANGUAGES: Language[] = ["vi", "en", "ko"];

function isLanguage(value: string | null): value is Language {
  return SHARED_LANGUAGES.includes(value as Language);
}

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "vi";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    return "vi";
  }
  return "vi";
}

function persistLanguage(lang: Language) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    return;
  }
}

const LIFESTYLE_IMAGES = [
  { src: "/random_lifestyle/img_lifestyle01.jpg", index: 0, span: 2 },
  { src: "/random_lifestyle/img_lifestyle02.jpg", index: 1, span: 1 },
  { src: "/random_lifestyle/img_lifestyle03.jpg", index: 2, span: 1 },
  { src: "/random_lifestyle/img_lifestyle04.jpg", index: 3, span: 1 },
  { src: "/random_lifestyle/img_lifestyle05.jpg", index: 4, span: 1 },
  { src: "/random_lifestyle/img_lifestyle06.jpg", index: 0, span: 1 },
  { src: "/random_lifestyle/img_lifestyle07.jpg", index: 1, span: 1 },
  { src: "/random_lifestyle/img_lifestyle08.jpg", index: 2, span: 2 },
  { src: "/random_lifestyle/img_lifestyle09.jpg", index: 3, span: 2 },
  { src: "/random_lifestyle/img_lifestyle10.jpg", index: 4, span: 2 },
  { src: "/random_lifestyle/img_lifestyle11.jpg", index: 0, span: 2 },
  { src: "/random_lifestyle/img_lifestyle12.jpg", index: 1, span: 2 },
  { src: "/random_lifestyle/img_lifestyle13.jpg", index: 2, span: 2 },
  { src: "/random_lifestyle/img_lifestyle14.jpg", index: 3, span: 2 },
  { src: "/random_lifestyle/img_lifestyle15.jpg", index: 4, span: 2 },
  { src: "/random_lifestyle/img_lifestyle16.jpg", index: 0, span: 2 },
];

type Cell =
  | { kind: "packshot"; product: PreorderProduct }
  | { kind: "lifestyle"; image: string; captionIdx: number; span: 1 | 2 };

type LayoutCell = "packshot" | { kind: "lifestyle"; span: 1 | 2 };

const NON_ADJACENT_LIFESTYLE_GRID_LAYOUT: LayoutCell[] = [
  "packshot", "packshot", { kind: "lifestyle", span: 2 }, "packshot", "packshot",
  "packshot", "packshot", "packshot", "packshot", "packshot", "packshot",
  { kind: "lifestyle", span: 1 }, "packshot", "packshot", "packshot", "packshot", "packshot",
  "packshot", "packshot", "packshot", "packshot", { kind: "lifestyle", span: 2 },
  "packshot", "packshot", { kind: "lifestyle", span: 2 }, "packshot", "packshot",
];

const PACKSHOTS_PER_PAGE = NON_ADJACENT_LIFESTYLE_GRID_LAYOUT.filter((cell) => cell === "packshot").length;

type BrandFilter = "all" | "fritzHansen" | "usm" | "louisPoulsen";

function getProductBrand(sku: string): BrandFilter {
  if (sku.startsWith("USMUS")) return "usm";
  if (sku.startsWith("CHRFR") || sku.startsWith("CHRFH") || sku.startsWith("TBLFH")) return "fritzHansen";
  if (sku.startsWith("LTLLP") || sku.startsWith("LPLLP")) return "louisPoulsen";
  return "all";
}

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

function getBrandLogo(sku: string) {
  return BRAND_LOGOS[getProductBrand(sku)];
}

function buildPage(pageIndex: number, productList: PreorderProduct[]): Cell[] {
  const packshotOffset = pageIndex * PACKSHOTS_PER_PAGE;
  const remainingProductsOnPage = Math.max(0, productList.length - packshotOffset);
  let packshotIndex = 0;
  let lifestyleIndex = 0;

  const cells: Cell[] = [];

  for (const layoutCell of NON_ADJACENT_LIFESTYLE_GRID_LAYOUT) {
    if (layoutCell !== "packshot") {
      if (packshotIndex >= remainingProductsOnPage) {
        break;
      }
      const lifestyle = LIFESTYLE_IMAGES[(pageIndex + lifestyleIndex) % LIFESTYLE_IMAGES.length];
      lifestyleIndex += 1;
      cells.push({
        kind: "lifestyle",
        image: lifestyle.src,
        captionIdx: lifestyle.index,
        span: lifestyle.span as 1 | 2,
      });
      continue;
    }

    const product = productList[packshotOffset + packshotIndex];
    if (product) {
      cells.push({ kind: "packshot", product });
      packshotIndex += 1;
    } else {
      break;
    }
  }

  return cells;
}

// ----- SUB-COMPONENTS -----

function NotificationBar({
  lang,
  onClose,
}: {
  lang: Language;
  onClose: () => void;
}) {
  const t = translations[lang];
  return (
    <div className="relative w-full bg-[#F8F8F8]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center px-10 py-3 text-center text-[12px] leading-[17px] text-[#111111]">
        {t.notificationBar.text}
        <button
          type="button"
          aria-label={t.notificationBar.ariaLabel}
          onClick={onClose}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444444] transition hover:text-[#111111]"
        >
          <X size={14} strokeWidth={1.6} />
        </button>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <span className="flex items-center" aria-label="nanoHome">
      <Image
        src="/usm-color-pop/nanohom-logo.svg"
        alt="nanoHome"
        width={157}
        height={32}
        className="h-8 w-auto"
        preload
      />
    </span>
  );
}

function HeaderRight({
  lang,
  setLang,
  onOpenCart,
}: {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenCart: () => void;
}) {
  const t = translations[lang];
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <div className="flex shrink-0 items-center gap-2.5 sm:gap-6">
      <button
        type="button"
        onClick={onOpenCart}
        className="relative grid size-9 sm:size-12 place-items-center rounded-none border border-[#E7E7E7] text-[#444444] transition-colors hover:bg-[#F8F8F8]"
        aria-label={t.openCartAriaLabel}
      >
        <ShoppingCart size={16} className="sm:hidden" strokeWidth={1.8} />
        <ShoppingCart size={20} className="hidden sm:block" strokeWidth={1.8} />
        {itemCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center bg-[#C70500] px-1 text-[10px] font-bold leading-none text-white">
            {itemCount}
          </span>
        )}
      </button>

      <div className="flex items-center gap-0.5 sm:gap-1">
        {[
          { code: "vi" as const, label: "VI" },
          { code: "en" as const, label: "EN" },
          { code: "ko" as const, label: "KO" },
        ].map((language) => (
          <button
            key={language.code}
            type="button"
            onClick={() => setLang(language.code)}
            className={`rounded-none px-1.5 sm:px-2 py-1 text-[13px] sm:text-[14px] leading-[26px] transition-colors hover:text-[#C70500] ${
              language.code === lang
                ? "font-semibold text-[#C70500]"
                : "font-normal text-[#4B4B4B]"
            }`}
            aria-label={t.switchLangAriaLabel(language.label)}
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SiteHeader({
  lang,
  setLang,
  onOpenCart,
}: {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenCart: () => void;
}) {
  const t = translations[lang];
  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full bg-white">
      <nav className="h-[72px] border-b border-[#E8E8E8] px-4 py-[10px] sm:px-6" aria-label={t.navAriaLabel}>
        <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-3 sm:gap-6">
          <Link href="/" className="shrink-0" aria-label={t.logoHomeAriaLabel}>
            <Logo />
          </Link>

          <HeaderRight lang={lang} setLang={setLang} onOpenCart={onOpenCart} />
        </div>
      </nav>
    </header>
  );
}

function TrustBadges({ lang }: { lang: Language }) {
  const t = translations[lang];

  const highlights = [
    {
      icon: CheckCircle2,
      top: t.trustBadges.badge2.top,
      bottom: t.trustBadges.badge2.bottom,
    },
    {
      icon: GraduationCap,
      top: t.trustBadges.badge3.top,
      bottom: t.trustBadges.badge3.bottom,
    },
    {
      icon: Truck,
      top: t.trustBadges.badge4.top,
      bottom: t.trustBadges.badge4.bottom,
    },
  ];

  return (
    <section className="w-full bg-[#FFFDF1]" aria-label={t.trustBadges.sectionAriaLabel}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-6 sm:px-8 lg:px-[60px] lg:py-[26px]">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-center gap-[21px]">
            <span className="flex size-8 shrink-0 items-center justify-center text-[#444444]">
              <Calendar size={32} strokeWidth={1.35} />
            </span>
            <div className="flex w-full max-w-[315px] flex-col gap-1">
              <p className="text-[18px] font-normal leading-7 text-[#444444] sm:text-[20px]">
                {t.trustBadges.badge1.top}
              </p>
              <p className="text-[20px] font-medium leading-7 text-[#111111] sm:text-[22px]">
                {t.trustBadges.badge1.bottom}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 xl:flex xl:justify-center xl:gap-8">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;
              return (
                <div key={highlight.top} className="flex gap-[11px] md:max-w-[278px]">
                  <span className="flex size-8 shrink-0 items-start justify-center text-[#444444]">
                    <Icon size={32} strokeWidth={1.35} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <p className="text-[14px] font-medium leading-[18px] text-[#111111]">
                      {highlight.top}
                    </p>
                    <p className="text-[14px] font-normal leading-[18px] text-[#444444]">
                      {highlight.bottom}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Link href="#final-policy" className="inline-flex w-fit items-center gap-1 text-[14px] font-semibold leading-4 text-[#930000] transition-colors hover:text-[#C70500]">
          {t.trustBadges.detailsCta}
          <ArrowRight size={12} strokeWidth={2.4} />
        </Link>
      </div>
    </section>
  );
}


function ProductCard({ product, lang, isSold }: { product: PreorderProduct; lang: Language; isSold: boolean }) {
  const t = translations[lang];
  const { addItem, removeItem, items } = useCart();
  const isInCart = items.some((item) => item.id === product.sku);
  const pendingAddRef = useRef(false);

  useEffect(() => {
    if (isInCart) {
      pendingAddRef.current = false;
    }
  }, [isInCart]);

  const localizedProduct = localizePreorderProductText(
    {
      category: product.category,
      shortName: product.short_name,
      productName: product.product_name,
    },
    lang,
  );
  const discountPercent = getDiscountPercent(product.retail_price, product.preorder_price);
  const brandLogo = getBrandLogo(product.sku);

  const handleToggleCart = () => {
    if (isSold) return;

    if (isInCart) {
      pendingAddRef.current = false;
      removeItem(product.sku);
      return;
    }

    if (pendingAddRef.current) return;
    pendingAddRef.current = true;

    addItem({
      id: product.sku,
      sku: product.sku,
      category: product.category,
      categoryLabel: localizedProduct.category,
      name: localizedProduct.shortName,
      subtitle: localizedProduct.productName,
      sourceName: product.short_name,
      sourceDescription: product.product_name,
      retailPrice: product.retail_price,
      preorderPrice: product.preorder_price,
      image: product.image,
    });
  };

  return (
    <article className="group flex h-full w-full flex-col bg-white">
      <div className="relative h-[260px] w-full overflow-hidden bg-white sm:h-[320px] lg:h-[360px]">
        <Image
          src={product.image}
          alt={localizedProduct.productName}
          width={600}
          height={600}
          className={`h-full w-full object-contain p-8 transition duration-500 sm:p-10 lg:p-12 ${
            isSold ? "" : "group-hover:scale-105"
          }`}
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
            <span>{localizedProduct.category}</span>
          )}
        </div>
        <h3 className="truncate text-[15px] font-semibold leading-tight text-[#000000] sm:text-[16px]">
          {localizedProduct.shortName} | {product.sku}
        </h3>
        <p className="line-clamp-2 max-w-[34ch] text-balance text-[12px] leading-tight text-[#767676]">
          {localizedProduct.productName}
        </p>
        <div className="mt-2 flex flex-col gap-0.5">
          <div className="flex items-center gap-2 text-[10px] leading-4 text-[#767676]">
            <span className="line-through">{formatVndPrice(product.retail_price, lang)}</span>
            {discountPercent > 0 && (
              <span className="bg-[#930000] px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
                -{discountPercent}%
              </span>
            )}
          </div>
          <p className="text-[13px] font-semibold leading-5 text-[#111111]">
            {formatVndPrice(product.preorder_price, lang)}
          </p>
        </div>
        <button
          type="button"
          onClick={handleToggleCart}
          disabled={isSold}
          className={`click_order mt-3 inline-flex w-fit items-center justify-center rounded-none px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.05em] text-white transition sm:text-[11px] ${
            isSold
              ? "cursor-not-allowed bg-[#9a9a9a]"
              : isInCart
              ? "bg-[#C70500]"
              : "bg-[#000000] hover:bg-[#333333] active:bg-[#C70500]"
          }`}
        >
          {isSold ? "Sold" : isInCart ? t.productCard.addedToCart : t.productCard.cta}
        </button>
      </div>
    </article>
  );
}

function LifestyleCard({ image, caption }: { image: string; caption: string }) {
  return (
    <article className="group relative h-full min-h-[260px] w-full overflow-hidden bg-transparent sm:min-h-[320px] lg:min-h-[360px]">
      <Image
        src={image}
        alt={caption}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="scale-110 object-cover transition duration-500 group-hover:scale-[1.15]"
      />
    </article>
  );
}

function BrandFilterBar({
  brand,
  onSelectBrand,
  sortOrder,
  onToggleSort,
  lang,
}: {
  brand: BrandFilter;
  onSelectBrand: (brand: BrandFilter) => void;
  sortOrder: "asc" | "desc";
  onToggleSort: () => void;
  lang: Language;
}) {
  const t = translations[lang];
  const brands: { id: BrandFilter; label: string; disabled?: boolean }[] = [
    { id: "all", label: t.brandFilter.all },
    { id: "fritzHansen", label: t.brandFilter.fritzHansen },
    { id: "usm", label: t.brandFilter.usm },
    { id: "louisPoulsen", label: t.brandFilter.louisPoulsen },
  ];

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 border-b border-[#E5E5E5] px-5 py-6 sm:flex-row sm:items-center sm:px-8 lg:px-[60px]">
      <div className="flex flex-wrap items-center gap-7 sm:gap-12">
        {brands.map((b) => {
          const isSelected = brand === b.id;
          const logo = BRAND_LOGOS[b.id];
          return (
            <button
              key={b.id}
              type="button"
              disabled={b.disabled}
              onClick={() => {
                if (!b.disabled) {
                  onSelectBrand(b.id);
                }
              }}
              className={`flex min-h-9 items-center justify-center text-[13px] font-medium transition sm:text-[14px] ${
                b.disabled
                  ? "cursor-not-allowed opacity-45"
                  : isSelected
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-100"
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
                b.label
              )}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onToggleSort}
        className="flex items-center gap-1.5 text-[13px] font-medium text-[#111111] hover:text-[#C70500] sm:text-[14px]"
      >
        <span>{sortOrder === "asc" ? t.brandFilter.sortAsc : t.brandFilter.sortDesc}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}

function ProductGrid({
  page,
  products,
  lang,
  gridRef,
  soldSkus,
  showAllProducts = false,
}: {
  page: number;
  products: PreorderProduct[];
  lang: Language;
  gridRef: React.RefObject<HTMLElement | null>;
  soldSkus: Set<string>;
  showAllProducts?: boolean;
}) {
  const t = translations[lang];
  const cells = useMemo(() => buildPage(page, products), [page, products]);

  return (
    <section ref={gridRef} className="scroll-mt-[88px] w-full bg-white" aria-label={t.productGridAriaLabel}>
      <div className="grid w-full grid-flow-row-dense grid-cols-2 gap-0 divide-x divide-y divide-[#E5E5E5] md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        {showAllProducts
          ? products.map((product) => (
              <div key={product.sku} className="flex">
                <ProductCard product={product} lang={lang} isSold={soldSkus.has(product.sku)} />
              </div>
            ))
          : null}
        {!showAllProducts && cells.map((cell, idx) => {
          if (cell.kind === "packshot") {
            return (
              <div key={`p-${page}-${idx}`} className="flex">
                <ProductCard product={cell.product} lang={lang} isSold={soldSkus.has(cell.product.sku)} />
              </div>
            );
          }
          const caption = t.lifestyleCaptions[cell.captionIdx] || "";
          return (
            <div
              key={`l-${page}-${idx}`}
              className={cell.span === 2 ? "col-span-2 flex" : "flex"}
            >
              <LifestyleCard image={cell.image} caption={caption} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Pagination({
  current,
  total,
  onChange,
  lang,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
  lang: Language;
}) {
  const t = translations[lang];
  return (
    <nav
      className="mx-auto flex max-w-[1440px] items-center justify-center gap-2 bg-white px-5 py-6 sm:px-8 lg:px-10"
      aria-label={t.pagination.navAriaLabel}
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = current === i;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`flex h-8 w-8 items-center justify-center text-[14px] font-normal transition rounded-none ${
              isActive
                ? "border border-[#4D4D4D] text-[#1A1A1A]"
                : "border border-[#D9D9D9] text-[#757575] hover:border-[#4D4D4D] hover:text-[#1A1A1A]"
            }`}
            aria-label={t.pagination.goToPage(i + 1)}
            aria-current={isActive ? "page" : undefined}
          >
            {i + 1}
          </button>
        );
      })}
    </nav>
  );
}

function FinalPolicySection({ lang }: { lang: Language }) {
  const t = translations[lang].finalPolicy;
  return (
    <section id="final-policy" className="scroll-mt-24 bg-[#FEFAEE] px-5 py-8 sm:px-8 lg:px-[60px] lg:py-[40px]" aria-label={t.title}>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 text-[#111111]">
        <h2 className="text-[20px] font-semibold uppercase leading-8 sm:text-[24px]">{t.title}</h2>
        <div>
          <div className="whitespace-pre-line text-[10px] font-normal leading-[14px] text-black">
            {t.body}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----- MAIN PAGE -----

function PreorderPageContent({ showAllProducts = false }: { showAllProducts?: boolean }) {
  const [lang, setLangState] = useState<Language>(() => getStoredLanguage());
  const [page, setPage] = useState(0);
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showNotification, setShowNotification] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactGateOpen, setIsContactGateOpen] = useState(false);
  const [soldSkus, setSoldSkus] = useState<Set<string>>(() => new Set());
  const productGridRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    persistLanguage(getStoredLanguage());
  }, []);

  useEffect(() => {
    if (hasCompletedContactGate()) return;
    const timer = window.setTimeout(() => {
      if (!hasCompletedContactGate()) {
        setIsContactGateOpen(true);
      }
    }, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/summer26/sold-status", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { soldSkus: [] }))
      .then((data: { soldSkus?: unknown }) => {
        if (!isMounted || !Array.isArray(data.soldSkus)) return;
        setSoldSkus(new Set(data.soldSkus.filter((sku): sku is string => typeof sku === "string")));
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, []);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    persistLanguage(nextLang);
  };

  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (brand !== "all") {
      list = list.filter((p) => getProductBrand(p.sku) === brand);
    }
    if (sortOrder === "asc") {
      list = [...list].sort((a, b) => a.preorder_price - b.preorder_price);
    } else {
      list = [...list].sort((a, b) => b.preorder_price - a.preorder_price);
    }
    return list;
  }, [brand, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PACKSHOTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages - 1);

  const handleBrandChange = (nextBrand: BrandFilter) => {
    setBrand(nextBrand);
    setPage(0);
  };

  const handleToggleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setPage(0);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white pt-[72px] font-sans text-[#111111]">
      <div
        className={`transition duration-300 ${
          isContactGateOpen ? "pointer-events-none select-none blur-sm" : ""
        }`}
        aria-hidden={isContactGateOpen}
      >
        {showNotification && (
          <NotificationBar lang={lang} onClose={() => setShowNotification(false)} />
        )}
        <SiteHeader lang={lang} setLang={setLang} onOpenCart={() => setIsCartOpen(true)} />
        <TrustBadges lang={lang} />

        <section id="products" aria-label={translations[lang].productGridAriaLabel}>
          <BrandFilterBar
            brand={brand}
            onSelectBrand={handleBrandChange}
            sortOrder={sortOrder}
            onToggleSort={handleToggleSort}
            lang={lang}
          />
          <ProductGrid
            page={currentPage}
            products={filteredProducts}
            lang={lang}
            gridRef={productGridRef}
            soldSkus={soldSkus}
            showAllProducts={showAllProducts}
          />
          {!showAllProducts && (
            <Pagination current={currentPage} total={totalPages} onChange={handlePageChange} lang={lang} />
          )}
        </section>

        <FinalPolicySection lang={lang} />
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} language={lang} />
      <ContactGateModal
        isOpen={isContactGateOpen}
        language={lang}
        onUnlock={() => setIsContactGateOpen(false)}
      />
    </main>
  );
}

export default function PreorderPage({ showAllProducts = false }: { showAllProducts?: boolean }) {
  return (
    <CartProvider>
      <PreorderPageContent showAllProducts={showAllProducts} />
    </CartProvider>
  );
}
