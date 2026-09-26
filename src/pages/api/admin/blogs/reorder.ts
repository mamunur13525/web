import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { fail, ok, readJson, validationError } from "@/lib/api";
import { reorderSchema } from "@/lib/validation";

export const prerender = false;

/** PUT /api/admin/blogs/reorder — persist the admin drag-and-drop order. */
export const PUT: APIRoute = async ({ request }) => {
  try {
    const parsed = reorderSchema.safeParse(await readJson(request));
    if (!parsed.success) return validationError(parsed.error);

    await connectDB();

    await Blog.bulkWrite(
      parsed.data.ids.map((id, index) => ({
        updateOne: {
          /* `data-row-id` values are Mongo `_id` strings (24-hex). Mongoose
             casts the string to ObjectId; malformed ids throw and are caught
             below, mirroring the projects reorder endpoint. */
          filter: { _id: id },
          update: { $set: { order: index } },
        },
      }))
    );

    return ok({ updated: parsed.data.ids.length });
  } catch (error) {
    console.error("Error reordering blogs:", error);
    return fail("Failed to save blog order", 500);
  }
};
