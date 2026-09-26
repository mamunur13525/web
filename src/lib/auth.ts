import crypto from "node:crypto";
import type { AstroCookieSetOptions } from "astro";
import { getEnv } from "@/lib/env";

/**
 * Password based admin session.
 *
 * There are no user accounts: a single shared password (`ADMIN_PASSWORD`)
 * unlocks the panel. On a successful login an HMAC-signed, expiring token is
 * stored in an http-only cookie and verified by `src/middleware.ts`.
 */

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days (seconds)

function getAdminPassword(): string | undefined {
  return getEnv("ADMIN_PASSWORD");
}

function getSecret(): string {
  return (
    getEnv("ADMIN_SESSION_SECRET") ||
    getAdminPassword() ||
    "insecure-dev-secret-change-me"
  );
}

/** `false` when `ADMIN_PASSWORD` is missing — the panel stays locked. */
export function isAdminConfigured(): boolean {
  return Boolean(getAdminPassword());
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

/** Constant-time string comparison that tolerates different lengths. */
function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return crypto.timingSafeEqual(bufferA, bufferB);
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (!expected) return false;
  return safeEqual(password, expected);
}

export function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE * 1000 })
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  if (!safeEqual(signature, sign(payload))) return false;

  try {
    const { exp } = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as { exp?: unknown };

    return typeof exp === "number" && exp > Date.now();
  } catch {
    return false;
  }
}

export function sessionCookieOptions(maxAge: number): AstroCookieSetOptions {
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    maxAge,
  };
}
