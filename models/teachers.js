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

async function getFreeTeachers(req, res) {
  try {
    const db = await connectToDb();
    const teachers = await db
      .collection("teachers")
      .find(
        {},
        {
          projection: {
            _id: 1,
          },
        }
      )
      .toArray();
    const teacherIds = teachers.map((teacher) => teacher._id.toString());
    console.log("teacher", teacherIds);
    const teachingTeachers = await db
      .collection("classes")
      .find(
        {},
        {
          projection: { primary_teacher_id: 1, secondary_teacher_ids: 1 },
        }
      )
      .toArray();

    const assignedTeachers = new Set([
      ...teachingTeachers.reduce((acc, curr) => {
        acc.push(curr.primary_teacher_id.toString());
        acc = [
          ...acc,
          ...curr.secondary_teacher_ids.map((id) => id.toString()),
        ];
        return acc;
      }, []),
    ]);
    const freeTeachers = teacherIds.filter(
      (teacherId) => !assignedTeachers.has(teacherId)
    );
    res.status(200).json(successResponse(freeTeachers));
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

module.exports = { getAllTeachers, getTeacherById, getFreeTeachers };
