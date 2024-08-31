const router = require("express").Router();
const { Product } = require("../../models");

router.route("/").get(checkAuth, (req, res) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((e) => {
      console.error("ERROR", e);
      res.sendStatus(500);
    });
});

module.exports = router;
