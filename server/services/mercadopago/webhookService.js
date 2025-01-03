const fetch = require("node-fetch");
const {
  saveOrUpdatePayment,
} = require("../../repositories/mercadopago/pagoRepository");
const { client } = require("../../config/mercadopago");
const { delay } = require("../../utils/delay");

// Función para obtener detalles del pago con reintentos
async function fetchPaymentWithRetries(paymentId, retries = 3) {
  let response = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(
        `🌐 [Intento ${attempt}] Consultando pago con ID: ${paymentId}`
      );
      response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${client.accessToken}` },
        }
      );

      if (response.ok) {
        const paymentData = await response.json();
        return paymentData;
      } else {
        console.warn(
          `⚠️ Intento ${attempt} fallido. Status: ${response.status}`
        );
        const errorText = await response.text();
        console.warn(`⚠️ Detalle del error: ${errorText}`);

        // Si el error es un 404, no reintentamos
        if (response.status === 404) {
          console.warn(
            "⚠️ Error 404: Recurso no encontrado. No se reintentará."
          );
          break;
        }

        // Ajustamos el número de reintentos si el código de error es específico
        if (response.status === 500 || response.status === 502) {
          console.log("⏳ Esperando 2 segundos antes de reintentar...");
          await delay(2000);
        }
      }
    } catch (error) {
      console.error(`❌ Error en intento ${attempt}:`, error.message);
    }

    // Si no es un 404, reintentamos según lo programado
    if (attempt < retries && !(response && response.status === 404)) {
      console.log("⏳ Esperando 2 segundos antes de reintentar...");
      await delay(2000);
    }
  }

  // Si llegamos aquí, significa que fallaron los intentos o el error fue un 404
  throw new Error("🚨 Fallaron todos los intentos para consultar el pago.");
}

// Procesar la notificación del webhook
async function processPaymentNotification(paymentId) {
  const paymentData = await fetchPaymentWithRetries(paymentId);
  // console.log("✅ Pago obtenido con éxito::: ", paymentData);
  await saveOrUpdatePayment(paymentData);
}

module.exports = { processPaymentNotification };
