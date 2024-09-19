import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'demo-dist',
    rollupOptions: {
      input: 'index.html', // Adjust the entry point as needed
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
         @use "sass:math";
         @import "@/styles/_variables.scss";
         @import "@/styles/_global.scss";
        `,
      },
    },
  },
});
