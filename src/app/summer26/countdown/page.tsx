import type { Metadata } from "next";
import { CountdownClient } from "./countdown-client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "nanoHome Summer Sale opens July 3rd at 9:00 AM",
  description:
    "nanoHome Summer Sale 2026 opens at 9:00 AM on July 3rd, with limited offers on USM Haller and selected design pieces.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SummerSaleCountdownPage() {
  return <CountdownClient />;
}
