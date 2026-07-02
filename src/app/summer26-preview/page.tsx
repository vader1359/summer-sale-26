import type { Metadata } from "next";
import PreorderPage from "../summer26-list/product-list-page";

export const metadata: Metadata = {
  title: "Summer Sale Preview | nanoHome",
  description:
    "Preview trải nghiệm nanoHome Summer Sale 2026, mở lúc 9:00 AM ngày 03/07 với ưu đãi giới hạn cho các thiết kế chọn lọc.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SummerSalePreviewPage() {
  return <PreorderPage />;
}
