import type { Metadata } from "next";
import PreorderPage from "../summer26/page";

export const metadata: Metadata = {
  title: "Summer Sale Preview | nanoHome",
  description: "Preview the nanoHome Summer Sale experience before launch.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SummerSalePreviewPage() {
  return <PreorderPage />;
}
