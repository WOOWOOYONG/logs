import { defineMiddleware } from 'astro:middleware'

// Polyfill `Astro.locals.runtime.env` for @keystatic/astro v5 on Astro v6.
//
// Astro v6 + @astrojs/cloudflare defines `locals.runtime` as a non-configurable
// property whose `env` getter throws (it points users at the new
// `import { env } from "cloudflare:workers"` API).
//
// Keystatic's compiled API handler still reads `context.locals.runtime.env`,
// which triggers the throwing getter. We can't replace `runtime` itself
// (non-configurable), but the inner `env` getter is configurable — so we
// redefine it on the existing runtime object with a real value.
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    // @ts-expect-error - virtual module provided by Cloudflare Workers runtime
    const { env } = await import('cloudflare:workers')
    const runtime = (context.locals as { runtime?: object }).runtime
    if (runtime) {
      Object.defineProperty(runtime, 'env', {
        value: env,
        writable: true,
        configurable: true,
        enumerable: true,
      })
    }
  } catch {
    // Not running in Cloudflare runtime (e.g. local dev); nothing to do.
  }
  return next()
})
