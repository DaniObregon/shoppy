const express = require("express");
const router = express.Router();
const { Product } = require("../../models"); // Asegúrate de importar el modelo correcto
const mercadopago = require("../../config/mercadopago"); // Asegúrate de que exista esta configuración

// Webhook para recibir notificaciones de Mercado Pago
router.post("/", async (req, res) => {
  try {
    const payment = req.body;
    console.log("🔄 Recibiendo webhook de Mercado Pago:", payment);

    if (!payment || !payment.type) {
      return res.status(400).json({ message: "Datos de webhook no válidos" });
    }

    if (payment.type === "payment") {
      const paymentId = payment.data.id;

      // Verificamos si el ID de pago es válido
      if (!paymentId) {
        return res.status(400).json({ message: "ID de pago no válido" });
      }

      // Consultamos la información del pago desde Mercado Pago
      try {
        const paymentInfo = await mercadopago.payment.findById(paymentId);

        if (paymentInfo && paymentInfo.response.status === "approved") {
          console.log("✅ Pago aprobado:", paymentInfo.response);

          const productId = paymentInfo.response.additional_info.items[0].id;
          const quantity =
            paymentInfo.response.additional_info.items[0].quantity;

          const product = await Product.findByPk(productId);
          if (product) {
            product.stock -= quantity;
            await product.save();
            console.log("🛒 Stock actualizado para el producto:", productId);
          } else {
            console.warn("⚠️ Producto no encontrado:", productId);
          }
        } else {
          console.warn("⚠️ Pago no aprobado:", paymentInfo.response);
        }
      } catch (error) {
        console.error("❌ Error al obtener la información del pago:", error);
        return res
          .status(500)
          .json({ message: "Error al obtener la información del pago" });
      }
    }

    res.status(200).json({ message: "Webhook procesado correctamente" });
  } catch (error) {
    console.error("❌ Error al procesar el webhook:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
