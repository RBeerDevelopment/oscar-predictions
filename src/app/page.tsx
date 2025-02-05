import { FeatureSection } from "@/components/home/feature-section";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { LandingHeader } from "@/components/landing-header";

export const dynamic = "force-static";

export default async function Home() {
  return (
    <div className="h-full flex flex-col items-center overflow-y-scroll">
      <LandingHeader />
      <HeroSection />
      <FeatureSection />
      <StatsSection />
    </div>
  );
}
