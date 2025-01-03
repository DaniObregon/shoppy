"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Pagos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      payment_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
      },
      //Valor del producto
      transaction_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      //Total pagado
      total_paid_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      fee_amount: { // ➡️ Nuevo campo
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      //Total recibido
      net_received_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      //Detalle en el que resultó el Cobro
      status_detail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //status: estado actual del pago. Approved, pending...
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      //Fecha de liberacion del dinero
      money_release_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      money_release_status:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      //currency_id: id de la moneda de pago
      currency_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      payer_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      identification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pagos");
  },
};
