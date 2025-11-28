import MainSection from "@/components/home/MainSection";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/home/About";
import StackSection from "@/components/StackSection";

export default function Home() {
  return (
    <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
      <section className="container max-w-6xl mx-auto py-10 lg:py-20 px-7 xl:px-0">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <StackSection />
        <MainSection />
      </section>
    </section>
  );
}
