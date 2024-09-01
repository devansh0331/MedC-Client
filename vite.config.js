import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: ".next",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});
