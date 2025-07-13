import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: "./postcss.config.mjs",
  },
  resolve: {
    alias: {
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@enums": fileURLToPath(new URL("./src/enums", import.meta.url)),
      "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@stores": fileURLToPath(new URL("./src/stores", import.meta.url)),
      "@three": fileURLToPath(new URL("./src/three", import.meta.url)),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});
