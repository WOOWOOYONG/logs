// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'

const isBuild = process.argv.includes('build')
const site = process.env.SITE_URL ?? process.env.CF_PAGES_URL

// https://astro.build/config
export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  ...(isBuild ? { adapter: cloudflare() } : {}),
  integrations: [icon(), react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
})
