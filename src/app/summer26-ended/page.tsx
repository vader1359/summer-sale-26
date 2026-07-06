import type { Metadata } from "next";
import { SummerSaleEndedClient } from "./ended-client";

export const metadata: Metadata = {
  title: "Summer Sale đã kết thúc | nanoHome",
  description: "Sự kiện nanoHome Summer Sale 2026 đã kết thúc. Hẹn gặp lại bạn lần sau tại nanoHome Gallery Saigon.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function SummerSaleEndedPage() {
  return <SummerSaleEndedClient />;
}
