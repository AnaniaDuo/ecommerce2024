const Sequelize = require("sequelize");
const db = require("../db");

const OrderDetails = db.define("OrderDetails", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = OrderDetails;
