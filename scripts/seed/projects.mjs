/**
 * Seed data for the `projects` collection.
 * Converted from `src/data/demo/projects.ts` to the DB shape.
 * - `content` -> `description`
 * - `live.preview` -> `live_preview`, `live.git` -> `github_link`
 * - `image.thumbnail` -> `image.preview`, `image.full_screen` -> `image.full`
 * - `type` -> `technologies`
 * - date ranges ("2024 - 2025") -> representative ISO date (sorts newest-first).
 */
export const projects = [
  {
    title: "Flow AI Studio",
    icon: "/icons/flow.ico",
    date: "2025-03-01",
    description: `Flow AI is an AI-powered document processing and workflow automation system built for professionals who think in systems.

Unlike traditional tools, Flow AI lets you design structured, scalable workflows for faster processing, greater control, and seamless collaboration.

## Key Features

- AI-powered document processing and workflow automation
- Structured, scalable workflow design for professionals
- Real-time collaboration capabilities
- Fast processing with greater control`,
    live_preview: "https://app.flowaistudio.com",
    github_link: "",
    image: {
      full: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/aistudioflow_HcPd3T514Q.webp?updatedAt=1762757909355",
      preview: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/flowaistudio-1_MNqdrJgBP3.webp?updatedAt=1762756994858",
    },
    technologies: ["Company Project", "AI", "React", "PostgresSQL", "Tailwind", "Hono.js"],
  },
  {
    title: "Nexvio AI",
    icon: "/icons/nexvio.webp",
    date: "2024-11-01",
    description: `Automate customer support with Nexvio Agents, an AI-powered chatbot platform for seamless 24/7 customer interactions.

Transform customer interactions into seamless, 24/7 experiences that boost satisfaction, capture leads, and drive revenue—all while cutting costs.

## Core Capabilities

- 24/7 automated customer support
- Seamless AI-powered chatbot interactions
- Boost satisfaction and capture leads
- Drive revenue while cutting costs`,
    live_preview: "https://nexvio.ai",
    github_link: "",
    image: {
      full: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/nexvio_jsVB1byLsb.webp?updatedAt=1762757909431",
      preview: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/nexvioshort-1_P6Whb1owe.webp?updatedAt=1762758164846",
    },
    technologies: ["front-end", "ai", "chat-bot", "web-app"],
  },
  {
    title: "Zyber AI",
    icon: "/icons/zyberai.webp",
    date: "2024-04-01",
    description: `Zyber AI is a comprehensive AI platform offering text generation, image synthesis, code generation, intelligent chatbots, and speech-to-text.

## Key Capabilities

- **AI Text Generation**: high-quality content for various use cases.
- **AI Image Generator**: visuals from text descriptions.
- **AI Code Generator**: intelligent code suggestions.
- **AI Chat Bot**: smart conversational agents.
- **Speech to Text**: accurate transcription.
- **Template Library**: templates for text, image, and code generation.`,
    live_preview: "https://zyberai.netlify.app",
    github_link: "",
    image: {
      full: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/zyberai_GX6_Ds-SQ.png",
      preview: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/zyberai_GX6_Ds-SQ.png",
    },
    technologies: ["full-stack"],
  },
  {
    title: "Mamun AI Portfolio",
    icon: "/icons/logo.ico",
    date: "2025-11-01",
    description: `A minimal, pixel-perfect AI-powered dev portfolio, component registry, and blog.

## Featured

- Clean & modern design
- Light/Dark themes
- vCard integration
- SEO optimized (JSON-LD schema, sitemap, robots)
- AI-ready with /llms.txt
- Spam-protected email
- Installable as PWA

## Blog

- Supports MDX & Markdown
- Syntax highlighting for clear code presentation
- Dynamic OG images for rich link previews
- RSS feed for easy content distribution`,
    live_preview: "https://mamundev-steel.vercel.app",
    github_link: "https://github.com/mamunur13525/web",
    image: {
      full: "",
      preview: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
    },
    technologies: ["full-stack", "mongodb", "next.js", "tailwind", "typescript", "vercel", "ci-cd", "mongoose", "AI"],
  },
  {
    title: "E-Commerce",
    icon: "/icons/e-commerce.webp",
    date: "2023-08-01",
    description: `A full-featured e-commerce platform specialized in fresh fruit sales. Includes shopping cart functionality, secure checkout, product categorization, and real-time inventory management.

## E-Commerce Features

- Shopping cart functionality
- Secure checkout process
- Product categorization
- Real-time inventory management`,
    live_preview: "https://e-garden-shop.vercel.app",
    github_link: "https://github.com/mamunur13525/e-commerce",
    image: {
      full: "",
      preview: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/fruits-e-commerce_SS17K5pM3.png?updatedAt=1762599897673",
    },
    technologies: ["full-stack", "web_app"],
  },
  {
    title: "Course Blog Site",
    icon: "/icons/free-course.webp",
    date: "2023-03-01",
    description: `A comprehensive blog platform focused on educational content and online courses. Features course listings, blog posts, user authentication, and a responsive design that works seamlessly across all devices.

## Platform Features

- Course listings and educational content
- Blog posts and articles
- User authentication system
- Responsive design for all devices

## Source Code

- Frontend: https://github.com/mamunur13525/free_course_front
- Backend: https://github.com/mamunur13525/free_course_back`,
    live_preview: "https://course-free.netlify.app",
    github_link: "https://github.com/mamunur13525/free_course_front",
    image: {
      full: "",
      preview: "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/free-course_vEjskA84X.png?updatedAt=1762599897613",
    },
    technologies: ["full-stack"],
  },
];
