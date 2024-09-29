const router = require("express").Router();
const productsRouter = require("./products");
const authRouter = require("./auth"); // Importamos el nuevo router de autenticación

router.use("/products", productsRouter);
router.use("/auth", authRouter); // Añadimos la ruta de autenticación

module.exports = router;
