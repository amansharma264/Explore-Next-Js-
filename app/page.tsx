import HeroSection from "@/src/components/ui/HeroSection";
import { main } from "motion/react-client";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialised bg-grid-white/[0.0]">
      <h1 className="text-2xl text-center">Chai aur Code</h1>
      <HeroSection />
    </main>
  );
}
