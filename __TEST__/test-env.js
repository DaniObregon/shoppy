// test-env.js
const dotenv = require("dotenv");
const result = dotenv.config({ path: "../server/.env" });

if (result.error) {
  console.error("Error loading .env file:", result.error);
} else {
  console.log(".env file loaded successfully");
}

console.log("db user: " + process.env.DB_USER); // Debería imprimir 'postgres'
