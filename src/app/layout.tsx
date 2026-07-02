import type { Metadata } from "next";
import "./globals.css";

const summerSaleTitle = "nanoHome Summer Sale 2026";
const summerSaleDescription =
  "Summer Sale 2026 mở lúc 9:00 AM ngày 03/07 tại nanoHome, với ưu đãi đến 40% cho USM Haller và các thiết kế nội thất chọn lọc.";
const summerSaleImageAlt = "nanoHome Summer Sale 2026 hero banner";

export const metadata: Metadata = {
  metadataBase: new URL("https://nanohome.vn"),
  title: summerSaleTitle,
  description: summerSaleDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: summerSaleTitle,
    description: summerSaleDescription,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#fffdfa] text-zinc-900">{children}</body>
    </html>
  );
}
