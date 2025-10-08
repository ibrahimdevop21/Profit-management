// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Configure for multilingual static site generation
  site: 'https://profitmanagement.com',
  base: '/',
  trailingSlash: 'never',
  build: {
    format: 'directory'
  },
  // Configure i18n routing
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [
    tailwind()
  ]
});