import type { APIRoute } from "astro";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import {
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

async function readId(id: string | undefined): Promise<string | null> {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) return null;
  await connectDB();
  return id;
}

/** GET /api/admin/blogs/:id */
export const GET: APIRoute = async ({ params }) => {
  try {
    const id = await readId(params.id);
    if (!id) return fail("Invalid blog id", 400);

    const blog = await Blog.findById(id).lean();
    if (!blog) return fail("Blog not found", 404);

    return ok(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return fail("Failed to fetch blog", 500);
  }
};

/** PUT /api/admin/blogs/:id */
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = await readId(params.id);
    if (!id) return fail("Invalid blog id", 400);

    const parsed = blogSchema.safeParse(await readJson(request));
    if (!parsed.success) return validationError(parsed.error);

    const { slug: rawSlug, ...rest } = parsed.data;
    const slug = slugify(rawSlug && rawSlug.length > 0 ? rawSlug : rest.title);

    if (!slug) {
      return fail("A slug could not be generated — please provide one", 400);
    }

    if (await Blog.exists({ slug, _id: { $ne: id } })) {
      return fail(DUPLICATE_SLUG, 409);
    }

    const blog = await Blog.findByIdAndUpdate(
      id,
      { ...rest, slug },
      { new: true, runValidators: true }
    ).lean();

    if (!blog) return fail("Blog not found", 404);

    return ok(blog);
  } catch (error) {
    if (isDuplicateKeyError(error)) return fail(DUPLICATE_SLUG, 409);
    console.error("Error updating blog:", error);
    return fail("Failed to update blog", 500);
  }
};

/** DELETE /api/admin/blogs/:id */
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = await readId(params.id);
    if (!id) return fail("Invalid blog id", 400);

    const blog = await Blog.findByIdAndDelete(id).lean();
    if (!blog) return fail("Blog not found", 404);

    return ok({ _id: id });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return fail("Failed to delete blog", 500);
  }
};
