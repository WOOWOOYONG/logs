import { config, fields, collection } from '@keystatic/core'

const isDev = process.env.NODE_ENV === 'development'

export default config({
  storage: isDev
    ? { kind: 'local' }
    : { kind: 'github', repo: 'WOOWOOYONG/woowooyong-logs' },

  ui: {
    brand: { name: 'my-dev' },
  },

  collections: {
    logs: collection({
      label: 'Logs',
      slugField: 'slug',
      path: 'src/content/logs/*',
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

    notes: collection({
      label: 'Notes',
      slugField: 'title',
      path: 'src/content/notes/*',
      format: { contentField: 'content' },
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({
          label: 'Published',
          defaultValue: { kind: 'today' },
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value,
        }),
        draft: fields.checkbox({ label: 'Draft', defaultValue: false }),
        content: fields.markdoc({
          label: 'Content',
          extension: 'md',
        }),
      },
    }),
  },
})
