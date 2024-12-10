const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? "https://doshoppy.netlify.app" // Dominio permitido de producción
    : "http://localhost:5173", // Dominio permitido de desarrollo
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Headers permitidos
};

// Middleware
app.use(cors(corsOptions)); // Aplica CORS antes de las rutas
app.use(express.json()); // Middleware para procesar JSON
app.use(routes); // Rutas de la aplicación

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      console.log("Intentando conectar a la base de datos...");
      await db.sequelize.authenticate(); // Prueba de conexión con Sequelize
      console.log("Conexión a la base de datos establecida correctamente");
      await db.sequelize.sync(); // Sincroniza modelos
      console.log("Database synchronized");
    } catch (error) {
      console.error("Error de conexión a la base de datos:", error.message);
    }
  });
}

// Manejo de señales del sistema
process.on("SIGINT", async () => {
  console.log("\nDeteniendo servidor...");
  process.exit();
});

module.exports = app;
