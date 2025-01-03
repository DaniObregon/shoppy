const request = require("supertest");
const express = require("express");
const router = require("../../../server/routes/mercadopago/webhook");
const {
  handleWebhook,
} = require("../../../server/controllers/mercadopago/webhookController");

jest.mock("../../../server/controllers/mercadopago/webhookController", () => ({
  handleWebhook: jest.fn((req, res) => res.sendStatus(200)),
}));

global.setImmediate =
  global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args));

describe("🔗 Webhook Route (Mercado Pago)", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/webhook", router);
  });

  it("✅ Debería llamar al controlador handleWebhook al recibir una solicitud POST", async () => {
    const response = await request(app).post("/webhook").send({ test: "data" });

    expect(response.statusCode).toBe(200);
    expect(handleWebhook).toHaveBeenCalledTimes(1);
  });

  it("❌ Debería devolver 404 para rutas no definidas", async () => {
    const response = await request(app).get("/webhook").send();

    expect(response.statusCode).toBe(404);
  });
});
