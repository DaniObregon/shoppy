const productRepository = require("../../repositories/admin-api/productRepository");

// Listar productos
const getAllProducts = async () => {
  return await productRepository.findAll();
};

// Crear un producto
const createProduct = async (productData) => {
  return await productRepository.create(productData);
};

// Actualizar un producto
const updateProduct = async (id, productData) => {
  const updatedRows = await productRepository.update(id, productData);
  if (updatedRows === 0) throw new Error("Producto no encontrado");
  return await productRepository.findById(id);
};

// Eliminar un producto
const deleteProduct = async (id) => {
  const deletedRows = await productRepository.remove(id);
  if (deletedRows === 0) throw new Error("Producto no encontrado");
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
