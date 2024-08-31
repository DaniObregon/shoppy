const express = require('express');
const app = express();
const productsRouter = require('./api/products.js');

// Otras configuraciones y middlewares...

app.use('/api/products', productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
