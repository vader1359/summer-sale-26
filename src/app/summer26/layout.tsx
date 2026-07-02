import type { Metadata } from "next";

const summerSaleTitle = "nanoHome Summer Sale 2026";
const summerSaleDescription =
  "Summer Sale 2026 mở lúc 9:00 AM ngày 03/07 tại nanoHome, với ưu đãi đến 40% cho USM Haller và các thiết kế nội thất chọn lọc.";
const summerSaleImageAlt = "nanoHome Summer Sale 2026 hero banner";

export const metadata: Metadata = {
  title: summerSaleTitle,
  description: summerSaleDescription,
  alternates: {
    canonical: "/summer26",
  },
  openGraph: {
    title: summerSaleTitle,
    description: summerSaleDescription,
    url: "/summer26",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/figma/hero.png",
        width: 3840,
        height: 2160,
        alt: summerSaleImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: summerSaleTitle,
    description: summerSaleDescription,
    images: [
      {
        url: "/figma/hero.png",
        alt: summerSaleImageAlt,
      },
    ],
  },
};

export default function PreorderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
