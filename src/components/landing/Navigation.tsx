"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Language } from "@/lib/i18n/dictionaries";

export function Navigation() {
  const { language, languages, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="content-shell flex items-center justify-between px-6 py-[10px] max-sm:px-4 max-sm:py-2">
        <Link href="/" className="flex items-center gap-8">
          <Image
            src="/figma/nanohome.svg"
            alt={t.home.navigation.logoAlt}
            width={133}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6 max-sm:gap-3">
          <label className="flex items-center gap-1 text-[16px] font-normal leading-[26px] text-[#4b4b4b] transition-colors hover:text-black max-sm:hidden">
            <span className="sr-only">{t.home.navigation.languageSelectorAriaLabel}</span>
            <span className="relative flex h-[26px] w-[26px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-600" aria-hidden="true">
              <svg viewBox="0 0 512 512" className="w-full h-full absolute inset-0">
                <rect width="512" height="512" fill="#da251d" />
                <polygon points="256,121 289,223 397,223 310,286 343,388 256,325 169,388 202,286 115,223 223,223" fill="#ff0" />
              </svg>
            </span>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as Language)}
              aria-label={t.home.navigation.languageSelectorAriaLabel}
              className="bg-transparent text-[16px] font-normal leading-[26px] text-[#4b4b4b] outline-none transition-colors hover:text-black"
            >
              {languages.map((option) => (
                <option key={option.code} value={option.code} aria-label={t.home.navigation.languageOptionAriaLabel(option.label)}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <Link href="/summer26-list" className="flex shrink-0 items-center justify-center gap-[7.2px] whitespace-nowrap rounded-[104.4px] bg-black px-4 py-[14px] text-[14.4px] font-semibold leading-[19.2px] text-white transition-all hover:bg-zinc-800 max-sm:gap-1.5 max-sm:px-2.5 max-sm:py-1.5 max-sm:text-[11px]">
            {t.home.navigation.exploreCta}
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[36px] bg-white text-black max-sm:h-4 max-sm:w-4">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
