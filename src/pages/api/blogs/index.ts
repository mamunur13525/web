import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { cacheGet, cacheSet, withPublicCache } from "@/lib/cache";

export const prerender = false;

async function loadBlogs(category: string | null) {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (category && category !== "") {
    query.category = category;
  }

  return Blog.find(query)
    .select("title slug excerpt category image date")
    .sort({ order: 1, date: -1 })
    .lean();
}

type BlogsResult = Awaited<ReturnType<typeof loadBlogs>>;

export const GET: APIRoute = async ({ url }) => {
  const category = url.searchParams.get("category");
  /* Keyed per category so each filter gets its own short-lived entry. */
  const cacheKey = `blogs:${category ?? ""}`;

  const cached = cacheGet<BlogsResult>(cacheKey);
  if (cached?.fresh) {
    return withPublicCache(
      new Response(JSON.stringify({ success: true, data: cached.value }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  try {
    const blogs = await loadBlogs(category);
    cacheSet(cacheKey, blogs);

    return withPublicCache(
      new Response(JSON.stringify({ success: true, data: blogs }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  } catch (error) {
    if (cached) {
      return withPublicCache(
        new Response(JSON.stringify({ success: true, data: cached.value }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    }

    console.error("Error fetching blogs:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch blogs" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
