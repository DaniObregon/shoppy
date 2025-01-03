const router = require("express").Router();
const {
  handleWebhook,
} = require("../../controllers/mercadopago/webhookController");

// Ruta para manejar notificaciones de Mercado Pago
router.post("/", handleWebhook);

module.exports = router;
