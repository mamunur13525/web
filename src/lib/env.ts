/**
 * Small helper so server-side modules can read secrets from either
 * Astro's `import.meta.env` or Node's `process.env`.
 */
export function getEnv(key: string): string | undefined {
  const fromViteEnv = (import.meta.env as Record<string, string | undefined>)[key];
  if (fromViteEnv) return fromViteEnv;
  if (typeof process !== "undefined" && process.env) return process.env[key];
  return undefined;
}
