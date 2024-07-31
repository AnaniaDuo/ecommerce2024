//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Order = require("./models/Order");
const Product = require("./models/Product");
const OrderDetails = require("./models/OrderDetails");

//associations could go here!

// User - Order: one-to-many
User.hasMany(Order);
Order.belongsTo(User);

// Product - Order: many-to-many
Product.belongsToMany(Order, { through: "OrderDetails" });
Order.belongsToMany(Product, { through: "OrderDetails" });

module.exports = {
  db,
  models: {
    User,
    Order,
    Product,
    OrderDetails,
  },
};
