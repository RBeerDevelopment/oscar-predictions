import { HeroSection } from "@/components/home/hero-section";
import { LandingHeader } from "@/components/landing-header";

export const dynamic = "force-static";

export default async function Home() {
  return (
    <div className="h-full flex flex-col items-center overflow-y-scroll bg-white">
      <LandingHeader />
      <HeroSection />
    </div>
  );
}
