import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['src/config/firebaseConfig.js'], // Evita empaquetar el archivo
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.NODE_ENV === "production"
          ? "https://shoppy-g5bu.onrender.com"
          : `http://localhost:${process.env.PORT}`,
        secure: false,
        changeOrigin: true,
      },
      "/admin-api": {
        target: process.env.NODE_ENV === "production"
          ? "https://shoppy-g5bu.onrender.com"
          : `http://localhost:${process.env.PORT}`,
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
