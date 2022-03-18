import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: true,
        changeOrigin: true,
        ws: true,
      },
    },
  },
}); 
