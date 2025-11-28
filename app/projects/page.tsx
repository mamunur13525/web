import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";
import ProjectsList from "@/components/projects/ProjectsList";

export default function Home() {
  return (
    <section className="bg-[#f8f8f8] overflow-y-auto h-screen w-screen">
      <section className="container max-w-5xl mx-auto py-10 lg:py-20 px-7 xl:px-0">
        <NestedNavbar />
        <section className="py-10">
          <PageTitle title="Projects List" />
        </section>
        <ProjectsList />
      </section>
    </section>
  );
}
