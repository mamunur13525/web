# Astro Starter Kit: Minimal

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🔐 Admin panel

Content for **projects** and **blogs** is managed from a MongoDB-backed admin
panel at **`/admin`** (single-password login, no user accounts).

### Setup

```sh
cp .env.example .env
```

Then fill in:

| Variable | Required | Purpose |
| :--- | :--- | :--- |
| `MONGODB_URI` | yes | MongoDB connection string (local or Atlas). |
| `ADMIN_PASSWORD` | yes | Password for `/admin/login`. Without it the panel stays locked. |
| `ADMIN_SESSION_SECRET` | no | Signing secret for the session cookie (falls back to `ADMIN_PASSWORD`). |

### Usage

1. Start the dev server (`astro dev --background`).
2. Open `http://localhost:4321/admin` and sign in with `ADMIN_PASSWORD`.
3. Manage content:
   - `/admin/projects` — list, create, edit, delete projects.
   - `/admin/blogs` — list, create, edit, delete posts (published instantly to `/blogs`).

The admin area is protected by `src/middleware.ts`; every `/admin` page and
`/api/admin/*` route returns `401`/redirects unless a valid signed cookie is
present. Admin pages are `noindex, nofollow`.

### Project document

```js
{
  title: "Flow AI Studio",          // string, required
  icon: "/icons/flow.ico",          // string (path or URL)
  date: ISODate("2025-06-01"),      // date, required
  description: "…",                 // string (markdown), required
  live_preview: "https://…",        // url
  github_link: "https://…",         // url
  image: { full: "https://…", preview: "https://…" },
  technologies: ["React", "MongoDB"] // [string]
}
```

Blog documents re-use the existing `blogs` collection/model
(`src/models/Blog.ts`).

### Seeding the database

Demo content lives in `scripts/seed/` and can be loaded into MongoDB with:

```sh
MONGODB_URI="mongodb://127.0.0.1:27017/portfolio" pnpm seed
```

What it loads:

- `scripts/seed/projects.mjs` — all 6 projects from the old
  `src/data/demo/projects.ts`, converted to the DB schema (`content` →
  `description`, `live.preview`/`live.git` → `live_preview`/`github_link`,
  `image.thumbnail`/`full_screen` → `image.preview`/`full`, `type` →
  `technologies`; the display date ranges become representative ISO dates so
  newest-first sorting works). The demo's extra `backend` link for the
  "Course Blog Site" is preserved inside its description, since the schema
  has a single `github_link` field.
- `scripts/seed/blogs.mjs` — 5 tech posts (React, TypeScript, Next.js,
  MongoDB, Astro) with Markdown content and code samples that render with
  the site's syntax highlighting.

The script is **idempotent** — re-running it updates the same documents
(matched by project `title` / blog `slug`) instead of inserting duplicates,
so it's safe to run after editing content by hand in the admin panel.

### API

All admin endpoints require the session cookie.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/admin/login` · `/api/admin/logout` | Create / clear the session. |
| `GET` `POST` | `/api/admin/projects` | List / create projects. |
| `GET` `PUT` `DELETE` | `/api/admin/projects/:id` | Read / update / delete one project. |
| `GET` `POST` | `/api/admin/blogs` | List / create posts (slug auto-generated when omitted). |
| `GET` `PUT` `DELETE` | `/api/admin/blogs/:id` | Read / update / delete one post. |
| `GET` | `/api/projects` | Public, read-only project feed. |

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
