import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center overflow-y-scroll">
      <HeroSection />
      <FeatureSection />
      <StatsSection />
    </div>
  );
}
