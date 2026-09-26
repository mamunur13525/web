import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import type { AdminProjectType, ProjectType } from "@/types/types";
import { formatDate, slugify } from "@/lib/utils";

/**
 * Raw project documents from the `projects` collection (dates stringified
 * for transport). Ordered by the admin drag-order (`order` asc), then newest
 * date — so the manual arrangement in `/admin/projects` is what the site shows.
 */
export async function getAdminProjects(
  limit?: number
): Promise<AdminProjectType[]> {
  await connectDB();
  const query = Project.find({}).sort({ order: 1, date: -1 });
  if (limit) query.limit(limit);
  const docs = await query.lean();
  return JSON.parse(JSON.stringify(docs)) as AdminProjectType[];
}

/**
 * Adapts a DB project to the `ProjectType` view shape the public components
 * (`ProjectsSection`, `ProjectCard`) render. The DB schema stores a single
 * `description`, `live_preview` / `github_link` links and a
 * `technologies` array; the demo shape they were built for is derived here.
 */
export function toProjectView(
  doc: AdminProjectType,
  index: number
): ProjectType {
  const preview = doc.image?.preview || doc.image?.full || "";
  const full = doc.image?.full || doc.image?.preview || "";
  return {
    id: index,
    icon: doc.icon || undefined,
    image: { thumbnail: preview, full_screen: full },
    title: doc.title,
    date: formatDate(doc.date),
    content: doc.description,
    slug: slugify(doc.title),
    live: {
      preview: doc.live_preview || "",
      git: doc.github_link || "",
    },
    type: doc.technologies ?? [],
  };
}

/** DB projects, newest first, ready for the public components. */
export async function getProjects(limit?: number): Promise<ProjectType[]> {
  const docs = await getAdminProjects(limit);
  return docs.map(toProjectView);
}
