const { connectToDb, ObjectId } = require("../db");
const {
  failureResponse,
  successResponse,
  createdResponse,
  updatedResponse,
  deleteResponse,
} = require("../utils/response");

// Get all classes
async function getAllClasses(req, res) {
  try {
    const db = await connectToDb();
    const classes = await db.collection("classes").find().toArray();
    res.status(200).json(successResponse(classes));
  } catch (error) {
    res.status(500).json(failureResponse(error.message));
  }
}

// Get class by ID
async function getClassById(req, res) {
  try {
    const db = await connectToDb();
    const classId = ObjectId.createFromHexString(req.params.id);
    const classData = await db.collection("classes").findOne({ _id: classId });

    if (classData) {
      res.status(200).json(successResponse(classData));
    } else {
      res.status(404).json(failureResponse("Class not found"));
    }
  } catch (error) {
    res.status(500).json(failureResponse(error.message));
  }
}

// Add a new class
async function addClass(req, res) {
  try {
    const db = await connectToDb();
    const newClass = req.body;

    const result = await db.collection("classes").insertOne(newClass);
    if (result.acknowledged) {
      res.status(201).json(createdResponse(result.insertedId));
    } else {
      res.status(500).json(failureResponse("Failed to add class"));
    }
  } catch (error) {
    res.status(500).json(failureResponse(error.message));
  }
}

// Update class by ID
async function updateClass(req, res) {
  try {
    const db = await connectToDb();
    const classId = ObjectId.createFromHexString(req.params.id);
    const updates = req.body;

    const result = await db
      .collection("classes")
      .updateOne({ _id: classId }, { $set: updates });

    if (result.matchedCount > 0) {
      res.status(200).json(updatedResponse());
    } else {
      res.status(404).json(failureResponse("Class not found"));
    }
  } catch (error) {
    res.status(500).json(failureResponse(error.message));
  }
}

// Delete class by ID
async function deleteClass(req, res) {
  try {
    const db = await connectToDb();
    const classId = ObjectId.createFromHexString(req.params.id);

    const result = await db.collection("classes").deleteOne({ _id: classId });

    if (result.deletedCount > 0) {
      res.status(200).json(deleteResponse());
    } else {
      res.status(404).json(failureResponse("Class not found"));
    }
  } catch (error) {
    res.status(500).json(failureResponse(error.message));
  }
}

module.exports = {
  getAllClasses,
  getClassById,
  addClass,
  updateClass,
  deleteClass,
};
