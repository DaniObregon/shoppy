// __tests__/unit-tests/backend/pagoRepository.test.js

const {
  saveOrUpdatePayment,
} = require("../../../server/repositories/mercadopago/pagoRepository");
const { Pago } = require("../../../server/models");

jest.mock("../../../server/models", () => ({
  Pago: {
    findOrCreate: jest.fn(),
  },
}));

describe("Test de saveOrUpdatePayment", () => {
  const mockPaymentData = {
    id: "12345",
    external_reference: JSON.stringify({ user_id: "user123" }),
    additional_info: { items: [{ id: "product123" }] },
    transaction_details: { total_paid_amount: 100, net_received_amount: 90 },
    fee_details: [{ amount: 10 }],
    payer: {
      first_name: "John",
      last_name: "Doe",
      identification: { type: "DNI", number: "12345678" },
      phone: { area_code: "54", number: "123456789", extension: "01" },
    },
    status: "approved",
    status_detail: "Pago aprobado",
    money_release_date: "2024-12-30",
    money_release_status: "released",
    currency_id: "ARS",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("✅ Debería crear un nuevo pago si no existe en la base de datos", async () => {
    Pago.findOrCreate.mockResolvedValueOnce([{ payment_id: "12345" }, true]);

    await saveOrUpdatePayment(mockPaymentData);

    expect(Pago.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { payment_id: "12345" },
        defaults: expect.objectContaining({
          user_id: "user123",
          product_id: "product123",
          transaction_amount: undefined,
          total_paid_amount: 100,
          fee_amount: 10,
          net_received_amount: 90,
          status: "approved",
        }),
      })
    );
  });

  it("✅ Debería actualizar un pago existente si ya existe en la base de datos", async () => {
    const mockPayment = { update: jest.fn() };
    Pago.findOrCreate.mockResolvedValueOnce([mockPayment, false]);

    await saveOrUpdatePayment(mockPaymentData);

    expect(mockPayment.update).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user123",
        product_id: "product123",
        status: "approved",
      })
    );
  });

  it("❌ Debería manejar errores al parsear external_reference", async () => {
    const invalidPaymentData = {
      ...mockPaymentData,
      external_reference: "invalid_json",
    };

    Pago.findOrCreate.mockResolvedValueOnce([{ payment_id: "12345" }, true]);

    await expect(
      saveOrUpdatePayment(invalidPaymentData)
    ).resolves.not.toThrow();

    expect(Pago.findOrCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        defaults: expect.objectContaining({
          user_id: null,
        }),
      })
    );
  });

  it("❌ Debería lanzar un error si ocurre un fallo en la base de datos", async () => {
    Pago.findOrCreate.mockRejectedValueOnce(new Error("DB Error"));

    await expect(saveOrUpdatePayment(mockPaymentData)).rejects.toThrow(
      "Error al guardar el pago: DB Error"
    );
  });
});