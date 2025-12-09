import flowai from "../../assets/icons/flow.ico";
import nexvio from "../../assets/icons/nexvio.webp";
import zyberai from "../../assets/icons/zyberai.webp";
import logo from "../../assets/icons/logo.ico";
import eCommerce from '../../assets/icons/e-commerce(1).webp'
import course from '../../assets/icons/free-course.webp'

const projects = [
  {
    id: 8,
    icon: flowai,
    image: {
      thumbnail:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/flowaistudio-1_MNqdrJgBP3.webp?updatedAt=1762756994858",
      full_screen:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/aistudioflow_HcPd3T514Q.webp?updatedAt=1762757909355",
    },
    title: "Flow AI Studio",
    date: "2024 - 2025",
    content: `Flow AI is an AI-powered document processing and workflow automation system built for professionals who think in systems.

Unlike traditional tools, Flow AI lets you design structured, scalable workflows for faster processing, greater control, and seamless collaboration.

## Key Features

- AI-powered document processing and workflow automation
- Structured, scalable workflow design for professionals
- Real-time collaboration capabilities
- Fast processing with greater control`,
    slug: "flow-ai-studio",
    live: {
      preview: "https://app.flowaistudio.com",
      git: "",
    },
    type: [
      "Company Project",
      "AI",
      "React",
      "PostgresSQL",
      "Tailwind",
      "Hono.js",
    ],
  },
  {
    id: 7,
    icon: nexvio,
    image: {
      thumbnail:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/nexvioshort-1_P6Whb1owe.webp?updatedAt=1762758164846",
      full_screen:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/nexvio_jsVB1byLsb.webp?updatedAt=1762757909431",
    },
    title: "Nexvio AI",
    date: `2024 - 2025`,
    content: `Automate customer support with Nexvio Agents, an AI-powered chatbot platform for seamless 24/7 customer interactions.

Transform customer interactions into seamless, 24/7 experiences that boost satisfaction, capture leads, and drive revenue—all while cutting costs.

## Core Capabilities

- 24/7 automated customer support
- Seamless AI-powered chatbot interactions
- Boost satisfaction and capture leads
- Drive revenue while cutting costs`,
    slug: "nexvio-ai-chat-bot",
    live: {
      preview: "https://nexvio.ai",
      git: "",
    },
    type: ["front-end", "ai", "chat-bot", "web-app"],
  },
  {
    id: 6,
    icon: zyberai,
    image: {
      thumbnail:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/zyberai_GX6_Ds-SQ.png",
      full_screen:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/zyberai_GX6_Ds-SQ.png",
    },
    title: "Zyber AI",
    date: "2023 - 2024",
    content: `Zyber AI is a comprehensive AI platform offering a suite of generative tools including text generation, image synthesis, code generation, intelligent chatbots, and speech-to-text capabilities.

The platform features a wide array of pre-built templates for text, image, and code generation, designed to streamline content creation workflows and boost productivity.

## Key Capabilities

- **AI Text Generation**: Create high-quality content for various use cases.
- **AI Image Generator**: Generate stunning visuals from text descriptions.
- **AI Code Generator**: Accelerate development with intelligent code suggestions.
- **AI Chat Bot**: Deploy smart conversational agents.
- **Speech to Text**: Accurate transcription services.
- **Template Library**: Multiple templates for text, image, and code generation.`,
    slug: "zyber-ai",
    live: {
      preview: "https://zyberai.netlify.app",
      git: "",
    },
    type: ["full-stack"],
  },

  {
    id: 1,
    image: {
      thumbnail:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/mamun-website_R6gwhhpyb8.png",
      full_screen: "",
    },
    icon: logo,
    title: "Mamun AI Portfolio",
    date: "2025 - Present",
    content: `A minimal, pixel-perfect AI-powered dev portfolio, component registry, and blog.

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
- Raw .mdx endpoints for AI readability
- Syntax highlighting for clear code presentation
- Dynamic OG images for rich link previews
- RSS feed for easy content distribution

## Registry

- Easily build and distribute reusable components, hooks, and pages using a custom registry powered by the shadcn CLI.
- Each entry is well-documented and includes:
  - Live preview & code snippets
  - Beautiful, readable code blocks
  - One-click command blocks (pnpm, npm, yarn, bun)`,
    slug: "mamundev-steel",
    live: {
      preview: "https://mamundev-steel.vercel.app",
      git: "https://github.com/mamunur13525/web",
    },
    type: [
      "full-stack",
      "mongodb",
      "next.js",
      "tailwind",
      "typescript",
      "vercel",
      "ci-cd",
      "mongoose",
      "AI",
    ],
  },
  {
    id: 5,
    image: {
      thumbnail:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/fruits-e-commerce_SS17K5pM3.png?updatedAt=1762599897673",
      full_screen: "",
    },
    icon: eCommerce,

    title: "Fruits E-Commerce App",
    date: "2023",
    content: `A full-featured e-commerce platform specialized in fresh fruit sales. Includes shopping cart functionality, secure checkout, product categorization, and real-time inventory management.

## E-Commerce Features

- Shopping cart functionality
- Secure checkout process
- Product categorization
- Real-time inventory management`,
    slug: "fruits-e-commerce-app",
    live: {
      preview: "https://e-commerce-blue-nu.vercel.app",
      git: "https://github.com/mamunur13525/e-commerce",
    },
    type: ["full-stack", "web_app"],
  },

  {
    id: 2,
    image: {
      thumbnail:
        "https://ik.imagekit.io/b1lhvbzf99x/Mamun%20Web%20Portfolio/free-course_vEjskA84X.png?updatedAt=1762599897613",
      full_screen: "",
    },
    icon:course, 
    title: "Course Blog Site",
    date: "2023",
    content: `A comprehensive blog platform focused on educational content and online courses. Features course listings, blog posts, user authentication, and a responsive design that works seamlessly across all devices.

## Platform Features

- Course listings and educational content
- Blog posts and articles
- User authentication system
- Responsive design for all devices`,
    slug: "course-blog-site",
    live: {
      preview: "https://course-free.netlify.app",
      git: "https://github.com/mamunur13525/free_course_front",
      backend: "https://github.com/mamunur13525/free_course_back",
    },
    type: ["full-stack"],
  },
];

export { projects };
