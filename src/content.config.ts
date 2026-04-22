import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

// 個人文章（原 posts）
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      cover: image(),
      tags: z.array(z.string()).default([]),
      link: z.url().optional(),
      repo: z.url().optional(),
      draft: z.boolean().default(false),
    }),
});

// Streaming
const streaming = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/streaming' }),
  schema: z.object({
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { notes, projects, streaming };
