import FeaturedCurses from "@/src/components/FeaturedCurses";
import HeroSection from "@/src/components/ui/HeroSection";
import { main } from "motion/react-client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialised bg-grid-white/[0.0]">
      
      <HeroSection />
      <FeaturedCurses />
    </main>
  );
}
