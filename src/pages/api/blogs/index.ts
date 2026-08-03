import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    await connectDB();

    const category = url.searchParams.get("category");

    let query = {};
    if (category && category !== "") {
      query = { category };
    }

    const blogs = await Blog.find(query)
      .select("title slug excerpt category image date")
      .sort({ date: -1 })
      .lean();

    return new Response(JSON.stringify({ success: true, data: blogs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch blogs" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
