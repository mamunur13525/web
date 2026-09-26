/** Seed data for the `blogs` collection (`src/models/Blog.ts`). */
export const blogs = [
  {
    title: "Understanding React Server Components",
    slug: "understanding-react-server-components",
    excerpt: "Server Components change how we fetch data and ship UI in React. Here is how they work and when to reach for them.",
    category: "React",
    image: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
    date: "2025-10-12",
    content: `React Server Components let you render parts of your UI on the server, close to your data, and stream the result to the client.

## Why they matter

- Zero client JavaScript for server-rendered parts
- Direct access to databases and file systems
- Automatic code-splitting by route segment

## Mental model

Think of your tree as two kinds of components:

1. **Server Components** — async, data-heavy, no hooks or browser APIs.
2. **Client Components** — interactive, marked with \`'use client'\`, hydrated in the browser.

\`\`\`tsx
// app/posts/page.tsx — a Server Component
import { db } from "@/lib/db";

export default async function PostsPage() {
  const posts = await db.post.findMany({ take: 10 });
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Rules of thumb

- Fetch data in Server Components, keep Client Components small.
- Pass serializable props across the server/client boundary.
- Use \`Suspense\` boundaries for streaming fallbacks.`,
  },
  {
    title: "TypeScript Narrowing Patterns You Should Know",
    slug: "typescript-narrowing-patterns",
    excerpt: "Discriminated unions, type guards, and assertion functions — the narrowing toolkit that makes TypeScript feel safe.",
    category: "TypeScript",
    image: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
    date: "2025-09-28",
    content: `Narrowing is how TypeScript shrinks a broad type down to something you can safely use.

## Discriminated unions

\`\`\`ts
type Result =
  | { status: "ok"; data: string }
  | { status: "error"; message: string };

function handle(result: Result) {
  if (result.status === "ok") {
    console.log(result.data); // narrowed!
  } else {
    console.error(result.message); // narrowed!
  }
}
\`\`\`

## Custom type guards

\`\`\`ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
\`\`\`

## Assertion functions

\`\`\`ts
function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined) throw new Error("Expected a value");
}
\`\`\`

Prefer \`unknown\` over \`any\` at boundaries, then narrow inward.`,
  },
  {
    title: "Data Fetching in Next.js: A Practical Guide",
    slug: "nextjs-data-fetching-guide",
    excerpt: "fetch with cache options, revalidation strategies, and when to move logic to Server Actions.",
    category: "Next.js",
    image: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
    date: "2025-08-17",
    content: `Next.js gives you several ways to fetch data. Picking the right one matters for freshness and performance.

## Static vs dynamic

- **Static** (default): fetched at build time, cached until revalidated.
- **Dynamic**: fetched per request with \`cache: "no-store"\` or dynamic APIs.

\`\`\`ts
// Revalidate every 60 seconds
const res = await fetch("https://api.example.com/posts", {
  next: { revalidate: 60 },
});
\`\`\`

## Server Actions for mutations

\`\`\`ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  await db.post.create({ data: { title } });
}
\`\`\`

## Checklist

- Keep secrets on the server — never prefix them with \`NEXT_PUBLIC_\`.
- Co-locate fetching with the component that needs it.
- Add \`loading.tsx\` and \`error.tsx\` for graceful states.`,
  },
  {
    title: "MongoDB Indexing Basics for Web Developers",
    slug: "mongodb-indexing-basics",
    excerpt: "Why your queries are slow, how compound indexes work, and the explain() output that tells you the truth.",
    category: "MongoDB",
    image: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
    date: "2025-07-05",
    content: `Indexes are the difference between a 3ms query and a 3s collection scan.

## Useful indexes

\`\`\`js
// Single-field index for category filters
db.blogs.createIndex({ category: 1 });

// Compound index: equality first, then sort/range
db.blogs.createIndex({ category: 1, date: -1 });
\`\`\`

## Reading explain()

\`\`\`js
db.blogs.find({ category: "React" }).sort({ date: -1 }).explain("executionStats");
\`\`\`

Look for \`IXSCAN\` (good) vs \`COLLSCAN\` (bad), and check \`nReturned\` vs \`totalDocsExamined\` — a big gap means a missing index.

## Rules of thumb

- Index what you filter and sort by together.
- Too many indexes slow down writes — measure, don't guess.`,
  },
  {
    title: "Astro Islands: Ship Less JavaScript",
    slug: "astro-islands-less-javascript",
    excerpt: "Astro renders to static HTML by default and hydrates only what you mark interactive. A quick tour of client directives.",
    category: "Astro",
    image: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
    date: "2025-06-14",
    content: `Astro's big idea: render everything on the server, then hydrate small "islands" of interactivity on demand.

## Client directives

\`\`\`astro
---
import Counter from "../components/Counter.jsx";
---

<!-- static HTML, zero JS -->
<Counter />

<!-- hydrated on load / when visible -->
<Counter client:load />
<Counter client:visible />
\`\`\`

## Where it shines

- Content sites, blogs, portfolios, docs.
- Pages with one or two interactive widgets.
- Anything where bundle size directly hurts UX.

Keep interactive components small and push data fetching to the server — your Lighthouse score will thank you.`,
  },
];
