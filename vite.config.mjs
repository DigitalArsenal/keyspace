import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { viteSingleFile } from "vite-plugin-singlefile";
import postcss from "./postcss.config.mjs";
import commonjs from "@rollup/plugin-commonjs";
import workerLoader from "rollup-plugin-web-worker-loader";
export default defineConfig({
  plugins: [svelte(), viteSingleFile()],
  css: {
    postcss
  },
  define: {
    process: false,
    global: "globalThis",
  },
  ssr: {
    noExternal: true
  },
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      plugins: [commonjs({ defaultIsModuleExports: true })],
      inlineDynamicImports: true,
      output: {
        manualChunks: () => "everything.js"
      }
    }
  }
});
