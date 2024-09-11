import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false,
      },
      port: process.env.SERVER_PORT,
      watch: {
        usePolling: true,
      },
    },
  },
});

//'/api': 'http://localhost:' + process.env.SERVER_PORT, // Usando concatenación de cadenas
//'/admin-api': 'http://localhost:' + process.env.SERVER_PORT, // Añadir proxy para admin-api
