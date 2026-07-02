import type { Metadata } from "next";
import { CountdownClient } from "./countdown-client";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Summer Sale opens July 3rd at 9:00 AM | nanoHome",
  description:
    "The nanoHome Summer Sale opens at 9:00 AM on July 3rd, 2026. Stay ready for limited USM Haller offers.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SummerSaleCountdownPage() {
  return <CountdownClient />;
}
