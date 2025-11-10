import { NextResponse } from "next/server";
import { markdownFileToHtml } from "@/lib/markdown";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const file = url.searchParams.get("file");
    if (!file) {
      return NextResponse.json({ error: "Missing file parameter" }, { status: 400 });
    }

    // Only allow files inside the data/ directory for safety
    if (!file.startsWith("data/")) {
      return NextResponse.json({ error: "Invalid file path" }, { status: 400 });
    }

    const html = markdownFileToHtml(file);
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
