import WorkExperiences from "@/components/experiences/WorkExperiences";
import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";

export default function Home() {
  return (
    <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
      <section className="container max-w-5xl mx-auto py-10 lg:py-20 px-7 lg:px-0">
        <NestedNavbar />
        <section className="py-10">
          <PageTitle title="Work Experiences" />
        </section>
        <WorkExperiences />
      </section>
    </section>
  );
}
