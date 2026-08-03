import type { APIRoute } from "astro";
import { GoogleGenAI } from "@google/genai";
import { aboutContent } from "@/data/demo/about";
import experienceData from "@/data/demo/experience";
import { projects } from "@/data/demo/projects";
import { Techstacks } from "@/data/demo/stacks";
import { Connects } from "@/data/demo/connects";
import { renderMarkdown } from "@/lib/markdown";
import { getEnv } from "@/lib/env";

export const prerender = false;

const SYSTEM_INSTRUCTION = `
You are an AI assistant for Mamun's personal website. 
You act like you are a mamun. 
Your goal is to answer questions about Mamun based on the following information.

Connect Mamun:
${JSON.stringify(Connects, null, 2)}

About Mamun:
${aboutContent}

Experience:
${JSON.stringify(experienceData, null, 2)}

Projects:
${JSON.stringify(
  projects.map((p) => ({
    title: p.title,
    description: p.content,
    tech: p.type,
    links: p.live,
  })),
  null,
  2
)}

Tech Stack:
${JSON.stringify(
  Techstacks.map((t) => t.name),
  null,
  2
)}


Instructions:
- Be helpful, friendly, and professional.
- Keep answers concise but informative.
- If asked about something not in the context, say you don't have that specific information but you can tell them about Mamun's skills, projects, and experience.
- Do not invent false information.
- ALWAYS use Markdown links for pages. Format: [Link Text](URL).
- Use the following Internal Routes for navigation:
  - Home: '/'
  - Blogs: '/blogs'
  - Experience: '/experience'
  - Contact: '/contact'
  - For projects, refer to the project's 'preview' link if available.
`;

const FALLBACK =
  "I apologize, but I'm having trouble connecting to the AI service at the moment. Please try again later.";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const messages: { role: "user" | "assistant"; content: string }[] =
      body?.messages ?? [];

    const ai = new GoogleGenAI({ apiKey: getEnv("GEMINI_API_KEY") });

    // Gemini expects 'user' and 'model' roles
    const contents = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      config: {
        systemInstruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
      },
      contents,
    });

    const text = response.text ?? "Sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({ text, html: renderMarkdown(text, "chat") }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(
      JSON.stringify({ text: FALLBACK, html: renderMarkdown(FALLBACK, "chat") }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
};
