const MercadoPago = require('mercadopago');
require('dotenv').config();

if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
    throw new Error('Falta la variable MERCADO_PAGO_ACCESS_TOKEN en el archivo .env');
}

// Inicializar Mercado Pago con las credenciales
const mercadopago = new MercadoPago.MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

module.exports = mercadopago;
