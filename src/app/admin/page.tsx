import type { Metadata } from "next";
import SoldAdminPage from "./sold-admin-page";

export const metadata: Metadata = {
  title: "Summer Sale Sold Admin | nanoHome",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SummerSaleSoldAdminRoute() {
  return <SoldAdminPage />;
}
