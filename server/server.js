const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(routes);
app.use(cors());

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      await db.sequelize.sync();
      console.log("Database synchronized");
    } catch (error) {
      console.error("Error executing seeders:", error);
    }
  });
}

process.on("SIGINT", async () => {
  console.log("\nStopping server...");
  process.exit();
});

module.exports = app;
