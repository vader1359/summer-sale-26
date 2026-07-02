import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "nanoHome - Summer Sale",
  description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
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
