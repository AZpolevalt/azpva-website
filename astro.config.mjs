// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site for Cloudflare Pages (build: npm run build → dist/)
export default defineConfig({
  site: 'https://arizonapolevaultacademy.com',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap()],
});
