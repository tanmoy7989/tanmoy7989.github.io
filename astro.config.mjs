import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: process.env.SITE_URL || 'https://tanmoy7989.github.io',
  base: '/',
  integrations: [tailwind()],
  output: 'static',
});
