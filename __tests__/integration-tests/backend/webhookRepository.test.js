const { saveOrUpdatePayment } = require("../../../server/repositories/mercadopago/pagoRepository");
const { Pago } = require("../../../server/models");

jest.mock("../../../server/models", () => ({
  Pago: {
    findOrCreate: jest.fn(),
  },
}));

describe("saveOrUpdatePayment", () => {
  const mockPaymentData = {
    id: "12345",
    transaction_amount: 100,
    status_detail: "approved",
    status: "approved",
    money_release_date: "2025-01-01",
    money_release_status: "released",
    currency_id: "ARS",
    additional_info: { items: [{ id: "prod123" }] },
    payer: {
      first_name: "Juan",
      last_name: "Perez",
      identification: { type: "DNI", number: "12345678" },
      phone: { area_code: "11", number: "1234567", extension: "01" },
    },
    fee_details: [{ amount: 5 }],
    transaction_details: { total_paid_amount: 100, net_received_amount: 95 },
    external_reference: '{"user_id": 1}',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería crear un pago cuando no exista", async () => {
    Pago.findOrCreate.mockResolvedValue([null, true]); // Simula que no se encontró el pago y lo crea

    await saveOrUpdatePayment(mockPaymentData);

    expect(Pago.findOrCreate).toHaveBeenCalledWith({
      where: { payment_id: "12345" },
      defaults: expect.objectContaining({
        user_id: 1,
        product_id: "prod123",
        transaction_amount: 100,
        total_paid_amount: 100,
        fee_amount: 5,
        net_received_amount: 95,
        status_detail: "approved",
        status: "approved",
        money_release_date: "2025-01-01",
        money_release_status: "released",
        currency_id: "ARS",
        payer_name: "Juan Perez",
        identification: "DNI 12345678",
        phone_number: "11 1234567 01",
      }),
    });
  });

  it("debería actualizar el pago cuando ya exista", async () => {
    const existingPayment = { update: jest.fn() };
    Pago.findOrCreate.mockResolvedValue([existingPayment, false]); // Simula que ya existe el pago

    await saveOrUpdatePayment(mockPaymentData);

    expect(existingPayment.update).toHaveBeenCalledWith({
      user_id: 1,
      product_id: "prod123",
      transaction_amount: 100,
      total_paid_amount: 100,
      fee_amount: 5,
      net_received_amount: 95,
      status_detail: "approved",
      status: "approved",
      money_release_date: "2025-01-01",
      money_release_status: "released",
      currency_id: "ARS",
      payer_name: "Juan Perez",
      identification: "DNI 12345678",
      phone_number: "11 1234567 01",
    });
  });

  it("debería manejar el error cuando no se pueda parsear el external_reference", async () => {
    const invalidPaymentData = {
      ...mockPaymentData,
      external_reference: '{"user_id": }',
    }; // JSON inválido
    await expect(saveOrUpdatePayment(invalidPaymentData)).rejects.toThrow(
      "Error al guardar el pago"
    );
  });

  it("debería manejar errores de la base de datos", async () => {
    Pago.findOrCreate.mockRejectedValue(new Error("Database error"));
    await expect(saveOrUpdatePayment(mockPaymentData)).rejects.toThrow(
      "Error al guardar el pago: Database error"
    );
  });
});
