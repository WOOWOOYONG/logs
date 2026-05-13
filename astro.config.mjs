// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'

const isBuild = process.argv.includes('build')
const rawSite = process.env.SITE_URL ?? process.env.CF_PAGES_URL

/**
 * @param {string | undefined} value
 */
function normalizeSite(value) {
  if (!value) return undefined

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`

  try {
    const url = new URL(withProtocol)
    return url.toString().replace(/\/$/, '')
  } catch {
    throw new Error(`Invalid SITE_URL/CF_PAGES_URL value: ${value}`)
  }
}

const site = normalizeSite(rawSite)

if (isBuild && !site) {
  throw new Error('Missing SITE_URL. Set SITE_URL to the deployed site URL before running astro build.')
}

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  ...(isBuild ? { adapter: cloudflare() } : {}),
  integrations: [icon(), react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
})
