//const express = require("express");
const router = require("express").Router();
const adminApiRouter = require("./admin-api");
const apiRouter = require("./api");
const authenticateUser = require("../middleware/auth");
const authorizeRoles = require("../middleware/authorization");

router.use("/admin-api", authenticateUser, authorizeRoles(2, 3), adminApiRouter);
router.use("/api", apiRouter);

router.route("/").get((req, response) => {
  response.status(200).send("Ok");
});

module.exports = router;
