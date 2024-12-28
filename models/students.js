const { connectToDb, ObjectId } = require("../db");
const {
  failureResponse,
  successResponse,
  createdResponse,
  updatedResponse,
  deleteResponse,
} = require("../utils/response");

async function getAllStudents(req, res) {
  try {
    const db = await connectToDb();
    const collection = await db.collection("students");
    const results = await collection.find().toArray();
    if (results) {
      res.status(200).json(successResponse(results));
    }
  } catch (err) {}
}
async function getStudentById(req, res) {
  try {
    const db = await connectToDb();
    const studentId = ObjectId.createFromHexString(req.params.id);
    const student = await db.collection("students").findOne({ _id: studentId });
    if (student) {
      res.status(200).json(successResponse(student));
      return;
    }
    res.status(404).json(failureResponse("Invalid Id"));
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

async function addStudent(req, res) {
  try {
    const db = await connectToDb();
    if (Array.isArray(req.body)) {
      const students = await db.collection("students").insertMany(req.body);
      if (students.acknowledged) {
        res.status(200).json(createdResponse(students.insertedIds));
        return;
      } else {
        res.status(500).json(failureResponse());
      }
    } else {
      const student = await db.collection("students").insertOne(req.body);
      if (student.acknowledged) {
        res.status(200).json(createdResponse(student.insertedId));
        return;
      } else {
        res.status(500).json(failureResponse());
      }
    }
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}
async function updateStudent(req, res) {
  try {
    const db = await connectToDb();
    const student = await db.collection("students").updateOne(
      { _id: ObjectId.createFromHexString(req.params.id) },
      {
        $set: {
          ...req.body,
        },
      }
    );
    if (student.acknowledged) {
      res.status(200).json(updatedResponse());
      return;
    } else {
      res.status(500).json(failureResponse());
    }
  } catch (error) {}
}

//TODO
// Get all classes taught by the teachers
// Get all students where class_id is one the classes taught by the teacher

async function getStudentsByTeacherId(req, res) {
  try {
    const db = await connectToDb();
    const teacherId = ObjectId.createFromHexString(req.params.id);
    const classesTaught = await db
      .collection("classes")
      .find({
        $or: [
          { primary_teacher_id: teacherId },
          {
            secondary_teacher_ids: teacherId,
          },
        ],
      })
      .toArray();
    const classIds = classesTaught.map((c) => {
      return c._id.toString();
    });
    const students = await db
      .collection("students")
      .find({
        class_id: {
          $in: [...classIds],
        },
      })
      .toArray();
    res.status(200).json(successResponse(students));
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}
async function deleteStudentById() {
  //deleteOne
  //req.params.id
}

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  getStudentsByTeacherId,
};
