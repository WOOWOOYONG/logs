// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'
import icon from 'astro-icon'
import react from '@astrojs/react'
import keystatic from '@keystatic/astro'
import cloudflare from '@astrojs/cloudflare'

const isBuild = process.argv.includes('build')

// https://astro.build/config
export default defineConfig({
  output: 'static',
  ...(isBuild ? { adapter: cloudflare() } : {}),
  integrations: [icon(), react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
})
