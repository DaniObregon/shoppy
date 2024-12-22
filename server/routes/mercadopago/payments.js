const router = require('express').Router();
const mercadopago = require('../../config/mercadopago');

// Iniciar un pago
router.post('/checkout', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: req.body.title,
          unit_price: req.body.price,
          quantity: req.body.quantity,
        }
      ],
      back_urls: {
        success: `${req.protocol}://${req.get('host')}/mercadopago/success`,
        failure: `${req.protocol}://${req.get('host')}/mercadopago/failure`,
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ checkoutUrl: response.body.init_point });
  } catch (error) {
    console.error('Error creating payment preference:', error);
    res.status(500).json({ error: 'Error creating payment preference' });
  }
});

module.exports = router;
