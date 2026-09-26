import type { APIRoute } from "astro";
import * as z from "zod";
import {
  createSessionToken,
  isAdminConfigured,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import { fail, json, ok, readJson } from "@/lib/api";

export const prerender = false;

const loginSchema = z.object({
  password: z.string().min(1),
});

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    if (!isAdminConfigured()) {
      return fail(
        "Admin login is not configured. Set ADMIN_PASSWORD in your environment.",
        500
      );
    }

    const parsed = loginSchema.safeParse(await readJson(request));
    if (!parsed.success) {
      return fail("Password is required", 400);
    }

    if (!verifyPassword(parsed.data.password)) {
      return fail("Invalid password", 401);
    }

    cookies.set(
      SESSION_COOKIE,
      createSessionToken(),
      sessionCookieOptions(SESSION_MAX_AGE)
    );

    return ok({ loggedIn: true });
  } catch (error) {
    console.error("Error during admin login:", error);
    return json({ success: false, error: "Login failed" }, 500);
  }
};
