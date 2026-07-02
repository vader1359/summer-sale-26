import { TopNoticeBar } from "@/components/landing/TopNoticeBar";
import { Navigation } from "@/components/landing/Navigation";
import { Hero } from "@/components/landing/Hero";
import { SaleStrip } from "@/components/landing/SaleStrip";
import { FeaturedDeals } from "@/components/landing/FeaturedDeals";
import { SaleList } from "@/components/landing/SaleList";
import { DistributorFooter } from "@/components/landing/DistributorFooter";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col w-full bg-[#fffdfa]">
      <TopNoticeBar />
      <Navigation />
      <Hero />
      <SaleStrip />
      <FeaturedDeals />
      <SaleList />
      <DistributorFooter />
    </main>
  );
}
