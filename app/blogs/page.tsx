import BlogsList from "@/components/blogs/BlogsList";
import NestedNavbar from "@/components/NestedNavbar";
import PageTitle from "@/components/PageTitle";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Read my latest articles about web development, technology, and coding tutorials.",
};

export default function Home() {
  return (
    <main>
      <NestedNavbar />
      <section className="pt-10 mb-5">
        <PageTitle title="All Blogs" />
      </section>
      <BlogsList />
    </main>
  );
}
