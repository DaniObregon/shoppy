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
          transaction_amount: 120.56, // Valor del producto
          total_paid_amount: 120.56, // Total pagado
          net_received_amount: 120.0, // Total recibido
          status_detail: "accredited", // Detalles del estado
          money_release_date: new Date(), // Fecha de liberación del dinero
          currency_id: "ARS", // Moneda
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
