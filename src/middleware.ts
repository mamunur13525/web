import { defineMiddleware } from "astro:middleware";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { fail } from "@/lib/api";

/**
 * Locks down the admin panel and its API. Everything under `/admin` and
 * `/api/admin` requires a valid session cookie, except the login/logout
 * endpoints themselves.
 */
const PUBLIC_ADMIN_PATHS = new Set([
  "/admin/login",
  "/api/admin/login",
  "/api/admin/logout",
]);

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  const isAdminPage = pathname === "/admin" || pathname.startsWith("/admin/");
  const isAdminApi = pathname.startsWith("/api/admin/");

  if (!isAdminPage && !isAdminApi) return next();
  if (PUBLIC_ADMIN_PATHS.has(pathname)) return next();

  const token = context.cookies.get(SESSION_COOKIE)?.value;
  if (verifySessionToken(token)) return next();

  if (isAdminApi) return fail("Unauthorized", 401);

  const target = `${pathname}${context.url.search}`;
  return context.redirect(`/admin/login?next=${encodeURIComponent(target)}`);
});
