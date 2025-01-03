const express = require("express");
const router = express.Router();
const { getClassesByTeacher } = require("../models/classes");
const { deleteClass, updateClass } = require("../models/classes");

// Route to update a class by ID
router.route("/classes/:classId").put((req, res) => updateClass(req, res)); // HTTP PUT for updating class

// Route to delete a class by ID
router.route("/classes/:classId").delete((req, res) => deleteClass(req, res)); // HTTP DELETE for deleting class

// Route to get all classes taught by a specific teacher
router
  .route("/teachers/:teacherId/classes")
  .get((req, res) => getClassesByTeacher(req, res));

module.exports = router;
