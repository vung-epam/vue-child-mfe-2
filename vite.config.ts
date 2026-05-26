import { fileURLToPath, URL } from 'node:url';

/// <reference types="vite/client" />
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import autoprefixer from 'autoprefixer';
import { defineConfig, loadEnv } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import vueDevTools from 'vite-plugin-vue-devtools';

const sanitizeName = (name: string) =>
  name
    .replace(/^_+/, '')
    .replace(/_+/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9.-]/g, '');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      vitePluginSingleSpa({
        serverPort: 4103,
        spaEntryPoints: 'src/main.ts',
      }),
      cssInjectedByJsPlugin(),
    ],
    css: {
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
    base: env.VITE_BASE_URL,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      environment: 'happy-dom',
      globals: true,
      coverage: {
        reporter: ['text', 'html'],
        include: ['src/features/ManageUser/**/*.{ts,vue}'],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },

    build: {
      rollupOptions: {
        external: ['single-spa'],
        output: {
          entryFileNames: (chunkInfo) =>
            `assets/${sanitizeName(chunkInfo.name)}-[hash].js`,
          chunkFileNames: (chunkInfo) =>
            `assets/${sanitizeName(chunkInfo.name)}-[hash].js`,
          assetFileNames: (assetInfo) => {
            const rawName = assetInfo.name ?? 'asset';
            const lastDot = rawName.lastIndexOf('.');
            const baseName = lastDot > 0 ? rawName.slice(0, lastDot) : rawName;
            const extension = lastDot > 0 ? rawName.slice(lastDot) : '';
            return `assets/${sanitizeName(baseName)}-[hash]${extension}`;
          },
        },
      },
    },
  };
});
