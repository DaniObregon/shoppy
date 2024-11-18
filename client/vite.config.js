import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['src/config/firebaseConfig.js'], // Evita empaquetar el archivo
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        // Ajustar el target dependiendo del entorno
        target: process.env.NODE_ENV === 'production' ? 'https://shoppy.railway.app' : `http://localhost:${process.env.SERVER_PORT}`,
        secure: false,
      },
      "/admin-api": {
        target: process.env.NODE_ENV === 'production' ? 'https://shoppy.railway.app' : `http://localhost:${process.env.SERVER_PORT}`,
        secure: false,
      },
      port: process.env.SERVER_PORT,
      watch: {
        usePolling: true,
      },
    },
  },
});
