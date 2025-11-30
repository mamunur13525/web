import BlogsList from "@/components/blogs/BlogsList";
import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";

export default function Home() {
  return (
    <main>
      <NestedNavbar />
      <section className="pt-10 mb-5">
        <PageTitle title="What I'm Reading" />
      </section>
      <BlogsList />
    </main>
  );
}
