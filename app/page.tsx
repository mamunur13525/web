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
    <main>
      <HeroSection />
      <ConnectSection />
      <AboutSection />
      <StackSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogsSection />
    </main>
  );
}
