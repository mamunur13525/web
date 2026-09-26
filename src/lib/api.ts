import type { ZodError } from "zod";

/** JSON `Response` helper shared by every admin API route. */
export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function ok<T>(data: T, status = 200): Response {
  return json({ success: true, data }, status);
}

export function fail(error: string, status = 400, details?: unknown): Response {
  return json({ success: false, error, ...(details ? { details } : {}) }, status);
}

/** Flattens a zod error into `{ path, message }` entries. */
export function validationError(error: ZodError): Response {
  return fail(
    "Validation failed",
    400,
    error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }))
  );
}

/**
 * Reads a JSON body, returning `null` when the payload is not valid JSON so
 * the caller can answer with a 400 instead of throwing.
 */
export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

/** Escapes user input so it can be used inside a `$regex` safely. */
export function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** True for MongoDB "duplicate key" errors (unique index violation). */
export function isDuplicateKeyError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: number }).code === 11000
  );
}
