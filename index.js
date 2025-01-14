const express = require("express");
const app = express();
const routes = require("./routes");
const registerRoutes = require("./utils/registerRoutes");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
registerRoutes(app, routes);

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("connected to db"))
  .catch((err) => {
    console.log("Error connecting to db: ", err);
  });

app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log("Server started on ", process.env.PORT);
});
