import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import EvolutionTimeline from "@/components/sections/EvolutionTimeline";
import TeamSection from "@/components/sections/TeamSection";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import EventsSection from "@/components/sections/EventsSection";
import ContactSection from "@/components/sections/ContactSection";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative">
      <AnimatedBackground />
      <Navbar />

      <HeroSection />
      <EvolutionTimeline />
      <TeamSection />
      <ProjectsCarousel />
      <EventsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
