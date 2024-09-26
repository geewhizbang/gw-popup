import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import sass from 'sass'; // Import Dart Sass

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'demo-dist', // Output to a folder in the project root
    rollupOptions: {
      input: 'src/demo/index.html', // Adjust the entry point
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass, // Explicitly specify Dart Sass
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});
