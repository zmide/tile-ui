import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const stylesScssDir = path.join(__dirname, '../../packages/styles/scss');

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  extensions: ['.tsx', '.ts', '.js'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          importers: [],
          loadPaths: [stylesScssDir],
        },
      },
    },
  },
  css: [
    '@tile-ui/styles/scss/globals.scss',
    '~/assets/docs.scss',
  ],
  build: {
    transpile: ['@tile-ui/vue', '@tile-ui/core'],
  },
});
