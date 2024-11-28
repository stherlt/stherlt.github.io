import { defineConfig } from 'astro/config'
import shiki from 'shiki';

export default defineConfig({
  site: 'https://stherlt.github.io',
  markdown: {
    shikiConfig: {
      theme: 'min-light',
    },
  },
})