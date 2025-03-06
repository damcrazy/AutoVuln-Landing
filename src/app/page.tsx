import { CTASection } from "@/components/landing/cta-section";
import { FeatureSection } from "@/components/landing/feature-section";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";
import { RoadmapSection } from "@/components/landing/roadmap-section";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div id="features">
          <FeatureSection />
        </div>
        <div id="roadmap">
          <RoadmapSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
