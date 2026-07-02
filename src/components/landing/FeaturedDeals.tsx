import Image from "next/image";

const featuredImages = [
  {
    src: "/home_lifestyle_new/lifestyle_1.png",
    alt: "Lifestyle 1",
    width: 496,
    height: 654,
    className: "mt-[86px] h-[250px] max-md:mt-[72px] max-md:h-[210px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_2.png",
    alt: "Lifestyle 2",
    width: 760,
    height: 1012,
    className: "h-[360px] max-md:h-[300px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_3.png",
    alt: "Lifestyle 3",
    width: 424,
    height: 566,
    className: "mt-[42px] h-[250px] max-md:mt-[36px] max-md:h-[210px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_4.png",
    alt: "Lifestyle 4",
    width: 644,
    height: 872,
    className: "h-[360px] max-md:h-[300px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_5.png",
    alt: "Lifestyle 5",
    width: 560,
    height: 726,
    className: "h-[360px] max-md:h-[300px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_6.png",
    alt: "Lifestyle 6",
    width: 644,
    height: 872,
    className: "h-[360px] max-md:h-[300px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_7.png",
    alt: "Lifestyle 7",
    width: 320,
    height: 430,
    className: "mt-[128px] h-[165px] max-md:mt-[108px] max-md:h-[140px]",
  },
  {
    src: "/home_lifestyle_new/lifestyle_8.png",
    alt: "Lifestyle 8",
    width: 508,
    height: 678,
    className: "mt-[66px] h-[250px] max-md:mt-[56px] max-md:h-[210px]",
  },
];

const loopImages = [...featuredImages, ...featuredImages];

export function FeaturedDeals() {
  return (
    <section className="overflow-hidden bg-[#fffdfa] pb-[60px] pt-[60px]">
      <div className="content-shell px-6 max-sm:px-4">
        <div className="mb-[48px] flex flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-[72px] font-semibold uppercase leading-[72px] text-[#ff3401] max-md:text-[48px] max-md:leading-[50px] max-sm:text-[38px]">
            Featured Deals
          </h2>
          <p className="text-[24px] font-semibold uppercase leading-[25.2px] text-[#1a1a1a] max-sm:text-[18px]">Ưu đãi nổi bật</p>
        </div>

        <div className="relative h-[360px] overflow-hidden max-md:h-[300px]">
          <div className="featured-loop-track flex w-max items-start gap-6">
            {loopImages.map((image, index) => (
              <Image
                key={`${image.src}-${index}`}
                src={image.src}
                alt={index >= featuredImages.length ? "" : image.alt}
                width={image.width}
                height={image.height}
                draggable={false}
                aria-hidden={index >= featuredImages.length}
                className={`w-auto shrink-0 rounded-[8px] object-contain ${image.className}`}
                sizes="(max-width: 768px) 330px, 439px"
              />
            ))}
          </div>
        </div>

        <div className="mt-[60px] flex justify-center">
          <button className="flex h-12 items-center gap-[7.2px] rounded-[104px] bg-black px-4 text-[14.4px] font-semibold leading-[19.2px] text-white">
            Xem sản phẩm
            <span className="flex h-6 w-6 items-center justify-center rounded-[36px] bg-white text-black">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
