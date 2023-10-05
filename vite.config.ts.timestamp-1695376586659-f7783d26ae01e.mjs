// vite.config.ts
import { defineConfig } from "file:///C:/Users/matthew.oluwajuwon/Documents/GitHub/translite-portal-frontend-service/node_modules/vitest/dist/config.js";
import react from "file:///C:/Users/matthew.oluwajuwon/Documents/GitHub/translite-portal-frontend-service/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  build: {
    outDir: "build",
    sourcemap: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true
  },
  resolve: {
    alias: {
      "@views": "/src/views",
      "@common": "/src/common",
      "@model": "/src/model",
      "@custom-hooks": "/src/custom-hooks",
      "@store": "/src/store"
      // ...other aliases
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtYXR0aGV3Lm9sdXdhanV3b25cXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFx0cmFuc2xpdGUtcG9ydGFsLWZyb250ZW5kLXNlcnZpY2VcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXG1hdHRoZXcub2x1d2FqdXdvblxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXHRyYW5zbGl0ZS1wb3J0YWwtZnJvbnRlbmQtc2VydmljZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvbWF0dGhldy5vbHV3YWp1d29uL0RvY3VtZW50cy9HaXRIdWIvdHJhbnNsaXRlLXBvcnRhbC1mcm9udGVuZC1zZXJ2aWNlL3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgcHJldHRpZXIvcHJldHRpZXIgKi9cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVzdC9jb25maWdcIlxyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHNlcnZlcjoge1xyXG4gICAgb3BlbjogdHJ1ZSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBvdXREaXI6IFwiYnVpbGRcIixcclxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICB9LFxyXG4gIHRlc3Q6IHtcclxuICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICBlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxyXG4gICAgc2V0dXBGaWxlczogXCJzcmMvc2V0dXBUZXN0c1wiLFxyXG4gICAgbW9ja1Jlc2V0OiB0cnVlLFxyXG4gIH0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAdmlld3NcIjogXCIvc3JjL3ZpZXdzXCIsXHJcbiAgICAgIFwiQGNvbW1vblwiOiBcIi9zcmMvY29tbW9uXCIsXHJcbiAgICAgIFwiQG1vZGVsXCI6IFwiL3NyYy9tb2RlbFwiLFxyXG4gICAgICBcIkBjdXN0b20taG9va3NcIjogXCIvc3JjL2N1c3RvbS1ob29rc1wiLFxyXG4gICAgICBcIkBzdG9yZVwiOiBcIi9zcmMvc3RvcmVcIixcclxuICAgICAgLy8gLi4ub3RoZXIgYWxpYXNlc1xyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNKLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixXQUFXO0FBQUEsTUFDWCxVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixVQUFVO0FBQUE7QUFBQSxJQUVaO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
