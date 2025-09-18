import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: resolve(__dirname, "postcss.config.js"),
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#014582",
          "link-color": "#014582",
        },
        javascriptEnabled: true,
      },
    },
  },
});
