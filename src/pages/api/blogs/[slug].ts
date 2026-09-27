import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { renderMarkdown } from "@/lib/markdown";
import { cacheGet, cacheSet, withPublicCache } from "@/lib/cache";

export const prerender = false;

/**
 * Loads the post and pre-renders its markdown **on the server** so the
 * client only has to inject HTML — marked/highlight.js never ship to the
 * browser on the blog page.
 */
async function loadBlog(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug }).lean();
  if (!blog) return null;
  /* `contentHtml` rides inside `data` so existing consumers are untouched. */
  return { data: { ...blog, contentHtml: renderMarkdown(blog.content, "blog") } };
}

type BlogResult = NonNullable<Awaited<ReturnType<typeof loadBlog>>>;

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  if (!slug) return jsonResponse({ success: false, error: "Blog not found" }, 404);

  const cacheKey = `blog:${slug}`;
  const cached = cacheGet<BlogResult>(cacheKey);
  if (cached?.fresh) {
    return withPublicCache(jsonResponse({ success: true, ...cached.value }, 200));
  }

  try {
    const result = await loadBlog(slug);

    if (!result) {
      return jsonResponse({ success: false, error: "Blog not found" }, 404);
    }

    cacheSet(cacheKey, result);
    return withPublicCache(jsonResponse({ success: true, ...result }, 200));
  } catch (error) {
    if (cached) {
      return withPublicCache(jsonResponse({ success: true, ...cached.value }, 200));
    }

    console.error("Error fetching blog:", error);
    return jsonResponse({ success: false, error: "Failed to fetch blog" }, 500);
  }
};
