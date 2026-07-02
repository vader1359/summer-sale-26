import type { Metadata } from "next";
import PreorderPage from "../summer26-list/product-list-page";

export const metadata: Metadata = {
  title: "Summer Sale Product List Preview | nanoHome",
  description: "Preview the nanoHome Summer Sale product list before launch.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SummerSaleListPreviewPage() {
  return <PreorderPage />;
}
