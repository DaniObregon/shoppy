const express = require('express');
const db = require('../models');
const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await db.sequelize.sync();
  console.log('Database synchronized');
  
  // // Insertar datos iniciales con seeders
  // try {
  //   await db.sequelize.seeders.up();
  //   console.log('Seeders executed');
  // } catch (error) {
  //   console.error('Error executing seeders:', error);
  // }
});

process.on('SIGINT', async () => {
  console.log('\nStopping the server...');
  // Eliminar los registros en la tabla Users
  // try {
  //   await db.sequelize.seeders.down();
  //   console.log('Deleted records from Users table');
  // } catch (error) {
  //   console.error('Error deleting records:', error);
  // }
  process.exit();
});
