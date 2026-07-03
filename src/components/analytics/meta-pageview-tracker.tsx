"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialPageView = useRef(false);

  useEffect(() => {
    if (!hasTrackedInitialPageView.current) {
      hasTrackedInitialPageView.current = true;
      return;
    }

    if (typeof window === "undefined" || typeof window.fbq !== "function") return;

    const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    window.fbq("track", "PageView", { url });
  }, [pathname, searchParams]);

  return null;
}

export function MetaPageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
