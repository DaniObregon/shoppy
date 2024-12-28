const {
  processPaymentNotification,
} = require("../../services/mercadopago/webhookService");

/**
 * Maneja las notificaciones de webhook de Mercado Pago.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
async function handleWebhook(req, res) {
  console.log("🔔 Notificación recibida:", JSON.stringify(req.body, null, 2));
  console.log("BODY: ::::::::::::::::::::::::::::::::", req.body);

  // Asegúrate de acceder a req.body.data.id, ya que es allí donde se encuentra el ID del pago
  const paymentId = req.body?.data?.id;

  console.log("PAYMENT ID (paymentId)::::::::::::::::::: ", paymentId);
  

  if (!paymentId) {
    console.warn("⚠️ Webhook mal formado: falta 'data.id'");
    return res
      .status(400)
      .json({ error: "Malformed webhook: 'data.id' is missing" });
  }

  try {
    await processPaymentNotification(paymentId);
    console.log("✅ Webhook procesado correctamente.");
  } catch (error) {
    console.error("❌ Error en el controlador del webhook:", error.message);
  }

  // Siempre respondemos con 200 OK para que Mercado Pago no reintente
  res.sendStatus(200);
}

module.exports = { handleWebhook };
