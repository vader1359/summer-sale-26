import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đặt trước USM Haller tại nanoHome | Ưu đãi chính hãng",
  description:
    "Đặt trước sản phẩm USM Haller chính hãng tại nanoHome, nhận ưu đãi giới hạn và tư vấn cấu hình nội thất mô-đun Thụy Sĩ cho không gian sống.",
  alternates: {
    canonical: "/summer26",
    languages: {
      vi: "/summer26",
      en: "/summer26",
      ko: "/summer26",
    },
  },
  openGraph: {
    title: "Đặt trước USM Haller tại nanoHome | Ưu đãi chính hãng",
    description:
      "Đặt trước USM Haller chính hãng tại nanoHome với ưu đãi giới hạn và tư vấn showroom tại Việt Nam.",
    url: "/summer26",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/preorder-assets/preorderbanner.png",
        width: 1200,
        height: 630,
        alt: "Đặt trước USM Haller tại nanoHome",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Đặt trước USM Haller tại nanoHome | Ưu đãi chính hãng",
    description:
      "Đặt trước USM Haller tại nanoHome với ưu đãi giới hạn và tư vấn cấu hình chính hãng.",
    images: [
      {
        url: "/preorder-assets/preorderbanner.png",
        alt: "Đặt trước USM Haller tại nanoHome",
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
