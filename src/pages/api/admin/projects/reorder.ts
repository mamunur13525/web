import type { APIRoute } from "astro";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { fail, ok, readJson, validationError } from "@/lib/api";
import { reorderSchema } from "@/lib/validation";

export const prerender = false;

/** PUT /api/admin/projects/reorder — persist the admin drag order. */
export const PUT: APIRoute = async ({ request }) => {
  try {
    const parsed = reorderSchema.safeParse(await readJson(request));
    if (!parsed.success) return validationError(parsed.error);

    await connectDB();

    const writes = parsed.data.ids.map((id, index) => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(id) },
        update: { $set: { order: index } },
      },
    }));

    await Project.bulkWrite(writes);

    return ok({ updated: parsed.data.ids.length });
  } catch (error) {
    console.error("Error reordering projects:", error);
    return fail("Failed to save the new order", 500);
  }
};
