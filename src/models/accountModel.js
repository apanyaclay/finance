const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const User = require("./userModel");

const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Relasi dengan model User
        key: "id",
      },
      onDelete: "CASCADE",
    },
    account_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    account_type: {
      type: DataTypes.ENUM("saving", "checking", "investment", "loan"),
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(15, 2),
      defaultValue: 0.0,
    },
  },
  {
    tableName: "accounts", // Nama tabel di database
  }
);

User.hasMany(Account, { foreignKey: "user_id" });
Account.belongsTo(User, { foreignKey: "user_id" });

module.exports = Account;
