//const mercadopago = require("../../server/config/mercadopago");
const { client } = require("../../server/config/mercadopago");

describe("Mercado Pago Configuration Test", () => {
  it("debería verificar que las credenciales de Mercado Pago están configuradas correctamente", () => {
    expect.assertions(2); // Garantizar que una aserción sea ejecutada.

    try {
      expect(client).toBeDefined();
      expect(client.accessToken).toBe(
        process.env.MERCADO_PAGO_ACCESS_TOKEN
      );
      console.log(
        "✅ Credenciales de Mercado Pago configuradas correctamente."
      );
    } catch (error) {
      console.error(
        "❌ Error al verificar las credenciales de Mercado Pago:",
        error.message
      );
      throw new Error(
        "Fallo en la verificación de credenciales de Mercado Pago"
      );
    }
  });
});
