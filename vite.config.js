import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    hmr: {
      host: "0.0.0.0",
    },
    port: 3000,
    host: true,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["BaseLabel"].includes(tag),
        },
      },
    }),
    laravel({
      input: ["resources/css/app.css", "resources/js/app.js"],
      refresh: true,
  }),
  ],
});
