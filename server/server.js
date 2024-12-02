const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(routes);
app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      console.log('Intentando conectar a la base de datos...');
      console.log('URL de conexión:', process.env.DATABASE_URL);
      await db.sequelize.authenticate(); // Prueba de conexión
      console.log("Conexión a la base de datos establecida correctamente");
      await db.sequelize.sync();
      console.log("Database synchronized");
    } catch (error) {
      console.error("Error executing seeders:", error);
      console.error("Error de conexión a la base de datos:", error);
      console.error("Detalles completos del error:", JSON.stringify(error, null, 2));
    }
  });
}

process.on("SIGINT", async () => {
  console.log("\nStopping server...");
  process.exit();
});

module.exports = app;
