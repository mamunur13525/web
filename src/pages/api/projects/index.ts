import type { APIRoute } from "astro";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { fail, ok } from "@/lib/api";
import { cacheGet, cacheSet, withPublicCache } from "@/lib/cache";
import { renderMarkdown } from "@/lib/markdown";

export const prerender = false;

async function loadProjects() {
  await connectDB();
  const projects = await Project.find({}).sort({ order: 1, date: -1 }).lean();
  /* Pre-render each project's markdown server-side (mirrors the blog API)
     so client consumers only inject HTML — marked/highlight.js never ship. */
  return projects.map((project) => ({
    ...project,
    contentHtml: renderMarkdown(project.description, "project"),
  }));
}

type ProjectsResult = Awaited<ReturnType<typeof loadProjects>>;

const CACHE_KEY = "projects:all";

/**
 * GET /api/projects — public, read-only project feed.
 *
 * Exposes the same shape that is stored in the `projects` collection (plus a
 * derived `contentHtml`) so the portfolio pages (or any other client) can
 * render it.
 *
 * Served from a short-lived in-memory cache (plus `Cache-Control`) so the
 * first client-side fetch after page load answers instantly instead of
 * waiting on a Mongo round-trip. A stale entry is kept as a fallback so a
 * DB hiccup never breaks the feed.
 */
export const GET: APIRoute = async () => {
  const cached = cacheGet<ProjectsResult>(CACHE_KEY);
  if (cached?.fresh) return withPublicCache(ok(cached.value));

  try {
    const projects = await loadProjects();
    cacheSet(CACHE_KEY, projects);
    return withPublicCache(ok(projects));
  } catch (error) {
    if (cached) return withPublicCache(ok(cached.value));

    console.error("Error fetching projects:", error);
    return fail("Failed to fetch projects", 500);
  }
};
