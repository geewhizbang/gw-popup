import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/gw-popup.ts', // Ensure this file exists
      name: 'GWPopup',
      fileName: format => `gw-popup.${format}.js`,
    },
    rollupOptions: {
      // Ensure to externalize dependencies that shouldn't be bundled
      external: ['vue', 'pinia', '@vueuse/core'],
      output: {
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          '@vueuse/core': 'VueUse',
        },
        exports: 'named', // Use named exports to suppress the warning
      },
    },
  },
  plugins: [vue(), dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
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
