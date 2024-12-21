const express = require("express");
const app = express();
const routes = require("./routes/healthCheck");
const teachersRoutes = require("./routes/teachers");
const studentRoutes = require("./routes/students");
require("dotenv").config();

app.use(express.json());
app.use(routes);

app.use(teachersRoutes);
app.use(studentRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started on ", process.env.PORT);
});
