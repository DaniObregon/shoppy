const router = require("express").Router();
const productsRouter = require("./products");
const authRouter = require("./auth");

router.use("/products", productsRouter);
router.use("/auth", authRouter);

module.exports = router;
