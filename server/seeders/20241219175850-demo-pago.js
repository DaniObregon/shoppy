"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pagos",
      [
        {
          id: 1,
          user_id: 1, // ID del usuario existente (John Doe)
          product_id: 1, // ID del producto existente (Zapatillas Nike Air)
          payment_id: "abc123", // ID ficticio único de pago
          status: "approved", // Estado del pago
          amount: 120.56, // Monto pagado
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pagos", { payment_id: "abc123" }, {});
  },
};
