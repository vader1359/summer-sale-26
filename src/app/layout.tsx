import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nanohome.vn"),
  title: "nanoHome - Summer Sale",
  description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "nanoHome - Summer Sale",
    description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
    type: "website",
    locale: "vi_VN",
    images: [
      {
        url: "/figma/hero.png",
        width: 3840,
        height: 2160,
        alt: "nanoHome Summer Sale Hero Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nanoHome - Summer Sale",
    description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
    images: [
      {
        url: "/figma/hero.png",
        alt: "nanoHome Summer Sale Hero Banner",
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
