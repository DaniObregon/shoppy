const fetch = require("node-fetch");
const {
  saveOrUpdatePayment,
} = require("../../repositories/mercadopago/pagoRepository");
const { client } = require("../../config/mercadopago");
const { delay } = require("../../utils/delay");

// Función para obtener detalles del pago con reintentos
async function fetchPaymentWithRetries(paymentId, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `🌐 [Intento ${attempt}] Consultando pago con ID: ${paymentId}`
      );
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${client.accessToken}` },
        }
      );

      if (response.ok) {
        const paymentData = await response.json();
        // console.log("✅ Pago obtenido con éxito:", paymentData);
        return paymentData;
      } else {
        console.warn(
          `⚠️ Intento ${attempt} fallido. Status: ${response.status}`
        );
        const errorText = await response.text();
        console.warn(`⚠️ Detalle del error: ${errorText}`);
      }
    } catch (error) {
      console.error(`❌ Error en intento ${attempt}:`, error.message);
    }

    if (attempt < retries) {
      console.log("⏳ Esperando 2 segundos antes de reintentar...");
      await delay(2000);
    }
  }

  throw new Error("🚨 Fallaron todos los intentos para consultar el pago.");
}

// Procesar la notificación del webhook
async function processPaymentNotification(paymentId) {
  const paymentData = await fetchPaymentWithRetries(paymentId);
  // console.log("✅ Pago obtenido con éxito::: ", paymentData);
  await saveOrUpdatePayment(paymentData);
}

module.exports = { processPaymentNotification };
