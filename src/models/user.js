// models/user.js
const { Sequelize, DataTypes } = require("sequelize");

// Sequelize connection
const sequelize = new Sequelize(process.env.MYSQL_ROUTE, {
  dialect: "mysql",
  logging: console.log, // Disable logging (you can enable it for debugging)
});

// Define a User model
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure emails are unique
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("user", "merchant"),
    allowNull: false,
    defaultValue: "user",
  },
});

module.exports = { User, sequelize };
