"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pago extends Model {
    static associate(models) {
      Pago.belongsTo(models.User, { foreignKey: "user_id" });
      Pago.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  Pago.init(
    {
      user_id: DataTypes.BIGINT,
      product_id: DataTypes.BIGINT,
      payment_id: DataTypes.BIGINT,
      transaction_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_paid_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      fee_amount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      net_received_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status_detail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
      },
      money_release_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      money_release_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currency_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payer_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      identification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Pago",
    }
  );
  return Pago;
};
