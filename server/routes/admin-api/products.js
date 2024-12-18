const router = require("express").Router();
const { Product } = require("../../models");

// Listar productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("ERROR", error);
    res.sendStatus(500);
  }
});

// Crear un producto
router.post("/", async (req, res) => {
  const { name, brand, model, description, price, stock, imgUrl } = req.body;
  try {
    const newProduct = await Product.create({ name, brand, model, description, price, stock, imgUrl });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("ERROR", error);
    res.sendStatus(500);
  }
});

// Actualizar un producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, brand, model, description, price, stock, imgUrl } = req.body;
  try {
    const [updatedRows] = await Product.update(
      { name, brand, model, description, price, stock, imgUrl },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    const updatedProduct = await Product.findByPk(id);
    res.json(updatedProduct);
  } catch (error) {
    console.error("ERROR", error);
    res.sendStatus(500);
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Product.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("ERROR", error);
    res.sendStatus(500);
  }
});

module.exports = router;
