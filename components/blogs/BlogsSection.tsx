"use client";

import { blogs } from "@/data/demo/blogs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const BlogsSection = () => {
  return (
    <section className="py-12 md:py-16">
      <h1 className="flex flex-col md:flex-row items-start md:items-center gap-2 text-3xl md:text-4xl font-bold tracking-wide font-stack mb-8">
        Blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.slice(0, 4).map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="group block"
          >
            <div className="border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2">
              {/* Image */}
              <div className="relative w-full h-[200px] rounded-xl overflow-hidden  bg-gray-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="py-6 px-1">
                <h3 className="text-lg leading-5 font-semibold mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground">{blog.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          className="px-6 py-5 rounded-full cursor-pointer bg-[#000000]"
          variant="default"
        >
          See More
        </Button>
      </div>
    </section>
  );
};

export default BlogsSection;
