const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/productId
router.put("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productToBeUpdated = await Product.findByPk(productId);
    await productToBeUpdated.update(req.body);
    res.json(productToBeUpdated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/products/:productId
router.delete("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});
