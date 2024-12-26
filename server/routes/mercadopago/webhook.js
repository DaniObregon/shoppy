const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const { client } = require("../../config/mercadopago");

// Función para retrasar en milisegundos
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para consultar el pago con reintentos
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

    // Espera 2 segundos antes de reintentar
    if (attempt < retries) {
      console.log("⏳ Esperando 2 segundos antes de reintentar...");
      await delay(2000);
    }
  }

  throw new Error("🚨 Fallaron todos los intentos para consultar el pago.");
}

// Ruta para recibir notificaciones de Mercado Pago
router.post("/", async (req, res) => {
  console.log("🔔 Notificación recibida:");
  console.log("👉 req.body:", JSON.stringify(req.body, null, 2));

  // Extraer el ID de req.body.data.id
  const paymentId = req.body?.data?.id;

  console.log("🔍 ID extraído de req.body.data.id:", paymentId);

  if (!paymentId) {
    console.warn("⚠️ No se encontró un ID válido en req.body.data.id.");
    return res.sendStatus(200); // OK, pero sin procesar correctamente
  }

  try {
    await fetchPaymentWithRetries(paymentId);
    console.log("✅ Pago procesado correctamente.");
  } catch (error) {
    console.error("❌ Error al procesar el pago:", error.message);
  }

  // Respuesta 200 OK garantizada
  res.sendStatus(200);
});

module.exports = router;
