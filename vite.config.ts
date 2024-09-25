import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const commonConfig = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'src/packagePlugin'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/packagePlugin/styles/_variables.scss";`,
        },
      },
    },
  };

  if (mode === 'live-demo') {
    return {
      ...commonConfig,
      build: {
        outDir: './docs/.vitepress/dist/live-demo',
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'index.html'),
          },
        },
      },
    };
  } else {
    return {
      ...commonConfig,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/packagePlugin/index.ts'),
          name: 'GWPopup',
          fileName: 'gw-popup',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
            assetFileNames: assetInfo => {
              if (assetInfo.name === 'style.css') return 'gw-popup.css';
              return assetInfo.name;
            },
          },
        },
      },
    };
  }
});
