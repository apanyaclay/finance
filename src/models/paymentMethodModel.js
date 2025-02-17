const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const PaymentMethod = sequelize.sequelize.define(
    "PaymentMethod",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      method_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      provider: {
        type: DataTypes.STRING(50),
        allowNull: false,
      }
    },
    {
      tableName: "payment_methods",
    }
  );
  
  module.exports = PaymentMethod;