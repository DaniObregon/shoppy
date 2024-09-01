// jest.config.js
require('dotenv').config({ path: './server/.env' }); // Especifica la ruta correcta

module.exports = {
  testEnvironment: "node", // Para pruebas en entorno Node.js
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: ['dotenv/config'],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
};
