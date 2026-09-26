import type { APIRoute } from "astro";
import { SESSION_COOKIE } from "@/lib/auth";
import { ok } from "@/lib/api";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete(SESSION_COOKIE, { path: "/" });
  return ok({ loggedOut: true });
};
