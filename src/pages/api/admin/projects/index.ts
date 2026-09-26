import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { escapeRegex, fail, ok, readJson, validationError } from "@/lib/api";
import { projectSchema } from "@/lib/validation";

export const prerender = false;

/** GET /api/admin/projects — list projects (manual order, then newest). */
export const GET: APIRoute = async ({ url }) => {
  try {
    await connectDB();

    const q = (url.searchParams.get("q") ?? "").trim();
    const query = q ? { title: { $regex: escapeRegex(q), $options: "i" } } : {};

    const projects = await Project.find(query).sort({ order: 1, date: -1 }).lean();

    return ok(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return fail("Failed to fetch projects", 500);
  }
};

/** POST /api/admin/projects — create a project. */
export const POST: APIRoute = async ({ request }) => {
  try {
    const parsed = projectSchema.safeParse(await readJson(request));
    if (!parsed.success) return validationError(parsed.error);

    await connectDB();

    const project = await Project.create({
      ...parsed.data,
      date: new Date(parsed.data.date),
    });

    return ok(project.toObject(), 201);
  } catch (error) {
    console.error("Error creating project:", error);
    return fail("Failed to create project", 500);
  }
};
