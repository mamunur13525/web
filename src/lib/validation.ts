import * as z from "zod";

/**
 * Shared zod schemas for the admin API. Kept in one place so the create and
 * update routes validate identically.
 */

const ASSET_MAX = 1000;

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Accepts an empty string, a valid http(s) URL or a site-relative path. */
function assetUrlField(label: string) {
  return z
    .string()
    .trim()
    .max(ASSET_MAX, `${label} is too long`)
    .refine((value) => value === "" || value.startsWith("/") || isValidHttpUrl(value), {
      message: `${label} must be a URL or a path starting with "/"`,
    });
}

/** Accepts an empty string or a valid http(s) URL. */
function urlField(label: string) {
  return z
    .string()
    .trim()
    .max(ASSET_MAX, `${label} is too long`)
    .refine((value) => value === "" || isValidHttpUrl(value), {
      message: `${label} must be a valid URL (http:// or https://)`,
    });
}

const dateField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: `${label} must be a valid date`,
    });

export const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  icon: assetUrlField("Icon").default(""),
  date: dateField("Date"),
  description: z.string().trim().min(1, "Description is required"),
  live_preview: urlField("Live preview").default(""),
  github_link: urlField("GitHub link").default(""),
  image: z
    .object({
      full: assetUrlField("Full image").default(""),
      preview: assetUrlField("Preview image").default(""),
    })
    .default({ full: "", preview: "" }),
  technologies: z
    .array(z.string().trim().min(1))
    .max(50, "Too many technologies")
    .default([]),
  /* Manual display position; only used by the reorder endpoint. */
  order: z.number().int().min(0).max(100000).optional(),
});

export type ProjectInput = z.infer<typeof projectSchema>;

/**
 * Validates the ordered id list sent by the admin drag-to-reorder UI.
 * Caps at 500 ids to keep the reorder endpoint cheap.
 */
export const reorderSchema = z.object({
  ids: z
    .array(z.string().trim().min(1).max(40))
    .min(1, "At least one id is required")
    .max(500, "Too many items to reorder at once"),
});

export type ReorderInput = z.infer<typeof reorderSchema>;

export const blogSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  /* Optional: generated from the title when left empty. */
  slug: z.string().trim().max(200, "Slug is too long").optional(),
  excerpt: z.string().trim().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  category: z.string().trim().min(1, "Category is required"),
  image: z.string().trim().min(1, "Image is required"),
  date: dateField("Date"),
  /* Manual display position; only used by the reorder endpoint. */
  order: z.number().int().min(0).max(100000).optional(),
});

export type BlogInput = z.infer<typeof blogSchema>;
