import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base path ko hamesha '/' rakho Vercel ke liye!
  base: "/",
});
