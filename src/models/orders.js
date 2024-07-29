// models/user.js
const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const { Merchant } = require("./merchant");

// Sequelize connection
const sequelize = new Sequelize(process.env.MYSQL_ROUTE, {
  dialect: "mysql",
  logging: console.log, // Disable logging (you can enable it for debugging)
});

// Define a User model
const Order = sequelize.define("Order", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address_detail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude_buyer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude_buyer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coffee_requested: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  done_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("searching", "cancelled", "completed", "ongoing"),
    allowNull: false,
    defaultValue: "searching",
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
  merchantID: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      async isValidMerchantID(value) {
        try {
          if (value == null) return;
          const merchant = await Merchant.findByPk(value);
          if (!merchant) {
            throw new Error("Invalid Merchant ID");
          }
        } catch (error) {
          throw new Error("Error validating Merchant ID: " + error.message);
        }
      },
    },
  },
});

Order.belongsTo(User, {
  foreignKey: "userID",
  targetKey: "id",
});
Order.belongsTo(Merchant, {
  foreignKey: "merchantID",
  targetKey: "id",
});

module.exports = { Order, sequelize };
