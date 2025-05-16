import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CTA } from "@/components/sections/CTA";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";

export function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
      <Stats />
      <CTA />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
