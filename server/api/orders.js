const router = require("express").Router();
const {
  models: { User, Order, OrderDetails, Product },
} = require("../db");
const { requireToken, isAdmin } = require("./authentication");
module.exports = router;

// GET /api/orders
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: Product,
      order: [["updatedAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders/:orderId
router.post("/:orderId", requireToken, isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.orderId },
      include: Product,
    });
    order.update(req.body);

    // prepare data for bulk update
    const products = order.products.map((product) => ({
      id: product.id,
      inventoryQuantity:
        product.inventoryQuantity - product.OrderDetails.quantity,
    }));

    // perform bulk update
    const updatePromises = products.map((product) =>
      Product.update(
        { inventoryQuantity: product.inventoryQuantity },
        { where: { id: product.id } }
      )
    );

    await Promise.all(updatePromises);

    // update the order object in memory with the new inventory quantities
    order.products.forEach((product) => {
      const updatedProduct = products.find((p) => p.id === product.id);
      if (updatedProduct) {
        product.inventoryQuantity = updatedProduct.inventoryQuantity;
      }
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

// router.get("/", requireToken, isAdmin, async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       include: Product,
//       order: [["updatedAt", "DESC"]],
//     });
//     res.json(orders);
//   } catch (err) {
//     next(err);
//   }
// });

// // POST /api/orders/:orderId
// router.post("/:orderId", requireToken, isAdmin, async (req, res, next) => {
//   try {
//     const order = await Order.findOne({
//       where: { id: req.params.orderId },
//     });
//     order.update({ isFullfilled: true });
//     res.json(order);
//   } catch (err) {
//     next(err);
//   }
// });
