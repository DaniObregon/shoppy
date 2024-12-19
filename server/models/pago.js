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
      amount: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Pago",
    }
  );
  return Pago;
};
