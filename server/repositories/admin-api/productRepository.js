const { Product } = require("../../models");

// Obtener todos los productos
const findAll = async () => {
  return await Product.findAll();
};

// Crear un producto
const create = async (productData) => {
  return await Product.create(productData);
};

// Actualizar un producto
const update = async (id, productData) => {
  const [updatedRows] = await Product.update(productData, { where: { id } });
  return updatedRows;
};

// Buscar producto por ID
const findById = async (id) => {
  return await Product.findByPk(id);
};

// Eliminar un producto
const remove = async (id) => {
  return await Product.destroy({ where: { id } });
};

module.exports = {
  findAll,
  create,
  update,
  findById,
  remove,
};
