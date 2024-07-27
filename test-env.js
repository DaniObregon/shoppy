// test-env.js
require('dotenv').config();
console.log(process.env.DB_USER); // Debería imprimir 'postgres'
