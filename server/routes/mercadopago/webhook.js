const express = require("express");
const router = express.Router();
const {
  handleWebhook,
} = require("../../controllers/mercadopago/webhookController");

// Ruta para recibir notificaciones de Mercado Pago
router.post("/", handleWebhook);

module.exports = router;
