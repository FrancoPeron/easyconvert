import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';
import { VitePluginFonts } from 'vite-plugin-fonts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
    preprocess: sveltePreprocess({
      scss: true
      // {
      //   renderSync: true,
      //   implementation: 'sass',
      //   prependData: '@import "src/assets/styles/style.scss";',
      // },
      }),
    }),
    VitePluginFonts({
      // Custom fonts.
      custom: {
        families: [
          {
            name: "EuclidCircular",
            local: "EuclidCircular",
            src: "/fonts/EuclidCircularA-Medium.woff2",
          },
        ],
        display: "auto",
        preload: true,
      },
    })


  ],
  build: {
    outDir: './public/dist'
  }
})
