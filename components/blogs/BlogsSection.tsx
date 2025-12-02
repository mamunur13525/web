"use client";

import { blogs } from "@/data/demo/blogs";
import { Button } from "../ui/button";
import SingleBlog from "./SingleBlog";
import Link from "next/link";
import SectionTitle from "../ui/section-title";
import { ArrowRight } from "lucide-react";

const BlogsSection = () => {
  return (
    <SectionTitle title="Blogs">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.slice(0, 4).map((blog) => (
          <SingleBlog key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link href="/blogs">
          <Button
            className="w-40 group py-5 rounded-full cursor-pointer bg-[#000000] dark:text-white dark:bg-[#fafafa]/20 backdrop-blur-lg"
            variant="default"
            type="button"
          >
            All Blogs{" "}
            <ArrowRight className="group-hover:translate-x-1 transition-all duration-200" />
          </Button>
        </Link>
      </div>
    </SectionTitle>
  );
};

export default BlogsSection;
