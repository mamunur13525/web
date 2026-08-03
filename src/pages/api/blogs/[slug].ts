import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const { slug } = params;

    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return new Response(
        JSON.stringify({ success: false, error: "Blog not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true, data: blog }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch blog" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
