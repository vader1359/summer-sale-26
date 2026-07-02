"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-context";

const featuredImages = [
  {
    src: "/home_lifestyle_new/lifestyle_1.png",
    alt: "Ghế SERIES 7 - Model 3107",
    width: 496,
    height: 654,
    className: "mt-[86px] h-[250px] max-md:mt-[72px] max-md:h-[210px]",
    title: "Ghế SERIES 7 - Model 3107",
    logo: "/figma/fritz_hansen_white.svg",
    logoAlt: "Fritz Hansen",
    logoWidth: 100,
    logoHeight: 20,
    titleStyle: "text-[16.4px] font-[1000] leading-[17.26px]",
    cardStyle: "bg-[rgba(236,236,236,1)] rounded-[5.96px]",
    overlayStyle: "pb-[22px] pt-[10px] px-[24px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_2.png",
    alt: "USM HALLER Cabinet, CxO Wide",
    width: 760,
    height: 1012,
    className: "h-[360px] max-md:h-[300px]",
    title: "USM HALLER Cabinet, CxO Wide",
    logo: "/figma/usm_white.png",
    logoAlt: "USM Haller",
    logoWidth: 50,
    logoHeight: 20,
    titleStyle: "text-[9.12px] font-[1000] leading-[9.6px]",
    cardStyle: "rounded-[5.96px]",
    overlayStyle: "py-[6px] px-[8px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_3.png",
    alt: "USM HALLER TROLLEY, O3",
    width: 424,
    height: 566,
    className: "mt-[42px] h-[250px] max-md:mt-[36px] max-md:h-[210px]",
    title: "USM HALLER TROLLEY, O3",
    logo: "/figma/usm_white.png",
    logoAlt: "USM Haller",
    logoWidth: 60,
    logoHeight: 24,
    titleStyle: "text-[13.23px] font-[1000] leading-[13.92px]",
    cardStyle: "rounded-[5.96px]",
    overlayStyle: "py-[8px] px-[12px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_4.png",
    alt: "PH 5 ORIGINAL SIZE Pendant",
    width: 644,
    height: 872,
    className: "h-[360px] max-md:h-[300px]",
    title: "PH 5 ORIGINAL SIZE Pendant",
    logo: "/figma/louis_poulsen_white.svg",
    logoAlt: "Louis Poulsen",
    logoWidth: 80,
    logoHeight: 18,
    titleStyle: "text-[16.4px] font-[1000] leading-[17.26px]",
    cardStyle: "rounded-[11.93px]",
    overlayStyle: "pb-[22px] pt-[10px] px-[24px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_5.png",
    alt: "Ghế DROP - Model 3110",
    width: 560,
    height: 726,
    className: "h-[360px] max-md:h-[300px]",
    title: "Ghế DROP - Model 3110",
    logo: "/figma/fritz_hansen_white.svg",
    logoAlt: "Fritz Hansen",
    logoWidth: 90,
    logoHeight: 18,
    titleStyle: "text-[13.23px] font-[1000] leading-[13.92px]",
    cardStyle: "bg-gradient-to-b from-[#aab0b0] to-[#e7e9e6] rounded-[11.93px] shadow-[inset_0px_11.18px_52.94px_0px_rgba(0,0,0,0.05)]",
    overlayStyle: "py-[8px] px-[12px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_6.png",
    alt: "USM HALLER Cabinet, CxO Wide",
    width: 644,
    height: 872,
    className: "h-[360px] max-md:h-[300px]",
    title: "USM HALLER Cabinet, CxO Wide",
    logo: "/figma/usm_white.png",
    logoAlt: "USM Haller",
    logoWidth: 50,
    logoHeight: 20,
    titleStyle: "text-[9.12px] font-[1000] leading-[9.6px]",
    cardStyle: "rounded-[5.96px]",
    overlayStyle: "py-[6px] px-[8px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_7.png",
    alt: "Ghế SERIES 7 - Model 3107",
    width: 320,
    height: 430,
    className: "mt-[128px] h-[165px] max-md:mt-[108px] max-md:h-[140px]",
    title: "Ghế SERIES 7 - Model 3107",
    logo: "/figma/fritz_hansen_white.svg",
    logoAlt: "Fritz Hansen",
    logoWidth: 80,
    logoHeight: 16,
    titleStyle: "text-[12px] font-[1000] leading-[13px]",
    cardStyle: "bg-[rgba(236,236,236,1)] rounded-[5.96px]",
    overlayStyle: "py-[6px] px-[12px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_8.png",
    alt: "PH 5 ORIGINAL SIZE Pendant",
    width: 508,
    height: 678,
    className: "mt-[66px] h-[250px] max-md:mt-[56px] max-md:h-[210px]",
    title: "PH 5 ORIGINAL SIZE Pendant",
    logo: "/figma/louis_poulsen_white.svg",
    logoAlt: "Louis Poulsen",
    logoWidth: 70,
    logoHeight: 16,
    titleStyle: "text-[13.23px] font-[1000] leading-[13.92px]",
    cardStyle: "rounded-[11.93px]",
    overlayStyle: "py-[8px] px-[12px]",
  },
];

const loopImages = [...featuredImages, ...featuredImages];

export function FeaturedDeals() {
  const { t } = useLanguage();

  return (
    <section className="overflow-hidden bg-[#fffdfa] pb-[60px] pt-[60px]">
      <div className="content-shell px-6 max-sm:px-4">
        <div className="mb-[48px] flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-[72px] font-semibold uppercase leading-[72px] text-[#ff3401] max-md:text-[48px] max-md:leading-[50px] max-sm:text-[38px]">
            {t.home.featuredDeals.heading}
          </h2>
          <p className="text-[24px] font-semibold uppercase leading-[25.2px] text-[#1a1a1a] max-sm:text-[18px]">{t.home.featuredDeals.subtitle}</p>
        </div>

        <div className="scrollbar-none relative h-[360px] touch-pan-x overflow-x-auto overflow-y-hidden max-md:h-[300px]">
          <div className="featured-loop-track flex w-max items-start gap-6">
            {loopImages.map((image, index) => {
              const imageTitle = t.home.featuredDeals.imageTitles[image.src] ?? image.alt;

              return (
                <div
                  key={`${image.src}-${index}`}
                  className={`relative shrink-0 overflow-hidden ${image.cardStyle} ${image.className}`}
                >
                  <Image
                    src={image.src}
                    alt={index >= featuredImages.length ? "" : imageTitle}
                    width={image.width}
                    height={image.height}
                    draggable={false}
                    aria-hidden={index >= featuredImages.length}
                    className="h-full w-auto object-cover"
                    sizes="(max-width: 768px) 330px, 439px"
                  />

                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-[60px] flex justify-center">
          <Link href="/summer26-list" className="flex h-12 items-center gap-[7.2px] rounded-[104px] bg-black px-4 text-[14.4px] font-semibold leading-[19.2px] text-white">
            {t.home.featuredDeals.cta}
            <span className="flex h-6 w-6 items-center justify-center rounded-[36px] bg-white text-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
