const router = require("express").Router();
const { Product } = require("../../models");
const authenticateUser = require("../../middleware/auth");
const authorizeRoles = require("../../middleware/authorization");

router.route("/").get(authenticateUser, authorizeRoles(2, 3), (req, res) => {
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
