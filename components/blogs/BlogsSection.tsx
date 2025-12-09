"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import SingleBlog from "./SingleBlog";
import Link from "next/link";
import SectionTitle from "../ui/section-title";
import { ArrowRight } from "lucide-react";
import { BlogType } from "@/types/types";
import { Skeleton } from "../ui/skeleton";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="mt-10 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Error loading blogs: {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-10">
          {blogs.length > 0 ? (
            blogs.map((blog: BlogType) => (
              <SingleBlog key={blog._id || blog.slug} blog={blog} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">
                No blogs found in this category.
              </p>
            </div>
          )}
        </div>
      )}
    </SectionTitle>
  );
};

export default BlogsSection;
