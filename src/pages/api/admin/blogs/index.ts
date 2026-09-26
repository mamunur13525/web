import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import {
  escapeRegex,
  fail,
  isDuplicateKeyError,
  ok,
  readJson,
  validationError,
} from "@/lib/api";
import { blogSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export const prerender = false;

const DUPLICATE_SLUG = "A blog post with this slug already exists";

/** GET /api/admin/blogs — list posts (manual order, then newest). */
export const GET: APIRoute = async ({ url }) => {
  try {
    await connectDB();

    const q = (url.searchParams.get("q") ?? "").trim();
    const category = (url.searchParams.get("category") ?? "").trim();

    const query: Record<string, unknown> = {};
    if (q) {
      query.$or = [
        { title: { $regex: escapeRegex(q), $options: "i" } },
        { slug: { $regex: escapeRegex(q), $options: "i" } },
      ];
    }
    if (category) query.category = category;

    const blogs = await Blog.find(query).sort({ order: 1, date: -1 }).lean();

    return ok(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return fail("Failed to fetch blogs", 500);
  }
};

/** POST /api/admin/blogs — create a post. */
export const POST: APIRoute = async ({ request }) => {
  try {
    const parsed = blogSchema.safeParse(await readJson(request));
    if (!parsed.success) return validationError(parsed.error);

    const { slug: rawSlug, ...rest } = parsed.data;
    const slug = slugify(rawSlug && rawSlug.length > 0 ? rawSlug : rest.title);

    if (!slug) {
      return fail("A slug could not be generated — please provide one", 400);
    }

    await connectDB();

    if (await Blog.exists({ slug })) return fail(DUPLICATE_SLUG, 409);

    const blog = await Blog.create({ ...rest, slug });

    return ok(blog.toObject(), 201);
  } catch (error) {
    if (isDuplicateKeyError(error)) return fail(DUPLICATE_SLUG, 409);
    console.error("Error creating blog:", error);
    return fail("Failed to create blog", 500);
  }
};
