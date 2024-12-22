const router = require('express').Router();
const { Product } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const paymentData = req.body;
    if (paymentData.type === 'payment' && paymentData.data.id) {
      // Lógica para manejar la notificación de pago
      console.log('Webhook recibido:', paymentData);

      // Simulación de actualización de stock
      const product = await Product.findByPk(paymentData.data.product_id);
      if (product && product.stock > 0) {
        product.stock -= 1;
        await product.save();
        console.log('Stock actualizado');
      }
    }

    res.status(200).send('Webhook recibido');
  } catch (error) {
    console.error('Error en el webhook:', error);
    res.status(500).send('Error procesando el webhook');
  }
});

module.exports = router;
