require("dotenv").config(); // Asegúrate de que las variables de entorno estén disponibles

const request = require("supertest");
const express = require("express");
const path = require("path");

// Ajustar la ruta a `products.js` en `server/routes/api`
const productsRouter = require(path.resolve(
  __dirname,
  "../../server/routes/api/products"
));

// Ajustar la ruta a `models` en `server/models`
const { Product } = require(path.resolve(__dirname, "../../server/models"));

const app = express();
app.use(express.json());
app.use("/api/products", productsRouter);

describe("GET /api/products", () => {
  it("should return all products", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
    ];

    // Mock de Product.findAll para devolver los productos simulados
    Product.findAll = jest.fn().mockResolvedValue(mockProducts);

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockProducts);
    expect(Product.findAll).toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    // Mock de Product.findAll para simular un error en la base de datos
    Product.findAll = jest.fn().mockRejectedValue(new Error("Database error"));

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(500);
    expect(Product.findAll).toHaveBeenCalled();
  });
});
