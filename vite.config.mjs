import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import postcss from "./postcss.config.mjs";
import polyfill from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [svelte(), viteSingleFile()],
  server: {
    host: "0.0.0.0"
  },
  css: {
    postcss
  },
  define: {
    global: "globalThis"
  },
  ssr: {
    noExternal: true
  },
  build: {
    emptyOutDir: false,
    minify: false,
    outDir: "docs",
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
