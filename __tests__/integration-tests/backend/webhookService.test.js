const {
  processPaymentNotification,
} = require("../../../server/services/mercadopago/webhookService");
const fetch = require("node-fetch");
const {
  saveOrUpdatePayment,
} = require("../../../server/repositories/mercadopago/pagoRepository");

// Mocking the dependencies
jest.mock("node-fetch");
jest.mock("../../../server/repositories/mercadopago/pagoRepository");

describe("webhookService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks después de cada test
  });

  it("should successfully process payment notification", async () => {
    // Datos de prueba
    const paymentId = "123456";
    const mockPaymentData = {
      id: paymentId,
      status: "approved",
      payer_email: "test@example.com",
      transaction_details: { total_paid_amount: 100 },
    };

    // Mockear la llamada a la API de Mercado Pago (fetch)
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPaymentData,
    });

    // Mockear el repositorio para simular la persistencia de datos
    saveOrUpdatePayment.mockResolvedValueOnce(true);

    // Ejecutar la función a probar
    await processPaymentNotification(paymentId);

    // Verificar que fetch fue llamado con la URL correcta
    expect(fetch).toHaveBeenCalledWith(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    // Verificar que la función saveOrUpdatePayment fue llamada con el paymentData correcto
    expect(saveOrUpdatePayment).toHaveBeenCalledWith(mockPaymentData);
  });

  it("should handle retries on failure and throw error if all attempts fail", async () => {
    const paymentId = "123456";

    // Simulando que la API de Mercado Pago falle en todos los intentos
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500, // Simulando un error de servidor
      text: jest.fn().mockResolvedValue("Error message"), // Agregar mock de text()
    });

    // Esperar que la función lance un error después de los intentos
    await expect(processPaymentNotification(paymentId)).rejects.toThrow(
      "🚨 Fallaron todos los intentos para consultar el pago."
    );

    // Verificar que fetch fue llamado múltiples veces (en este caso, 3 intentos)
    expect(fetch).toHaveBeenCalledTimes(3);
  }, 10000);

  it("should not retry if a 404 error is returned", async () => {
    const paymentId = "123456";

    // Simulando un error 404 de Mercado Pago
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404, // Simulando que no se encuentra el recurso
      text: jest.fn().mockResolvedValue("Not found"), // Simula la respuesta de texto para 404
    });

    // Esperar que la función lance un error de no encontrado
    await expect(processPaymentNotification(paymentId)).rejects.toThrow(
      "🚨 Fallaron todos los intentos para consultar el pago."
    );

    // Verificar que fetch fue llamado solo una vez
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
