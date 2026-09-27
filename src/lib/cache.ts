/**
 * Tiny in-memory TTL cache for the public read-only API routes.
 *
 * The site runs on a serverless adapter, so every request pays for a Mongo
 * connection round-trip. Caching the JSON for a short window (plus the
 * `Cache-Control` header set by `withPublicCache`) lets repeated hits — and
 * CDN/browser revalidations — answer without touching the database at all.
 */

/** Seconds a public feed stays fresh before the DB is queried again. */
export const PUBLIC_CACHE_SECONDS = 30;

interface CacheEntry {
  value: unknown;
  /** Epoch ms until which `value` is considered fresh. */
  freshUntil: number;
}

const store = new Map<string, CacheEntry>();

export interface CacheHit<T> {
  value: T;
  /** False when the entry exists but passed its TTL (usable as stale fallback). */
  fresh: boolean;
}

/** Returns the cached value, if any, marking whether it is still fresh. */
export function cacheGet<T>(key: string): CacheHit<T> | undefined {
  const entry = store.get(key);
  if (!entry) return undefined;
  return { value: entry.value as T, fresh: Date.now() < entry.freshUntil };
}

export function cacheSet(
  key: string,
  value: unknown,
  ttlSeconds = PUBLIC_CACHE_SECONDS
): void {
  store.set(key, { value, freshUntil: Date.now() + ttlSeconds * 1000 });
}

/**
 * Marks a JSON response as publicly cacheable so browsers and the CDN can
 * serve subsequent requests without invoking the serverless function.
 */
export function withPublicCache(
  response: Response,
  maxAgeSeconds = PUBLIC_CACHE_SECONDS
): Response {
  response.headers.set(
    "Cache-Control",
    `public, max-age=${maxAgeSeconds}, stale-while-revalidate=${maxAgeSeconds * 5}`
  );
  return response;
}
