const productService = require("../../services/admin-api/productService");

const listProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

const addProduct = async (req, res) => {
  console.log("Request body:", req.body);
  // Imprimir cada propiedad y su tipo
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value} (Tipo: ${typeof value})`);
  }
  try {
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

const editProduct = async (req, res) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  } catch (error) {
    handleControllerError(res, error);
  }
};

const removeProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.status(204).send();
  } catch (error) {
    handleControllerError(res, error);
  }
};

const handleControllerError = (res, error) => {
  console.error("❌ ERROR:", error.message);
  res.status(error.message === "Producto no encontrado" ? 404 : 500).json({
    error: error.message,
  });
};

module.exports = {
  listProducts,
  addProduct,
  editProduct,
  removeProduct,
};
