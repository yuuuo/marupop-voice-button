import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
  },
  assetsInclude: ["**/*.m4a", "**/*.ac3"],
  build: {
    outDir: "docs",
  },
});
