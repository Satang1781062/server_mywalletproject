const express = require('express');
const cors = require("cors");

const { readdirSync } = require("fs");
const sequelize = require("./config/db");
require("dotenv").config();



const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to MyWallet API"));

// Routes auto-load
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

sequelize
  .sync()
  .then(() => {
    console.log('Database connected and synced');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));