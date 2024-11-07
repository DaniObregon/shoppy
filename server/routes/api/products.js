const router = require("express").Router();
const { Product } = require("../../models");

router.route("/").get((req, res) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((e) => {
      console.error("ERROR", e);
      res.sendStatus(500);
    });
});

// Ruta para obtener un producto específico por ID
router.route("/:id").get((req, res) => {
  const { id } = req.params;
  Product.findByPk(id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).send({ error: "Product not found" });
      }
    })
    .catch((e) => {
      console.error("ERROR", e);
      res.sendStatus(500);
    });
});

module.exports = router;
