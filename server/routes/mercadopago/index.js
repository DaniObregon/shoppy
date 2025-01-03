const router = require('express').Router();
const paymentsRouter = require('./payments');
const webhookRouter = require('./webhook');

// Rutas para pagos (ej: /mercadopago/payments)
router.use('/payments', paymentsRouter);

// Rutas para webhooks (ej: /mercadopago/webhook)
router.use('/webhook', webhookRouter);

module.exports = router;
