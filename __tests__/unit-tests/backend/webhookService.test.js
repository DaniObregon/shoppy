const {
  processPaymentNotification,
} = require("../../../server/services/mercadopago/webhookService");
const {
  saveOrUpdatePayment,
} = require("../../../server/repositories/mercadopago/pagoRepository");
const fetch = require("node-fetch");

// Mock de las dependencias
jest.mock("../../../server/repositories/mercadopago/pagoRepository");
jest.mock("node-fetch", () => jest.fn());

describe("Test de la función processPaymentNotification", () => {
  const paymentId = 12345;
  const mockPaymentData = { id: paymentId, status: "approved" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("✅ Debería llamar a fetchPaymentWithRetries y saveOrUpdatePayment correctamente", async () => {
    // Mock de la respuesta exitosa de fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPaymentData),
    });

    // Mock de saveOrUpdatePayment
    saveOrUpdatePayment.mockResolvedValueOnce(true);

    await processPaymentNotification(paymentId);

    expect(fetch).toHaveBeenCalledTimes(1); // Llamada a fetch una vez
    expect(saveOrUpdatePayment).toHaveBeenCalledWith(mockPaymentData);
  });
});
