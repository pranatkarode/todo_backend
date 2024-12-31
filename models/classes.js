// implement CRUD operation for classes and for teacher (update and delete)

// write a route which gets all the classes that are taught by a teacher

const { connectToDb, ObjectId } = require("../db");
const {
  failureResponse,
  successResponse,
  createdResponse,
  updatedResponse,
  deleteResponse,
} = require("../utils/response");

// Get all teachers
async function getAllTeachers(req, res) {
  try {
    const db = await connectToDb();
    const collection = await db.collection("teachers");
    const results = await collection.find().toArray();
    if (results) {
      res.status(200).json(successResponse(results));
    }
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

// Get teacher by using their id
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

// Add a teacher
async function addTeacher(req, res) {
  try {
    const db = await connectToDb();
    if (Array.isArray(req.body)) {
      const teachers = await db.collection("teachers").insertMany(req.body);
      if (teachers.acknowledged) {
        res.status(200).json(createdResponse(teachers.insertedIds));
        return;
      } else {
        res.status(500).json(failureResponse());
      }
    } else {
      const teacher = await db.collection("teachers").insertOne(req.body);
      if (teacher.acknowledged) {
        res.status(200).json(createdResponse(teacher.insertedId));
        return;
      } else {
        res.status(500).json(failureResponse());
      }
    }
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

// Update a teacher
async function updateTeacher(req, res) {
  try {
    const db = await connectToDb();
    const teacher = await db.collection("teachers").updateOne(
      { _id: ObjectId.createFromHexString(req.params.id) },
      {
        $set: {
          ...req.body,
        },
      }
    );
    if (teacher.acknowledged) {
      res.status(200).json(updatedResponse());
      return;
    } else {
      res.status(500).json(failureResponse());
    }
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

// Delete a teacher
async function deleteTeacherById(req, res) {
  try {
    const db = await connectToDb();
    const teacher = await db.collection("teachers").deleteOne({
      _id: ObjectId.createFromHexString(req.params.id),
    });
    if (teacher.acknowledged) {
      res.status(200).json(deleteResponse());
      return;
    } else {
      res.status(500).json(failureResponse());
    }
  } catch (error) {
    res.status(500).json(failureResponse(error));
  }
}

// Get all classes taught by a teacher
async function getClassesByTeacher(req, res) {
  try {
    const db = await connectToDb();
    if (!ObjectId.isValid(req.params.teacherId)) {
      return res.status(400).json(failureResponse("Invalid teacher ID format"));
    }
    const teacherId = new ObjectId(req.params.teacherId);

    const classes = await db
      .collection("classes")
      .find({
        $or: [
          { primary_teacher_id: teacherId },
          { secondary_teacher_ids: teacherId },
        ],
      })
      .toArray();

    if (classes.length == 0) {
      return res
        .status(404)
        .json(failureResponse("No classes found for this teacher"));
    }

    res.status(200).json(successResponse(classes));
  } catch (error) {
    res
      .status(500)
      .json(failureResponse("An error occurred while fetching classes"));
  }
}

module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacherById,
  getClassesByTeacher,
};
