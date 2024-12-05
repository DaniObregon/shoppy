require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env") });
const { Sequelize } = require("sequelize");

console.log("Variables de entorno cargadas:", process.env);

// Configuración de entornos
const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

// Probar la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Conexión exitosa con la base de datos"))
  .catch((error) =>
    console.error("No se pudo conectar a la base de datos:", error)
  );

module.exports = config;
