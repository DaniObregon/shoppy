const {
  generatePaymentPreference,
} = require("../../services/mercadopago/paymentService");

const createPaymentPreference = async (req, res) => {
  try {
    console.log("🔍 Request body recibido:", JSON.stringify(req.body, null, 2));

    const { items, email } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || !email) {
      console.warn("⚠️ Faltan items (array no vacío) o email en el body");
      return res
        .status(400)
        .json({ error: "Faltan items (array no vacío) o email en el body" });
    }

    const paymentResponse = await generatePaymentPreference(items, email);

    console.log(
      "✅ URL de pago generada correctamente:",
      paymentResponse.init_point
    );

    res.json({
      id: paymentResponse.id,
      init_point: paymentResponse.init_point,
      checkoutUrl: paymentResponse.init_point,
    });
  } catch (error) {
    console.error(
      "❌ Error creando la preferencia de pago:",
      error.response?.data || error.message || error
    );
    res.status(500).json({
      error: "Error creando la preferencia de pago",
      details: error.response?.data || error.message,
    });
  }
};

module.exports = {
  createPaymentPreference,
};
