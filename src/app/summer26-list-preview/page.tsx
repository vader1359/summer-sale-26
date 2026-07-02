import type { Metadata } from "next";
import PreorderPage from "../summer26-list/product-list-page";

export const metadata: Metadata = {
  title: "Summer Sale Product List Preview | nanoHome",
  description:
    "Preview danh sách sản phẩm nanoHome Summer Sale 2026 với ưu đãi giới hạn cho USM Haller và các thiết kế nội thất chọn lọc.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SummerSaleListPreviewPage() {
  return <PreorderPage />;
}
