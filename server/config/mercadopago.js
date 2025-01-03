const { MercadoPagoConfig, Preference } = require("mercadopago");
require("dotenv").config();

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
  throw new Error(
    "Falta la variable MERCADO_PAGO_ACCESS_TOKEN en el archivo .env"
  );
}

// Configurar el cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

module.exports = { client };
