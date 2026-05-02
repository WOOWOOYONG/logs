import { defineMiddleware } from 'astro:middleware'

// Polyfill `Astro.locals.runtime.env` for @keystatic/astro v5 on Astro v6.
// Astro v6 removed the runtime.env getter in favor of `import { env } from "cloudflare:workers"`,
// but Keystatic still reads the old API. Re-populate it here.
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    // @ts-expect-error - virtual module provided by Cloudflare Workers runtime
    const { env } = await import('cloudflare:workers')
    Object.defineProperty(context.locals, 'runtime', {
      value: { env },
      writable: true,
      configurable: true,
      enumerable: true,
    })
  } catch {
    // Not running in Cloudflare runtime (e.g. local dev); nothing to do.
  }
  return next()
})
