import ExperienceSection from "@/components/experiences/ExperienceSection";
import NestedNavbar from "@/components/NestedNavbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "My professional journey and work experience as a Full Stack Developer.",
};

export default function Home() {
  return (
    <>
      <NestedNavbar />
      <ExperienceSection />
    </>
  );
}
