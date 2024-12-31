const {
  processPaymentNotification,
} = require("../../services/mercadopago/webhookService");

/**
 * Maneja las notificaciones de webhook de Mercado Pago.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
async function handleWebhook(req, res) {
  // console.log("🔔 Notificación recibida:", JSON.stringify(req.body, null, 2));
  // console.log("BODY: ", req.body);

  const { type, data, topic } = req.body;

  // Validar si la notificación es de tipo 'payment' y tiene 'data.id'
  if (type === "payment" && data?.id) {
    const paymentId = data.id;
    console.log(
      "✅ Notificación 'payment' válida recibida. paymentId:",
      paymentId
    );
    console.log("BODY: ", req.body);

    try {
      await processPaymentNotification(paymentId);
      console.log(
        "✅ Webhook procesado correctamente para PAYMENT ID:",
        paymentId
      );
    } catch (error) {
      console.error(
        "❌ Error al procesar la notificación 'payment':",
        error.message
      );
    }

    // Responder siempre con 200 OK para evitar reintentos de mercadopago
    return res.sendStatus(200);
  }

  // Manejo de notificaciones no válidas o irrelevantes
  console.warn("ℹ️ Notificación no procesable recibida: se responde con 200 para evitar reintentos");
  console.warn("ℹ️ Tipo de notificación:", type ? type : topic ? topic : "No especificado");
  console.warn("ℹ️ Contenido del cuerpo:", JSON.stringify(req.body, null, 2));

  // Para cualquier otro tipo de notificación, responder con 200 OK
  return res.sendStatus(200);
}

module.exports = { handleWebhook };
