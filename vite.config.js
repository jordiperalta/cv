import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  cacheDir: process.env.VITE_CACHE_DIR ?? 'node_modules/.vite',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.names?.[0] ?? assetInfo.name ?? '';

          if (assetName.endsWith('.ttf')) {
            return 'assets/fonts/[name][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
