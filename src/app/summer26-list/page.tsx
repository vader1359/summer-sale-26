import type { Metadata } from "next";
import PreorderPage from "./product-list-page";

export const metadata: Metadata = {
  title: "Summer Sale Product List | nanoHome",
  description: "Browse the nanoHome Summer Sale product list.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SummerSaleListPage() {
  return <PreorderPage />;
}
