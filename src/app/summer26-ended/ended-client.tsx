"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

const ENDED_COPY = [
  {
    lang: "VI",
    eyebrow: "Summer Sale 2026",
    headline: "Sự kiện Summer Sale đã kết thúc.",
    body: "Hẹn gặp lại bạn lần sau. Cảm ơn bạn đã quan tâm và đồng hành cùng nanoHome.",
    showroomTitle: "nanoHome Gallery Saigon",
    showroomLabel: "Showroom",
    address:
      "675 - 677 Điện Biên Phủ, Phường Thạnh Mỹ Tây (Phường 25, Quận Bình Thạnh Cũ), Thành Phố Hồ Chí Minh.",
    hoursLabel: "Giờ mở cửa",
    hours: "9:00 - 18:00 (Từ Thứ Hai đến Chủ Nhật)",
    cta: "Ghé nanoHome",
  },
  {
    lang: "EN",
    eyebrow: "Summer Sale 2026",
    headline: "The Summer Sale event has ended.",
    body: "See you next time. Thank you for your interest and for being part of nanoHome.",
    showroomTitle: "nanoHome Gallery Saigon",
    showroomLabel: "Showroom",
    address: "675 - 677 Dien Bien Phu, Thanh My Tay Ward (Ward 25, Old Binh Thanh District), Ho Chi Minh City.",
    hoursLabel: "Opening hours",
    hours: "9:00 - 18:00 (Monday to Sunday)",
    cta: "Visit nanoHome",
  },
  {
    lang: "KO",
    eyebrow: "Summer Sale 2026",
    headline: "Summer Sale 이벤트가 종료되었습니다.",
    body: "다음에 다시 만나요. nanoHome에 관심을 가져 주셔서 감사합니다.",
    showroomTitle: "nanoHome Gallery Saigon",
    showroomLabel: "쇼룸",
    address: "675 - 677 Dien Bien Phu, Thanh My Tay Ward (Ward 25, Old Binh Thanh District), Ho Chi Minh City.",
    hoursLabel: "운영 시간",
    hours: "9:00 - 18:00 (월요일 - 일요일)",
    cta: "nanoHome 방문하기",
  },
] as const;

export function SummerSaleEndedClient() {
  const [copyIndex, setCopyIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCopyIndex((current) => (current + 1) % ENDED_COPY.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-white text-[#111111]">
      <section className="flex min-h-screen w-full items-center px-5 py-12 sm:px-8 lg:px-[60px]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.7fr)] lg:items-end">
          <div className="max-w-[780px]">
            <Link
              href="https://www.nanohome.vn/"
              className="mb-10 inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#111111] transition hover:opacity-70"
            >
              <Image
                src="/usm-color-pop/nanohom-logo.svg"
                alt="nanoHome"
                width={157}
                height={32}
                className="h-8 w-auto"
                priority
              />
            </Link>

            <div className="grid">
              {ENDED_COPY.map((item, index) => (
                <div
                  key={item.lang}
                  aria-hidden={index !== copyIndex}
                  className={`col-start-1 row-start-1 transition duration-700 ease-out ${
                    index === copyIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
                  <p className="mb-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#F15A24]">
                    {item.eyebrow} / {item.lang}
                  </p>
                  <h1 className="font-sale-serif text-[52px] leading-[0.94] text-[#111111] sm:text-[80px] lg:text-[100px]">
                    {item.headline}
                  </h1>
                  <p className="mt-7 max-w-[660px] text-[18px] leading-8 text-[#333333] sm:text-[22px] sm:leading-9">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full border border-[#111111] bg-white p-5 sm:p-7">
            <div className="mb-5 grid">
              {ENDED_COPY.map((item, index) => (
                <div
                  key={`${item.lang}-showroom-label`}
                  aria-hidden={index !== copyIndex}
                  className={`col-start-1 row-start-1 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#111111] transition duration-700 ease-out ${
                    index === copyIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  <MapPin size={18} strokeWidth={1.7} />
                  {item.showroomLabel}
                </div>
              ))}
            </div>

            <div className="grid min-h-[270px] sm:min-h-[248px]">
              {ENDED_COPY.map((item, index) => (
                <div
                  key={`${item.lang}-showroom`}
                  aria-hidden={index !== copyIndex}
                  className={`col-start-1 row-start-1 transition duration-700 ease-out ${
                    index === copyIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  <h2 className="font-sale-serif text-[42px] leading-none text-[#111111] sm:text-[56px]">
                    {item.showroomTitle}
                  </h2>
                  <p className="mt-6 text-[15px] font-medium leading-7 text-[#333333]">{item.address}</p>
                  <p className="mt-5 border-t border-[#111111] pt-5 text-[14px] font-medium leading-6 text-[#333333]">
                    <span className="font-semibold text-[#111111]">{item.hoursLabel}: </span>
                    {item.hours}
                  </p>
                  <Link
                    href="https://www.nanohome.vn/"
                    className="mt-7 inline-flex items-center justify-center rounded-full bg-black px-5 py-4 text-[14px] font-semibold leading-none text-white transition hover:bg-zinc-800"
                  >
                    {item.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
