import { NextResponse } from "next/server";
import { markdownFileToHtml } from "@/lib/markdown";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    if (!type) {
      return NextResponse.json({ error: "Missing type parameter" }, { status: 400 });
    }

    const html = markdownFileToHtml(`data/case-study/${type}.md`);
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Case study not found" }, { status: 404 });
  }
}
