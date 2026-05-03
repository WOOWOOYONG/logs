import { config, fields, collection } from '@keystatic/core'

// Keystatic now only manages `logs` (microblog) — long-form content (notes,
// projects) is edited directly in this repo via your editor.
//
// Logs live in a separate content repo so that high-frequency entries don't
// pollute the main repo's git history. Build pipeline (see package.json
// `prebuild`) clones the streaming repo into `src/content/logs/` so Astro's
// content loader can read them at build time.
export default config({
  storage: {
    kind: 'github',
    repo: 'WOOWOOYONG/woowooyong-streaming',
  },

  ui: {
    brand: { name: 'my-dev' },
  },

  collections: {
    logs: collection({
      label: 'Logs',
      slugField: 'slug',
      path: 'logs/*',
      format: { contentField: 'content' },
      columns: ['pubDate'],
      schema: {
        slug: fields.slug({
          name: {
            label: '標題關鍵字（可留白）',
            description: '檔名會自動帶入時間戳，這裡填的字會接在後面',
            defaultValue: '',
          },
          slug: {
            label: '檔名',
            generate: (name) => {
              const now = new Date()
              const pad = (num: number) => String(num).padStart(2, '0')
              const stamp =
                `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}` +
                `-${pad(now.getHours())}${pad(now.getMinutes())}`
              const suffix = name
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9一-龥-]/g, '')
              return suffix ? `${stamp}-${suffix}` : stamp
            },
          },
        }),
        pubDate: fields.datetime({
          label: 'Published',
          defaultValue: { kind: 'now' },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
})
