export const CATEGORIES = [
  { slug: 'javascript', name: 'JavaScript' },
  { slug: 'vue-nuxt', name: 'Vue / Nuxt' },
  { slug: 'typescript', name: 'TypeScript' },
  { slug: 'web-performance', name: 'Web / Performance' },
  { slug: 'others', name: 'Others' },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

export function getCategoryName(slug: CategorySlug): string {
  return CATEGORIES.find((c) => c.slug === slug)!.name
}

export function getCategory(tags: string[]): CategorySlug {
  const set = new Set(tags)

  // Others 優先（CSS / 演算法 / 測試）
  if (
    set.has('Alogorithm') ||
    set.has('BigO') ||
    set.has('Search') ||
    set.has('Unit Test') ||
    set.has('CSS') ||
    set.has('SCSS') ||
    set.has('BEM')
  ) {
    return 'others'
  }

  if (set.has('Vue') || set.has('Nuxt3') || set.has('NuxtContent')) return 'vue-nuxt'
  if (set.has('TypeScript')) return 'typescript'
  if (
    set.has('Web') ||
    set.has('web') ||
    set.has('效能') ||
    set.has('Web Worker') ||
    set.has('Bundler') ||
    set.has('檔案處理')
  ) {
    return 'web-performance'
  }
  if (set.has('JavaScript')) return 'javascript'

  return 'others'
}
