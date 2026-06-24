/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    // Components reference CSS classes but never import .css in JS, so we don't
    // need real styles; the resize test mocks the layout dimensions it needs.
    css: false,
  },
});
