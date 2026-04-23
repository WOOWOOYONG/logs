# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # dev server at localhost:4321
pnpm build      # astro check + build to ./dist/
pnpm preview    # preview production build
pnpm check      # Astro type checking only
```

No test framework is configured.

## Architecture

Astro 6 static site with Tailwind CSS v4 (via `@tailwindcss/vite`) and TypeScript. Uses pnpm. Path alias `@/*` maps to `./src/*`.

**Content collections** (`src/content.config.ts`) define three Zod-validated collections loaded via glob:
- `notes` — full articles with `title`, `description?`, `pubDate`, `tags[]`, `draft`
- `projects` — portfolio entries; add `cover` (image), `link?`, `repo?`
- `streaming` — short-form with only `pubDate` and `tags[]`

Draft filtering: `import.meta.env.PROD` gates `draft: true` entries out of production builds.

**Routing** (`src/pages/`) mirrors collections:
- `/notes` — listing + `/notes/page/[page]` (6 per page, set in `src/consts.ts`)
- `/notes/category/[category]` + `/notes/category/[category]/page/[page]` — category filter
- `/notes/[...slug]` — article detail using `PostLayout` (with `TableOfContents`)
- `/projects/[...slug]` — project detail using `ProjectLayout`
- `/tags/[tag]` — tag filter across notes
- `/streaming` — streaming listing on homepage and dedicated page

**Category system** (`src/utils/category.ts`) maps tags to five fixed categories (JavaScript, Vue/Nuxt, TypeScript, Web/Performance, Others). Update this file to add or reclassify tags.

**Layouts**: `Layout.astro` is the base wrapper; `PostLayout.astro` adds a TOC sidebar; `ProjectLayout.astro` is for project detail pages.

## Coding Conventions

**Parameter naming**: Never use single-letter or cryptic parameter names (e.g. `n`, `c`, `p`, `t`, `l`, `h`, `i`). Use descriptive names that reflect the value's type or role:
- Collection items: `note`, `project`, `post`, `tag`, `category`, `heading`, `link`, `anchor`
- Pagination paths: `path` (not `p`)
- Page numbers: `pageNum` (not `n`)
- Array indices that are actually used: `index` (not `i`); unused placeholders may stay as `_`
