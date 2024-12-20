const express = require("express");
const router = express.Router();
const { getAllTeachers } = require("../controllers/teachers");

router.get("/teachers", async (req, res) => {
  await getAllTeachers(req, res);
});
//create a route for getting a teacher by thier id
//define the route
//add controller in teachers.js
//add get all strdents routes

module.exports = router;
