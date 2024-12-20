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
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      payment_id: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: 0.01, // Monto mínimo permitido
        },
      },
    },
    {
      sequelize,
      modelName: "Pago",
    }
  );
  return Pago;
};
