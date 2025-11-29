"use client";

import { blogs } from "@/data/demo/blogs";
import { Button } from "../ui/button";
import SingleBlog from "./SingleBlog";
import Link from "next/link";

const BlogsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <h1 className="text-3xl font-semibold tracking-wide font-stack mb-8">
        Blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.slice(0, 3).map((blog) => (
          <SingleBlog key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Link href="/blogs">
          <Button
            className="px-6 py-5 rounded-full cursor-pointer bg-[#000000]"
            variant="default"
            type="button"
          >
            See More
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default BlogsSection;
