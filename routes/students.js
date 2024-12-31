const express = require("express");
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  getStudentsByTeacherId,
} = require("../models/students");

router.get("/students", async (req, res) => {
  await getAllStudents(req, res);
});
//create a route for getting a teacher by thier id

router.get("/students/:id", async (req, res) => {
  await getStudentById(req, res);
});

router.post("/students", async (req, res) => {
  await addStudent(req, res);
});

router.get("/students/by/teacher/:id", getStudentsByTeacherId);

router.get("/teachers/:teacherId/students", getStudentsByTeacher);

router.put("/students/:id", async (req, res) => {
  await updateStudent(req, res);
});
module.exports = router;
