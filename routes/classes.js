const express = require("express");
const router = express.Router();
const { getClassesByTeacher } = require("../models/classes");

// Route to get all classes taught by a specific teacher
router
  .route("/teachers/:teacherId/classes")
  .get((req, res) => getClassesByTeacher(req, res));

module.exports = router;
