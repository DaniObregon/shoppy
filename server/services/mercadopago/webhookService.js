const fetch = require("node-fetch");
const { client } = require("../../config/mercadopago");
const { delay } = require("../../utils/delay");

/**
 * Realiza reintentos para obtener los detalles de un pago desde Mercado Pago.
 * @param {string} paymentId - ID del pago.
 * @param {number} retries - Número máximo de reintentos.
 * @returns {Promise<Object>} - Datos del pago.
 */
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
          headers: {
            Authorization: `Bearer ${client.accessToken}`,
          },
        }
      );

      console.log("📡 Respuesta de Mercado Pago - Status:", response.status);

      if (response.ok) {
        const paymentData = await response.json();
        console.log(
          "✅ Detalles del pago:",
          JSON.stringify(paymentData, null, 2)
        );
        const feeAmount = paymentData?.fee_details?.[0]?.amount || null;

        console.log("💵 Monto de la tarifa (fee_amount):", feeAmount);

        return paymentData;
      } else {
        const errorText = await response.text();
        console.warn(
          `⚠️ Error en intento ${attempt}: ${response.status} - ${errorText}`
        );
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

module.exports = { fetchPaymentWithRetries };
