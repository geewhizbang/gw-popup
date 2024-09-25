import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/packagePlugin'],
      outputDir: 'dist',
      staticImport: true,
      skipDiagnostics: false,
      rollupTypes: true,
    }),
  ],
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/packagePlugin/index.ts'),
      name: 'GWPopup',
      fileName: format => `gw-popup.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vueuse/core', 'pinia'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@vueuse/core': 'VueUse',
          pinia: 'Pinia',
        },
        assetFileNames: assetInfo => {
          console.log(assetInfo);
          if (assetInfo.name === 'style.css') return 'gw-popup.css';
          return assetInfo.name;
        },
      },
    },
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: 'sass',
        sassOptions: {
          api: 'modern',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '~': resolve(__dirname, 'src/packagePlugin'),
    },
  },
});
