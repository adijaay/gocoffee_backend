// models/user.js
const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");

// Sequelize connection
const sequelize = new Sequelize(process.env.MYSQL_ROUTE, {
  dialect: "mysql",
  logging: console.log, // Disable logging (you can enable it for debugging)
});

// Define a User model
const Merchant = sequelize.define("Merchant", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "ongoing"),
    allowNull: false,
    defaultValue: "active",
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      async isValidUserID(value) {
        try {
          const user = await User.findByPk(value);
          if (!user) {
            throw new Error("Invalid user ID");
          }
        } catch (error) {
          throw new Error("Error validating user ID: " + error.message);
        }
      },
    },
  },
});

Merchant.belongsTo(User, {
  foreignKey: "userID",
  targetKey: "id",
});

module.exports = { Merchant, sequelize };
