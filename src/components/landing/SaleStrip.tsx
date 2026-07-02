"use client";

import { motion, type Transition } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";

const SALE_END_AT = new Date("2026-07-03T09:00:00+07:00").getTime();
const INITIAL_COUNTDOWN = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

const textPulseTransition: Transition = {
  opacity: {
    duration: 2,
    times: [0, 0.875, 0.9997, 0.9998, 0.9999, 1],
    ease: ["easeInOut", "linear", "linear", "linear", "linear"],
    repeat: Infinity,
  },
  scaleX: {
    duration: 2,
    times: [0, 0.875, 0.9997, 0.9998, 0.9999, 1],
    ease: ["easeInOut", "linear", "linear", "linear", "linear"],
    repeat: Infinity,
  },
  scaleY: {
    duration: 2,
    times: [0, 0.875, 0.9997, 0.9998, 0.9999, 1],
    ease: ["easeInOut", "linear", "linear", "linear", "linear"],
    repeat: Infinity,
  },
};

const discountTransition: Transition = {
  scaleX: {
    duration: 2,
    times: [0, 0.3, 0.7, 1],
    ease: ["easeInOut", "easeInOut", "linear"],
    repeat: Infinity,
  },
  scaleY: {
    duration: 2,
    times: [0, 0.3, 0.7, 1],
    ease: ["easeInOut", "easeInOut", "linear"],
    repeat: Infinity,
  },
};

const labelTransition: Transition = {
  opacity: {
    duration: 2,
    times: [0, 0.3, 0.7, 1],
    ease: ["easeInOut", "easeInOut", "linear"],
    repeat: Infinity,
  },
};

const springEase = (t: number) =>
  1 - Math.exp(-t * 7.1988) * (Math.cos(t * 21.3132) + 0.3378 * Math.sin(t * 21.3132));

const ctaTransition: Transition = {
  opacity: {
    duration: 2,
    times: [0, 0.04, 1],
    ease: ["easeOut", "linear"],
    repeat: Infinity,
  },
  scaleX: {
    duration: 2,
    times: [0, 0.55, 1],
    ease: [springEase, "linear"],
    repeat: Infinity,
  },
  scaleY: {
    duration: 2,
    times: [0, 0.55, 1],
    ease: [springEase, "linear"],
    repeat: Infinity,
  },
};

export function SaleStrip() {
  const countdown = useCountdown(SALE_END_AT);
  const { t } = useLanguage();

  return (
    <section className="relative z-10 w-full bg-[#fffdfa] px-6 pb-0 pt-8 max-sm:px-4 max-sm:pb-4 max-sm:pt-8">
      <div className="content-shell relative flex min-h-[160px] items-center overflow-hidden rounded-[15px] bg-[#1c120e] max-md:min-h-0 max-md:max-w-[calc(100%-32px)]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/figma/sale-bg.jpg"
            alt={t.home.saleStrip.backgroundAlt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 flex w-full items-center justify-between gap-[10px] px-[42px] py-[16px] max-lg:gap-4 max-md:flex-col max-md:justify-center max-md:gap-6 max-md:px-8 max-md:py-7 max-sm:px-5">
          <div className="flex items-center justify-center gap-[93px] max-xl:gap-10 max-md:w-full max-md:gap-8 max-sm:flex-col max-sm:gap-4">
            <motion.h2
              initial={{
                opacity: 1,
                scaleX: 1,
                scaleY: 1,
              }}
              animate={{
                opacity: [1, 0.45, 0.4725, 0.65814, 0.90666, 1],
                scaleX: [1, 1.025, 1.024, 1.016, 1.004, 1],
                scaleY: [1, 1.025, 1.024, 1.016, 1.004, 1],
              }}
              transition={textPulseTransition}
              className="font-sale-serif text-[71.17px] font-normal italic leading-[56.94px] text-white max-lg:text-[52px] max-sm:text-[46px]"
            >
              <span>{t.home.saleStrip.summer} </span>
              <span className="text-[#F15A24]">{t.home.saleStrip.sale}</span>
            </motion.h2>
            <div className="flex flex-col text-white font-sale-serif italic">
              <motion.div
                initial={{
                  scaleX: 1,
                  scaleY: 1,
                }}
                animate={{
                  scaleX: [1, 1.14, 1, 1],
                  scaleY: [1, 1.14, 1, 1],
                }}
                transition={discountTransition}
                style={{ transformOrigin: "center center" }}
                className="block w-[143.72px] whitespace-nowrap font-sale-serif text-[72px] font-normal italic leading-[57.6px] text-white"
              >
                40%
              </motion.div>
              <motion.div
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity: [1, 0.35, 1, 1],
                }}
                transition={labelTransition}
                className="flex gap-2 text-[18.74px] leading-[24.37px] uppercase not-italic font-sans font-normal"
              >
                <span>{t.home.saleStrip.upTo}</span>
                <span>{t.home.saleStrip.off}</span>
              </motion.div>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-center gap-[21px] text-white max-sm:gap-3">
            <TimeUnit value={countdown.days} label={t.home.saleStrip.countdown.days} />
            <TimeUnit value={countdown.hours} label={t.home.saleStrip.countdown.hours} />
            <TimeUnit value={countdown.minutes} label={t.home.saleStrip.countdown.minutes} />
            <TimeUnit value={countdown.seconds} label={t.home.saleStrip.countdown.seconds} />
          </div>

          <div>
            <Link href="/summer26" className="flex shrink-0 items-center gap-[7.2px] whitespace-nowrap rounded-[104.4px] bg-black px-[16px] py-[14px] text-[14.4px] font-semibold leading-[19.2px] text-white">
              <motion.div
                initial={{
                  opacity: 0,
                  scaleX: 0.55,
                  scaleY: 0.55,
                }}
                animate={{
                  opacity: [0, 1, 1],
                  scaleX: [0.55, 1, 1],
                  scaleY: [0.55, 1, 1],
                }}
                transition={ctaTransition}
                className="flex items-center gap-[7.2px]"
              >
                <span>{t.home.saleStrip.cta}</span>
                <span className="flex h-[24px] w-[24px] items-center justify-center rounded-[36px] bg-white text-black">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function useCountdown(targetTime: number) {
  const [remaining, setRemaining] = useState(INITIAL_COUNTDOWN);

  useEffect(() => {
    const tick = () => setRemaining(getRemainingTime(targetTime));
    tick();
    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, [targetTime]);

  return remaining;
}

function getRemainingTime(targetTime: number) {
  const total = Math.max(0, targetTime - Date.now());
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function TimeUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-[5px] min-w-[50px]">
      <span className="text-[22px] font-medium leading-[23.1px] font-sans">{value}</span>
      <span className="text-[11px] font-light leading-[11.55px] text-[#C3C3C3] uppercase">{label}</span>
    </div>
  );
}
