const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  isCompleted: { type: Sequelize.BOOLEAN, default: false },
});

module.exports = Order;
