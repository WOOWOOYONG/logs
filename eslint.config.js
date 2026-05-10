import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import astroParser from 'astro-eslint-parser'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'public/'],
  },
  {
    files: ['*.config.{js,mjs,ts}', 'scripts/**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: { 'jsx-a11y': jsxA11y },
  },
  prettier,
]
