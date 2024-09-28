import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import sass from 'sass'; // Import Dart Sass
import { visualizer } from 'rollup-plugin-visualizer'; // Import the visualizer plugin
import fs from 'fs-extra'; 

export default defineConfig(({ mode }) => {
  const plugins = [
    vue(),
    dts({
      include: ['src/packagePlugin'],
      outputDir: 'dist',
      staticImport: true,
      skipDiagnostics: false,
      rollupTypes: true,
    }),
    {
      name: 'copy-scss',
      writeBundle() {
        fs.copySync(
          resolve(__dirname, 'src/packagePlugin/styles/_gwPopup.scss'),
          resolve(__dirname, 'dist/gw-popup.scss'),
        );
      },
    },
    // New plugin to copy popupConfig.ts
    {
      name: 'copy-popup-config',
      writeBundle() {
        fs.copySync(
          resolve(__dirname, 'src/packagePlugin/pinia/PopupConfig.ts'),
          resolve(__dirname, 'dist/PopupConfig.ts'),
        );
      },
    },
  ];

  if (process.env.ANALYZE === 'true') {
    plugins.push(
      visualizer({
        filename: 'dist/bundle-analysis.html',
        open: true, // Automatically open the report in the browser
        gzipSize: true, // Enable gzip size display
      }),
    );
  }

  return {
    plugins,
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
          silenceDeprecations: ['legacy-js-api'],
          implementation: sass, // Explicitly specify Dart Sass
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src/packagePlugin'),
      },
    },
    server: {
      port: 3001, // Specify the port you want to use
    },
  };
});
