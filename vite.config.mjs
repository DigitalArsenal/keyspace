import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import postcss from "./postcss.config.mjs";

export default defineConfig({
  plugins: [svelte(), viteSingleFile()],
  css: {
    postcss
  },
  define: {
    global: "globalThis",
  },
  ssr: {
    noExternal: true
  },
  build: {
    outDir:"docs",
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      plugins: [],
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js"
      }
    }
  }
});
