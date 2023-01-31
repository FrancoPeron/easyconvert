import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({
    preprocess: sveltePreprocess({
      scss: true
      // {
      //   renderSync: true,
      //   implementation: 'sass',
      //   prependData: '@import "src/assets/styles/style.scss";',
      // },
    }),
  })],
  build: {
    outDir: './public/dist'
  }
})
