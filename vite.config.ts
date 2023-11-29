/* eslint-disable prettier/prettier */
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
  resolve: {
    alias: {
      "@views": "/src/views",
      "@common": "/src/common",
      "@model": "/src/model",
      "@custom-hooks": "/src/custom-hooks",
      "@store": "/src/store",
      // ...other aliases
    },
  },
})
