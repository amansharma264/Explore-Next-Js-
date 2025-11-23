import FeaturedCurses from "@/src/components/FeaturedCurses";
import MusicSchoolTestimonials from "@/src/components/TestimonialCards";
import HeroSection from "@/src/components/ui/HeroSection";
import WhyChooseUs from "@/src/components/WhyChooseUs";
import { main } from "motion/react-client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialised bg-grid-white/[0.0]">
      
      <HeroSection />
      <FeaturedCurses />
      <WhyChooseUs />
      <MusicSchoolTestimonials />
    </main>
  );
}
