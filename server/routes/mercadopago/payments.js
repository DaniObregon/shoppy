const router = require("express").Router();
const { Preference } = require("mercadopago");
const { client } = require("../../config/mercadopago");
const { Product } = require("../../models");
const { User } = require("../../models");

router.post("/checkout", async (req, res) => {
  try {
    console.log("🔍 Request body recibido:", JSON.stringify(req.body, null, 2));

    const { items, email } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0 || !email) {
      console.warn("⚠️ Faltan items (array no vacío) o email en el body");
      return res
        .status(400)
        .json({ error: "Faltan items (array no vacío) o email en el body" });
    }

    // Validación de los productos
    const productData = await Promise.all(
      items.map(async (item) => {
        console.log(`🔍 Buscando producto con ID: ${item.productId}`);

        const product = await Product.findByPk(item.productId);

        if (!product) {
          console.error(`❌ Producto con ID ${item.productId} no encontrado`);
          throw new Error(`Producto con ID ${item.productId} no encontrado`);
        }

        if (product.stock < item.quantity) {
          console.error(
            `❌ Stock insuficiente para el producto ID ${item.productId}`
          );
          throw new Error(
            `Stock insuficiente para el producto ID ${item.productId}`
          );
        }

        if (isNaN(product.price) || product.price <= 0) {
          console.error(
            `❌ Precio no válido para el producto ID ${item.productId}`
          );
          throw new Error(
            `Precio no válido para el producto ID ${item.productId}`
          );
        }

        console.log(
          `✅ Producto validado: ${product.name}, Cantidad: ${item.quantity}, Precio: ${product.price}`
        );

        return {
          id: product.id.toString(),
          title: product.name,
          currency_id: "ARS",
          unit_price: parseFloat(product.price),
          quantity: parseInt(item.quantity),
        };
      })
    );

    // Buscar el user_id a partir del email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.error(`❌ Usuario con email ${email} no encontrado`);
      return res
        .status(404)
        .json({ error: `Usuario con email ${email} no encontrado` });
    }

    // Validación extra de los items antes de enviarlos a Mercado Pago
    productData.forEach((item) => {
      if (
        !item.id ||
        !item.title ||
        !item.currency_id ||
        isNaN(item.unit_price) ||
        isNaN(item.quantity)
      ) {
        console.error("❌ Un item no tiene el formato correcto:", item);
        throw new Error(`El item con ID ${item.id} tiene un formato inválido`);
      }
    });

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
        user_id: user.id, // Agregamos el user_id en el external_reference como un objeto
      }),
      notification_url:
        "https://9902-186-139-54-151.ngrok-free.app/mercadopago/webhook",
      payer: {
        email: email,
        // Asociar el user_id con la preferencia
        user_id: user.id, // Se agrega el user_id del usuario encontrado
      },
    };

    console.log(
      "🛠️ preferenceData construido:",
      JSON.stringify(preferenceData, null, 2)
    );

    // Crear una nueva instancia de Preference
    const preference = new Preference(client);

    // Crear la preferencia directamente sin parsear el JSON
    const response = await preference.create({ body: preferenceData });

    console.log(
      "📤 Respuesta de Mercado Pago:",
      JSON.stringify(response, null, 2)
    );

    if (response.id) {
      console.log(
        "✅ URL de pago generada correctamente:",
        response.init_point
      );
      res.json({
        id: response.id,
        init_point: response.init_point,
        checkoutUrl: response.init_point,
      });
    } else {
      console.error("❌ Respuesta inesperada de Mercado Pago:", response);
      res
        .status(500)
        .json({ error: "Error inesperado al crear la preferencia" });
    }
  } catch (error) {
    console.error(
      "❌ Error creating payment preference:",
      error.response?.data || error.message || error
    );
    res.status(500).json({
      error: "Error creating payment preference",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
