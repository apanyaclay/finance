const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true
    }
  }, {
    tableName: 'users', // Nama tabel di database
  });
  
  module.exports = User;
