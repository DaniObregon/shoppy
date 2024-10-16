require("dotenv").config({ path: "./server/.env" });

module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Añadir esta línea
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  globals: {
    NODE_ENV: "test",
  },
  transformIgnorePatterns: [
    "node_modules/(?!uuid)", // Permitir la transformación del módulo uuid
  ],
};
