import type { APIRoute } from "astro";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { fail, ok, readJson, validationError } from "@/lib/api";
import { projectSchema, reorderSchema } from "@/lib/validation";

export const prerender = false;

function invalidId(id: string | undefined): boolean {
  return !id || !mongoose.Types.ObjectId.isValid(id);
}

/** GET /api/admin/projects/:id */
export const GET: APIRoute = async ({ params }) => {
  try {
    if (invalidId(params.id)) return fail("Invalid project id", 400);
    await connectDB();

    const project = await Project.findById(params.id).lean();
    if (!project) return fail("Project not found", 404);

    return ok(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return fail("Failed to fetch project", 500);
  }
};

/** PUT /api/admin/projects/:id */
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    if (invalidId(params.id)) return fail("Invalid project id", 400);

    const parsed = projectSchema.safeParse(await readJson(request));
    if (!parsed.success) return validationError(parsed.error);

    await connectDB();

    const project = await Project.findByIdAndUpdate(
      params.id,
      { ...parsed.data, date: new Date(parsed.data.date) },
      { new: true, runValidators: true }
    ).lean();

    if (!project) return fail("Project not found", 404);

    return ok(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return fail("Failed to update project", 500);
  }
};

/** DELETE /api/admin/projects/:id */
export const DELETE: APIRoute = async ({ params }) => {
  try {
    if (invalidId(params.id)) return fail("Invalid project id", 400);
    await connectDB();

    const project = await Project.findByIdAndDelete(params.id).lean();
    if (!project) return fail("Project not found", 404);

    return ok({ _id: params.id });
  } catch (error) {
    console.error("Error deleting project:", error);
    return fail("Failed to delete project", 500);
  }
};

