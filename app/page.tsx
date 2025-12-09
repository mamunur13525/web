import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/home/About";
import StackSection from "@/components/StackSection";
import ExperienceSection from "@/components/experiences/ExperienceSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import BlogsSection from "@/components/blogs/BlogsSection";
import ConnectSection from "@/components/connects/ConnectSection";
import { Metadata } from "next";
import ContactForm from "@/components/contacts/ContactForm";
import SectionTitle from "@/components/ui/section-title";

export const metadata: Metadata = {
  title: "Mamun Dev",
  description:
    "Welcome to my AI-powered portfolio. I am a Full Stack Developer passionate about building accessible, pixel-perfect, and performant web applications.",
};
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
      <SectionTitle title="Contact Us">
        <ContactForm />
      </SectionTitle>
    </main>
  );
}
