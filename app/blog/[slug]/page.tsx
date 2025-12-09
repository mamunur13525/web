import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import NestedNavbar from "@/components/NestedNavbar";
import FullscreenImage from "@/components/ui/fullscreen-image";
import { CodeBlock } from "@/components/ui/code-block";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blog slugs
export async function generateStaticParams() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).select("slug").lean();

    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return {
        title: "Blog Not Found",
      };
    }

    return {
      title: blog.title,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [blog.image],
        type: "article",
        publishedTime: blog.date,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: [blog.image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog",
    };
  }
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      notFound();
    }

    return (
      <main>
        <div className="mb-4">
          <NestedNavbar />
        </div>

        <article>
          <div className="mb-6">
            <span className="text-sm text-muted-foreground">
              {blog.category}
            </span>
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
            <MDXRemote
              source={blog.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl md:text-4xl font-bold mb-6 mt-8 text-foreground"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl md:text-3xl font-semibold mb-4 mt-8 text-foreground"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-foreground"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p
                    className="text-muted-foreground leading-relaxed mb-4 text-base md:text-lg"
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
                  <li className="flex items-start gap-2 text-muted-foreground text-base md:text-lg">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/40 shrink-0" />
                    <span {...props} />
                  </li>
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="px-1.5 py-0.5 rounded text-sm font-mono text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => <CodeBlock {...props} />,
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-border pl-4 italic text-muted-foreground my-6"
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
            />
          </div>
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error loading blog:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Error Loading Blog</h1>
          <p className="text-muted-foreground mb-4">
            There was an error loading this blog post.
          </p>
          <Link href="/blogs" className="text-primary hover:underline">
            View all blogs
          </Link>
        </div>
      </div>
    );
  }
}
