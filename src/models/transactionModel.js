const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Account = require("./accountModel");
const User = require("./userModel");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  account_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Account,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  transaction_type: {
    type: DataTypes.ENUM("income", "expense", "transfer"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
}, {
  tableName: "transactions",
});

// Relasi ke User
Transaction.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Transaction, { foreignKey: "user_id" });

// Relasi ke Account
Transaction.belongsTo(Account, { foreignKey: "account_id" });
Account.hasMany(Transaction, { foreignKey: "account_id" });

module.exports = Transaction;
