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
        url: "/preorder-assets/preorderbanner.png",
        width: 1200,
        height: 630,
        alt: "nanoHome Summer Sale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nanoHome - Summer Sale",
    description: "nanoHome là đơn vị bán sản phẩm USM độc quyền duy nhất tại Việt Nam.",
    images: [
      {
        url: "/preorder-assets/preorderbanner.png",
        alt: "nanoHome Summer Sale",
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
