const request = require("supertest");
const express = require("express");
const webhookRouter = require("../../../server/routes/mercadopago/webhook.js");
const {
  processPaymentNotification,
} = require("../../../server/services/mercadopago/webhookService.js");

// Mockeamos el servicio para evitar llamadas reales a Mercado Pago
jest.mock("../../../server/services/mercadopago/webhookService.js");

describe("POST /mercadopago/webhook", () => {
  let app;

  beforeAll(() => {
    // Crear una instancia específica de Express para las pruebas
    app = express();
    app.use(express.json()); // Para parsear JSON en los cuerpos de las solicitudes
    app.use("/mercadopago/webhook", webhookRouter); // Montamos la ruta específica
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("✅ Debería responder con 200 OK para una notificación válida de pago", async () => {
    processPaymentNotification.mockResolvedValue(); // Simulamos una respuesta exitosa

    const payload = {
      type: "payment",
      data: { id: "12345" },
    };

    const response = await request(app)
      .post("/mercadopago/webhook")
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(processPaymentNotification).toHaveBeenCalledWith("12345");
  });

  it("ℹ️ Debería responder con 200 OK para notificaciones no relevantes", async () => {
    const payload = {
      type: "unknown_type",
    };

    const response = await request(app)
      .post("/mercadopago/webhook")
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(processPaymentNotification).not.toHaveBeenCalled();
  });

  it("❌ Debería manejar errores en el servicio y aún así responder 200 OK", async () => {
    processPaymentNotification.mockRejectedValue(new Error("Error interno"));

    const payload = {
      type: "payment",
      data: { id: "12345" },
    };

    const response = await request(app)
      .post("/mercadopago/webhook")
      .send(payload);

    expect(response.statusCode).toBe(200);
    expect(processPaymentNotification).toHaveBeenCalledWith("12345");
  });
});
