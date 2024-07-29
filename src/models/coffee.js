// models/user.js
const { Sequelize, DataTypes } = require("sequelize");

// Sequelize connection
const sequelize = new Sequelize(process.env.MYSQL_ROUTE, {
  dialect: "mysql",
  logging: console.log, // Disable logging (you can enable it for debugging)
});

// Define a User model
const Coffee = sequelize.define("Coffee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("starling", "modern"),
    allowNull: true,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = { Coffee, sequelize };
