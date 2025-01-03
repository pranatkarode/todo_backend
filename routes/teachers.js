const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  getTeacherById,
  getFreeTeachers,
} = require("../models/teachers");

router.get("/teachers", async (req, res) => {
  await getAllTeachers(req, res);
});
//create a route for getting a teacher by thier id
//define the route
//add controller in teachers.js
//add get all strdents routes

router.get("/teachers/free", getFreeTeachers);

router.get("/teachers/:id", async (req, res) => {
  console.log("came here");
  await getTeacherById(req, res);
});

module.exports = router;
