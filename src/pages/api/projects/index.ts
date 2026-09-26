import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { fail, ok } from "@/lib/api";

export const prerender = false;

/**
 * GET /api/projects — public, read-only project feed.
 *
 * Exposes the same shape that is stored in the `projects` collection so the
 * portfolio pages (or any other client) can render it.
 */
export const GET: APIRoute = async () => {
  try {
    await connectDB();

    const projects = await Project.find({}).sort({ order: 1, date: -1 }).lean();

    return ok(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return fail("Failed to fetch projects", 500);
  }
};
