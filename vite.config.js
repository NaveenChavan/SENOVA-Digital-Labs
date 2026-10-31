import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base path ko hamesha '/' rakho Vercel ke liye!
  base: "/",
  define: {
    // Same value in the client bundle and the prerender bundle, so the
    // footer year in prerendered HTML always matches the hydrated page.
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
});
