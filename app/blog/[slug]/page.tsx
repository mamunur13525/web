"use client";

import { blogs } from "@/data/demo/blogs";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NestedNavbar from "@/components/NestedNavbar";
import Navbar from "@/components/Navbar";
import FullscreenImage from "@/components/ui/fullscreen-image";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="mb-4">
        <NestedNavbar />
      </div>

      <article>
        <div className="mb-6">
          <span className="text-sm text-muted-foreground">{blog.category}</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
            {blog.title}
          </h1>
          <p className="text-muted-foreground">{blog.date}</p>
        </div>

        {blog.image && (
          <FullscreenImage
            src={blog.image}
            alt={blog.title}
            className="object-cover"
          />
        )}

        <div className="prose prose-zinc max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl md:text-4xl font-bold mb-6 mt-8 text-zinc-900"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-zinc-900"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-zinc-900"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-zinc-700 leading-relaxed mb-4 text-base md:text-lg"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul className="space-y-2 mb-6 ml-6" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="space-y-2 mb-6 ml-6 list-decimal" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="flex items-start gap-2 text-zinc-800 text-base md:text-lg">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                  <span {...props} />
                </li>
              ),
              code: ({ node, ...props }) => (
                <code
                  className="bg-zinc-100 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-900"
                  {...props}
                />
              ),
              pre: ({ node, ...props }) => (
                <pre
                  className="bg-zinc-900 text-zinc-100 p-4 rounded-lg overflow-x-auto mb-6"
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="border-l-4 border-zinc-300 pl-4 italic text-zinc-600 my-6"
                  {...props}
                />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
