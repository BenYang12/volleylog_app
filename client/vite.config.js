import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // <-- client on 5173
    proxy: {
      "/api": "http://localhost:7500", // <-- API on 7500
    },
  },
});
