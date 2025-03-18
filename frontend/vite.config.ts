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
      "@services": fileURLToPath(new URL("./src/services", import.meta.url)),
      "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
      "@components": fileURLToPath(
        new URL("./src/components", import.meta.url),
      ),
      "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
});
