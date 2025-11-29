import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/home/About";
import StackSection from "@/components/StackSection";
import ExperienceSection from "@/components/experiences/ExperienceSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import BlogsSection from "@/components/blogs/BlogsSection";
import ConnectSection from "@/components/connects/ConnectSection";

export default function Home() {
  return (
    <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
      <section className="container max-w-5xl mx-auto py-10 lg:py-20 px-7 xl:px-0">
        <Navbar />
        <HeroSection />
        <ConnectSection />
        <AboutSection />
        <StackSection />
        <ExperienceSection />
        <ProjectsSection />
        <BlogsSection />
      </section>
    </section>
  );
}
