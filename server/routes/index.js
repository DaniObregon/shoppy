const express = require('express');  // Agrega esto
const router = require('express').Router();
const adminApiRouter = require('./admin-api');
const apiRouter = require('./api');
const app = express();

router.use('/admin-api', adminApiRouter);
router.use('/api', apiRouter);

router.route('/').get((req, response) => {
  response.status(200).send('Ok');
});

module.exports = router;