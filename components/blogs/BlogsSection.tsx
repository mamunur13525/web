"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import SingleBlog from "./SingleBlog";
import Link from "next/link";
import SectionTitle from "../ui/section-title";
import { ArrowRight } from "lucide-react";
import { BlogType } from "@/types/types";

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/blogs");

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const result = await response.json();

        if (result.success) {
          setBlogs(result.data.slice(0, 4)); // Get only first 4 blogs
        } else {
          throw new Error(result.error || "Failed to fetch blogs");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <SectionTitle title="Blogs">
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-80 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Error loading blogs: {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <SingleBlog key={blog._id || blog.slug} blog={blog} />
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
        </>
      )}
    </SectionTitle>
  );
};

export default BlogsSection;
