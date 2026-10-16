import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.jsx"],
    include: ["src/**/*.{test,spec}.{js,jsx}"],
    css: false,
  },
  resolve: {
    alias: {
      "@": path.join(root, "src"),
      "server-only": path.join(root, "src/test/shims/server-only.js"),
    },
  },
});
