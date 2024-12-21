const { connectToDb, ObjectId } = require("../db");
const { failureResponse, successResponse } = require("../utils/response");
async function getAllTeachers(req, res) {
  try {
    const db = await connectToDb();
    const collection = await db.collection("teachers");
    const results = await collection.find().toArray();
    if (results) {
      res.status(200).json(successResponse(results));
    }
  } catch (err) {
    res.status(400).json(failureResponse(err));
  }
}
async function getTeacherById(req, res) {
  try {
    const db = await connectToDb();
    const teacherId = ObjectId.createFromHexString(req.params.id);
    const teacher = await db.collection("teachers").findOne({ _id: teacherId });
    if (teacher) {
      res.status(200).json(successResponse(teacher));
      return;
    }
    res.status(404).json(failureResponse("Invalid Id"));
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

async function updateTeacher() {}
async function deleteTeacherById() {}

module.exports = { getAllTeachers, getTeacherById };
