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
          payment_id: "123456789", // ID ficticio único de pago
          status: "approved", // Estado del pago
          transaction_amount: 100, // Valor del producto
          total_paid_amount: 100, // Total pagado
          fee_amount: 7.61,
          net_received_amount: 98, // Total recibido
          status_detail: "accredited", // Detalles del estado
          money_release_date: new Date(), // Fecha de liberación del dinero
          money_release_status:"pending",
          currency_id: "ARS", // Moneda
          payer_name:"Giuseppe Fiorentino",
          identification: "DNI 12457898",
          phone_number: "1155718458",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pagos", { payment_id: "123456789" }, {});
  },
};
