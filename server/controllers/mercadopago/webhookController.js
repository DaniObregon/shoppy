const {
  fetchPaymentWithRetries,
} = require("../../services/mercadopago/webhookService");

/**
 * Controlador para manejar notificaciones de Mercado Pago.
 * @param {Object} req - Objeto de solicitud Express.
 * @param {Object} res - Objeto de respuesta Express.
 */
async function handleWebhook(req, res) {
  console.log("🔔 Notificación recibida:");
  console.log("👉 req.body:", JSON.stringify(req.body, null, 2));

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

  res.sendStatus(200); // OK siempre, para evitar reintentos innecesarios de Mercado Pago.
}

module.exports = { handleWebhook };
