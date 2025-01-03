const router = require("express").Router();
const {
  listProducts,
  addProduct,
  editProduct,
  removeProduct,
} = require("../../controllers/admin-api/productController");

// Listar productos
router.get("/", listProducts);

// Crear un producto
router.post("/", addProduct);

// Actualizar un producto
router.put("/:id", editProduct);

// Eliminar un producto
router.delete("/:id", removeProduct);

module.exports = router;
