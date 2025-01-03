const router = require("express").Router();
const {
  createPaymentPreference,
} = require("../../controllers/mercadopago/paymentController");

// POST /mercadopago/checkout
router.post("/checkout", createPaymentPreference);

module.exports = router;
