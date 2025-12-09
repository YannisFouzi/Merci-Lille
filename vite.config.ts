import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import sass from "sass-embedded";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    // Plugin pour analyser le bundle et identifier les opportunités d'optimisation
    visualizer({
      filename: "./dist/stats.html",
      open: false, // Ne pas ouvrir automatiquement
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    // Optimisations du bundle
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer React et React DOM dans un chunk séparé
          vendor: ["react", "react-dom", "react-router-dom"],
          // Séparer React Query dans son propre chunk
          "react-query": ["@tanstack/react-query"],
          // Séparer les librairies d'animation
          animations: ["framer-motion"],
          // Séparer Zod et React Hook Form
          forms: ["zod", "react-hook-form", "@hookform/resolvers"],
        },
      },
    },
    // Taille limite avant warning (augmentée pour éviter spam)
    chunkSizeWarningLimit: 600,
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": process.env,
  },
});
