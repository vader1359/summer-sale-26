import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "nanoHome - Summer Sale",
  description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
  alternates: {
    canonical: "/summer26",
  },
  openGraph: {
    title: "nanoHome - Summer Sale",
    description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
    url: "/summer26",
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

export default function PreorderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
