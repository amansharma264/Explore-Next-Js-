import FeaturedCourses from "@/src/components/FeaturedCourses";
import Footer from "@/src/components/Footer";
import Instructors from "@/src/components/Instructors";
import MusicSchoolTestimonials from "@/src/components/TestimonialCards";
import HeroSection from "@/src/components/ui/HeroSection";
import UpcomingWebinar from "@/src/components/UpcomingWebinar";
import WhyChooseUs from "@/src/components/WhyChooseUs";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.0]">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <MusicSchoolTestimonials />
      <UpcomingWebinar />
      <Instructors />
      <Footer />
    </main>
  );
}
