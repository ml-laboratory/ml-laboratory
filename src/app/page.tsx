import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import EvolutionTimeline from "@/components/sections/EvolutionTimeline";
import AnimatedBackground from "@/components/AnimatedBackground";
import { getEvents, getLatestPosts } from "@/lib/sanity.queries";

const TeamSection = dynamic(() => import("@/components/sections/TeamSection"), {
  loading: () => <div className="h-24" />,
});
const DepartmentsSection = dynamic(() => import("@/components/sections/DepartmentsSection"), {
  loading: () => <div className="h-24" />,
});
const ProjectsCarousel = dynamic(() => import("@/components/sections/ProjectsCarousel"), {
  loading: () => <div className="h-24" />,
});
const EventsSection = dynamic(() => import("@/components/sections/EventsSection"), {
  loading: () => <div className="h-24" />,
});
const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <div className="h-24" />,
});
const BlogTeaserSection = dynamic(() => import("@/components/sections/BlogTeaserSection"), {
  loading: () => <div className="h-24" />,
});

export default async function Home() {
  const [events, latestPosts] = await Promise.all([getEvents(), getLatestPosts(2)]);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col relative">
      <AnimatedBackground />
      <Navbar />

      <HeroSection />
      <EvolutionTimeline />
      <TeamSection />
      <DepartmentsSection />
      <ProjectsCarousel />
      <BlogTeaserSection posts={latestPosts} />
      <EventsSection events={events} />
      <ContactSection />

      <Footer />
    </main>
  );
}
