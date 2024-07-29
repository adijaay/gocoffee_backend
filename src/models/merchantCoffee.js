// models/user.js
const { Sequelize, DataTypes } = require("sequelize");
const { Merchant } = require("./merchant");
const { Coffee } = require("./coffee");

// Sequelize connection
const sequelize = new Sequelize(process.env.MYSQL_ROUTE, {
  dialect: "mysql",
  logging: console.log, // Disable logging (you can enable it for debugging)
});

// Define a User model
const merchantCoffee = sequelize.define("merchantCoffee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  merchantID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  coffeeID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      async isValidCoffeeID(coffeeID) {
        try {
          const coffee = await Coffee.findOne({
            where: { id: coffeeID },
          });
          if (!coffee) {
            throw new Error("Coffee does not exist");
          }
        } catch (error) {
          throw new Error("Error validating Coffee ID: " + error.message);
        }
      },
    },
  },
});

merchantCoffee.belongsTo(Coffee, {
  foreignKey: "coffeeID",
  sourceKey: "id",
});

module.exports = { merchantCoffee, sequelize };
