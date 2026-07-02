import Image from "next/image";
import type { ReactNode } from "react";

export function DistributorFooter() {
  return (
    <section className="bg-[#fffdfa] pb-[60px] pt-[60px]">
      <div className="content-shell grid grid-cols-[424px_1fr] gap-6 px-0 max-xl:px-6 max-lg:grid-cols-1">
        <div className="relative h-[676px] overflow-hidden rounded-[8px] bg-[#fffaf0] max-lg:h-[420px]">
          <Image
            src="/figma/hero.jpg"
            alt="nanoHome showroom"
            fill
            className="object-cover object-left opacity-5"
            sizes="(max-width: 1024px) 100vw, 424px"
          />
        </div>

        <div className="flex min-h-[676px] items-start px-11 py-6 max-lg:min-h-0 max-md:px-0">
          <div className="w-full max-w-[784px]">
            <p className="mb-8 text-[18px] font-semibold uppercase leading-6 text-[#444]">
              Độc quyền phân phối
            </p>
            <div className="mb-8 flex items-center gap-6">
              <Image
                src="/figma/usm_black.svg"
                alt="USM"
                width={78}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <Image
                src="/figma/fritz_hansen_black.svg"
                alt="Fritz Hansen"
                width={142}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </div>

            <h2 className="mb-8 max-w-[784px] text-[48px] font-normal leading-[56px] text-[#333] max-md:text-[36px] max-md:leading-[42px] max-sm:text-[30px] max-sm:leading-9">
              nanoHome là đơn vị độc quyền phân phối{" "}
              <span className="font-semibold text-[#ff3401]">USM</span> và{" "}
              <span className="font-semibold text-[#ff3401]">FRITZ HANSEN</span>{" "}
              tại Việt Nam
            </h2>

            <div className="mb-[33px] h-px w-[556px] max-w-full bg-[#e4e4e4]" />

            <div className="mb-[33px] flex flex-col gap-4">
              <InfoRow icon="pin">
                675 - 677 Điện Biên Phủ, Phường Thạnh Mỹ Tây, Quận Bình Thạnh, TP. Hồ Chí Minh
              </InfoRow>
              <InfoRow icon="clock">
                9:00 - 18:00 (Từ Thứ Hai đến Chủ Nhật)
              </InfoRow>
              <InfoRow icon="phone">Hotline: (+84) 33 948 7632</InfoRow>
            </div>

            <button className="flex h-12 items-center gap-[7.2px] rounded-[104px] bg-black px-4 text-[14.4px] font-semibold leading-[19.2px] text-white">
              Xem chi tiết
              <span className="flex h-6 w-6 items-center justify-center rounded-[36px] bg-white text-black">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ children, icon }: { children: ReactNode; icon: "pin" | "clock" | "phone" }) {
  return (
    <div className="flex min-h-14 items-center gap-4 text-[20px] font-medium leading-7 text-[#111] max-md:text-[16px] max-md:leading-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[4px] bg-[#f5f5f5] text-[#777]">
        {icon === "pin" && (
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        )}
        {icon === "clock" && (
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v5l3 2" />
          </svg>
        )}
        {icon === "phone" && (
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M8 4h8a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
            <path d="M11 17h2" />
          </svg>
        )}
      </span>
      <p>{children}</p>
    </div>
  );
}
