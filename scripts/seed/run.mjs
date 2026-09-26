/**
 * Seeds the `projects` and `blogs` collections. Idempotent: existing
 * documents are updated in place (matched by title / slug), never duplicated.
 *
 * Usage:
 *   MONGODB_URI="mongodb://127.0.0.1:27017/portfolio" node scripts/seed/run.mjs
 *   MONGODB_URI="..." pnpm seed
 */
import mongoose from "mongoose";
import { projects } from "./projects.mjs";
import { blogs } from "./blogs.mjs";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI. Example:");
  console.error('  MONGODB_URI="mongodb://127.0.0.1:27017/portfolio" pnpm seed');
  process.exit(1);
}

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    icon: { type: String, default: "", trim: true },
    date: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    live_preview: { type: String, default: "", trim: true },
    github_link: { type: String, default: "", trim: true },
    image: {
      type: new mongoose.Schema(
        {
          full: { type: String, default: "", trim: true },
          preview: { type: String, default: "", trim: true },
        },
        { _id: false }
      ),
      default: () => ({ full: "", preview: "" }),
    },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.models.Project ?? mongoose.model("Project", projectSchema, "projects");
const Blog = mongoose.models.Blog ?? mongoose.model("Blog", blogSchema, "blogs");

await mongoose.connect(uri);

let projectUpserts = 0;
for (const project of projects) {
  await Project.updateOne({ title: project.title }, { $set: project }, { upsert: true });
  projectUpserts += 1;
}

let blogUpserts = 0;
for (const blog of blogs) {
  await Blog.updateOne({ slug: blog.slug }, { $set: blog }, { upsert: true });
  blogUpserts += 1;
}

const [projectCount, blogCount] = await Promise.all([
  Project.countDocuments(),
  Blog.countDocuments(),
]);

console.log(`Projects: upserted ${projectUpserts}, total ${projectCount}`);
console.log(`Blogs: upserted ${blogUpserts}, total ${blogCount}`);

await mongoose.disconnect();
