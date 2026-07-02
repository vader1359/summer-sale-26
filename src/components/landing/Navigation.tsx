import Image from "next/image";
import Link from "next/link";

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="content-shell flex h-[72px] items-center justify-between px-6 max-sm:h-16 max-sm:px-4">
        <Link href="/" className="flex items-center gap-8">
          <Image
            src="/figma/nanohome.svg"
            alt="nanoHome"
            width={133}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6 max-sm:gap-3">
          <button className="flex h-10 items-center gap-2 text-[16px] font-normal text-[#4b4b4b] transition-colors hover:text-black max-sm:hidden">
            <span className="relative flex h-[26px] w-[26px] items-center justify-center overflow-hidden rounded-full bg-red-600">
              <svg viewBox="0 0 512 512" className="w-full h-full absolute inset-0">
                <rect width="512" height="512" fill="#da251d" />
                <polygon points="256,121 289,223 397,223 310,286 343,388 256,325 169,388 202,286 115,223 223,223" fill="#ff0" />
              </svg>
            </span>
            VN
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <button className="flex h-12 items-center gap-[7.2px] rounded-[104px] bg-black px-4 text-[14.4px] font-semibold leading-[19.2px] text-white max-sm:h-11 max-sm:text-[13px]">
            Khám phá ngay
            <span className="flex h-6 w-6 items-center justify-center rounded-[36px] bg-white text-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
