const router = require("express").Router();
const {
  models: { User, Order, OrderDetails, Product },
} = require("../db");
const { requireToken, isAdmin } = require("./authentication");
module.exports = router;

// GET /api/users
router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        "id",
        "username",
        "firstName",
        "lastName",
        "email",
        "isAdmin",
      ],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:userId/cart
router.get("/:userId/cart", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.params.userId,
        isCompleted: false,
      },
      include: Product,
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:userId/cart
router.post("/:userId/cart", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.body.productId;
    const [cart, created] = await Order.findOrCreate({
      where: {
        userId,
        isCompleted: false,
      },
    });
    await OrderDetails.create({
      orderId: cart.id,
      productId,
    });

    const updatedCart = await Order.findOne({
      where: {
        id: cart.id,
      },
      include: Product,
    });
    res.send(updatedCart);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/users/:userId/cart/:productId
router.delete(
  "/:userId/cart/:productId",

  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const productId = req.body.productId;
      const cart = await Order.findOne({
        where: {
          userId,
          isCompleted: false,
        },
      });
      const orderDetails = await OrderDetails.findOne({
        where: {
          orderId: cart.id,
          productId,
        },
      });

      await orderDetails.destroy();
      res.json(orderDetails);
    } catch (err) {
      next(err);
    }
  }
);

// modify isCompleted is true at checkout
// put /api/users/:userId/checkout
router.put("/:userId/checkout", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const order = await Order.findOne({
      where: { userId, isCompleted: false },
      include: Product,
    });
    const updatedOrder = await order.update(req.body);
    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});

// modify product quantity
// put /api/users/:userId/cart/:productId
router.put("/:userId/cart/:productId", async (req, res, next) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Order.findOne({ where: { userId } });
    let productToBeUpdated = await OrderDetails.findOne({
      where: { orderId: cart.id, productId },
    });
    await productToBeUpdated.update(req.body);
    res.json(productToBeUpdated);
  } catch (err) {
    next(err);
  }
});
