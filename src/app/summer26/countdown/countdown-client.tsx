"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";

const SALE_OPEN_AT = new Date("2026-07-03T09:00:00+07:00").getTime();

const COUNTDOWN_COPY = [
  {
    lang: "VI",
    eyebrow: "Summer Sale 2026",
    headline: "Cánh cửa ưu đãi sắp mở.",
    body:
      "Summer Sale sẽ mở lúc 9:00 sáng, ngày 3 tháng 7 năm 2026. Hãy sẵn sàng, giữ wishlist thật gần, và quay lại đúng khoảnh khắc bộ sưu tập giới hạn được mở bán.",
    opensIn: "Mở sau",
    footer: "Thời điểm mở bán chính xác: 9:00 sáng, giờ Việt Nam.",
    labels: ["Ngày", "Giờ", "Phút", "Giây"],
  },
  {
    lang: "EN",
    eyebrow: "Summer Sale 2026",
    headline: "The best pieces are almost within reach.",
    body:
      "The sale will open at 9:00 AM, July 3rd, 2026. Stay tuned, stay ready, and keep your wishlist close. Once the countdown hits zero, limited offers open for the fastest collectors.",
    opensIn: "Opens in",
    footer: "The door opens exactly at 9:00 AM Vietnam time.",
    labels: ["Days", "Hours", "Minutes", "Seconds"],
  },
  {
    lang: "KO",
    eyebrow: "Summer Sale 2026",
    headline: "기다리던 서머 세일이 곧 시작됩니다.",
    body:
      "세일은 2026년 7월 3일 오전 9시에 열립니다. 위시리스트를 준비해 두세요. 카운트다운이 끝나는 순간, 한정 수량 혜택이 가장 먼저 공개됩니다.",
    opensIn: "오픈까지",
    footer: "오픈 시간은 베트남 시간 오전 9시입니다.",
    labels: ["일", "시간", "분", "초"],
  },
] as const;

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
};

function getTimeLeft(): TimeLeft {
  const total = Math.max(0, SALE_OPEN_AT - Date.now());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1_000);

  return { days, hours, minutes, seconds, total };
}

function CountdownUnit({ label, value }: { label: string; value: number | null }) {
  return (
    <div className="flex min-h-[104px] flex-col items-center justify-center border border-[#111111] bg-white px-4 py-5 text-[#111111] sm:min-h-[128px] sm:px-7">
      <span className="font-sale-serif text-[42px] leading-none sm:text-[64px]">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#111111] sm:text-[12px]">
        {label}
      </span>
    </div>
  );
}

export function CountdownClient() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [copyIndex, setCopyIndex] = useState(0);
  const copy = COUNTDOWN_COPY[copyIndex];

  useEffect(() => {
    const syncCountdown = () => {
      const nextTimeLeft = getTimeLeft();
      setTimeLeft(nextTimeLeft);

      if (nextTimeLeft.total <= 0) {
        window.location.replace("/summer26");
      }
    };

    syncCountdown();
    const timer = window.setInterval(syncCountdown, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCopyIndex((current) => (current + 1) % COUNTDOWN_COPY.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const units = useMemo(
    () => [
      { label: copy.labels[0], value: timeLeft?.days ?? null },
      { label: copy.labels[1], value: timeLeft?.hours ?? null },
      { label: copy.labels[2], value: timeLeft?.minutes ?? null },
      { label: copy.labels[3], value: timeLeft?.seconds ?? null },
    ],
    [copy, timeLeft],
  );

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-white text-[#111111]">
      <section className="flex min-h-screen w-full items-center px-5 py-12 sm:px-8 lg:px-[60px]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.7fr)] lg:items-end">
          <div className="max-w-[780px]">
            <Link
              href="/"
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
              {COUNTDOWN_COPY.map((item, index) => (
                <div
                  key={item.lang}
                  aria-hidden={index !== copyIndex}
                  className={`col-start-1 row-start-1 transition duration-700 ease-out ${
                    index === copyIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-3 opacity-0"
                  }`}
                >
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
              {COUNTDOWN_COPY.map((item, index) => (
                <div
                  key={`${item.lang}-timer`}
                  aria-hidden={index !== copyIndex}
                  className={`col-start-1 row-start-1 flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.18em] text-[#111111] transition duration-700 ease-out ${
                    index === copyIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  <Clock size={18} strokeWidth={1.7} />
                  {item.opensIn}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {units.map((unit) => (
                <CountdownUnit key={unit.label} label={unit.label} value={unit.value} />
              ))}
            </div>
            <div className="mt-6 grid border-t border-[#111111] pt-5">
              {COUNTDOWN_COPY.map((item, index) => (
                <div
                  key={`${item.lang}-footer`}
                  aria-hidden={index !== copyIndex}
                  className={`col-start-1 row-start-1 text-[13px] font-medium leading-6 text-[#333333] transition duration-700 ease-out ${
                    index === copyIndex
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  {item.footer}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
