"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";

export function TopNoticeBar() {
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="relative flex min-h-[40.8px] w-full items-center justify-center bg-[#f8f8f8] px-[40px] py-[12px] text-[11.8px] font-normal leading-[16.8px] text-black max-sm:px-3 max-sm:py-2">
      <div className="content-shell flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center max-sm:max-w-[300px] max-sm:text-[10px]">
        <span className="text-balance">
          {t.home.notice.announcement}
        </span>
        <Link href="/summer26-list" className="shrink-0 whitespace-nowrap border-b border-black font-normal text-black transition-colors hover:text-zinc-600">
          {t.home.notice.link}
        </Link>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-[40px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 max-sm:right-3"
        aria-label={t.home.notice.closeAriaLabel}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
