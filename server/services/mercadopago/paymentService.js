const { Preference } = require("mercadopago");
const { client } = require("../../config/mercadopago");
const { Product, User } = require("../../models");

const generatePaymentPreference = async (items, email) => {
  const productData = await Promise.all(
    items.map(async (item) => {
      console.log(`🔍 Buscando producto con ID: ${item.productId}`);

      const product = await Product.findByPk(item.productId);

      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `Stock insuficiente para el producto ID ${item.productId}`
        );
      }

      if (isNaN(product.price) || product.price <= 0) {
        throw new Error(
          `Precio no válido para el producto ID ${item.productId}`
        );
      }

      return {
        id: product.id.toString(),
        title: product.name,
        currency_id: "ARS",
        unit_price: parseFloat(product.price),
        quantity: parseInt(item.quantity),
      };
    })
  );

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error(`Usuario con email ${email} no encontrado`);
  }

  const preferenceData = {
    items: productData,
    back_urls: {
      success: `https://doshoppy.netlify.app/`,
      failure: `https://doshoppy.netlify.app/`,
      pending: `https://doshoppy.netlify.app/`,
    },
    auto_return: "approved",
    external_reference: JSON.stringify({
      order: `order_${Date.now()}`,
      user_id: user.id,
    }),
    notification_url:
      "https://8b69-186-139-54-151.ngrok-free.app/mercadopago/webhook",
    payer: {
      email: email,
      user_id: user.id,
    },
  };

  const preference = new Preference(client);
  const response = await preference.create({ body: preferenceData });

  if (!response.id) {
    throw new Error("Error inesperado al crear la preferencia de pago");
  }

  return response;
};

module.exports = {
  generatePaymentPreference,
};
