"use client";

import { useState } from "react";

export function TopNoticeBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative flex h-[41px] w-full items-center justify-center bg-[#f8f8f8] px-10 text-[11.8px] leading-[16.8px] text-black">
      <div className="content-shell flex items-center justify-center gap-5 text-center max-sm:max-w-[260px] max-sm:gap-2 max-sm:text-[10px]">
        <span className="max-sm:truncate">
          nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.
        </span>
        <a href="#" className="shrink-0 border-b border-[#140f0f] font-normal text-[#140f0f] transition-colors hover:text-zinc-600">
          Truy cập nanoHome
        </a>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-10 flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-zinc-200 max-sm:right-3"
        aria-label="Close notice"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
}
