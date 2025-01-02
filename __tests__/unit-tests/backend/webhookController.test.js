const {
  handleWebhook,
} = require("../../../server/controllers/mercadopago/webhookController");
const {
  processPaymentNotification,
} = require("../../../server/services/mercadopago/webhookService");

// Mock del servicio
jest.mock("../../../server/services/mercadopago/webhookService");

describe("🔄 Controlador handleWebhook (Mercado Pago)", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      sendStatus: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('✅ Debería procesar una notificación válida de tipo "payment" con data.id', async () => {
    req.body = {
      type: "payment",
      data: { id: 12345 },
    };

    processPaymentNotification.mockResolvedValue();

    await handleWebhook(req, res);

    expect(processPaymentNotification).toHaveBeenCalledWith(12345);
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });
});
