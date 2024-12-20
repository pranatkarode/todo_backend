const express = require("express");
const app = express();
const routes = require("./routes/healthCheck");
const teachersRoutes = require("./routes/teachers");
require("dotenv").config();

app.use(express.json());
app.use(routes);
app.use(teachersRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on ", process.env.PORT);
});
