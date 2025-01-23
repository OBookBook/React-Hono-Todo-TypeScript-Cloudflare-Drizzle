/// <reference types="vitest"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest-setup.ts"],
    globals: true,
  },
  coverage: {
    provider: "v8",
    exclude: ["src/main.tsx", "src/APP.tsx", "**/*.cjs"],
  },
});
