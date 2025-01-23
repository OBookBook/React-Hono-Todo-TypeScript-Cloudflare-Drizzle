/// <reference types="vitest"/>
/// <reference types="vite/client"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import type { UserConfig } from "vite";
import type { InlineConfig } from "vitest";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

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
} as VitestConfigExport);
