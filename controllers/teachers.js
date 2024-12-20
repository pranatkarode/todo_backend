const connectToDb = require("../db");
const { failureResponse, successResponse } = require("../utils/results");
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
async function getTeacherById() {}

async function updateTeacher() {}
async function deleteTeacherById() {}

module.exports = { getAllTeachers, getTeacherById };
