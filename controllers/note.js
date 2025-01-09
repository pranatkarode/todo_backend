const Note = require("../models/note");
const { successResponse, failureResponse } = require("../utils/response");

async function createNote(req, res) {
  //   const { userName, email, password, firstName, lastName } = req.body;
  try {
    const note = new Note({ ...req.body });
    await note.save();
    res.status(201).json(successResponse("Note created successfully"));
  } catch (error) {
    console.log("error", error, error.cause, error.message);
    if (error.name === "ValidationError") {
      const errArray = error.message
        .split(": ")
        .splice(1)
        .join(":")
        .split(", ");
      const errObj = errArray.reduce((acc, curr) => {
        const key = curr.split(":")[0];
        const value = curr.split(":")[1];
        return { ...acc, [key]: value };
      }, {});
      return res.status(400).json({
        ok: false,
        msg: error.message.split(":")[0],
        errors: errObj,
      });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json(failureResponse(`${field} alreaddy exists`));
    }
    res.status(403).json({
      ok: false,
      err: error.message,
    });
  }
}

async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    if (!notes || notes.length == 0) {
      return res.status(404).json({
        ok: false,
        msg: "No notes found!",
      });
    }
    return res.status(200).json(successResponse(notes));
  } catch (error) {
    return res.status(500).json(failureResponse(error.message));
  }
}

async function getAllNotesById(req, res) {
  try {
    const id = req.params.id;
    const notes = await Note.findById(id);
    if (!notes) {
      return res.status(404).json({
        ok: false,
        msg: "Note not found",
      });
    }
    return res.status(200).json(successResponse(note));
  } catch (error) {
    return res.status(500).json(failureResponse(error.message));
  }
}

async function updateNote(req, res) {
  try {
    const id = req.params.id;
    const notes = await Note.findByIdAndUpdate(id, req.body, { new: true });
    if (!notes) {
      return res.status(404).json({
        ok: false,
        msg: "Note not found",
      });
    }
    return res.status(200).json(successResponse(note));
  } catch (error) {
    return res.status(500).json(failureResponse(error.message));
  }
}

async function DeleteNote(req, res) {
  try {
    const id = req.params.id;
    const notes = await Note.findByIdAndDelete(id);
    if (!notes) {
      return res.status(404).json({
        ok: false,
        msg: "Note not found",
      });
    }
    return res.status(200).json(successResponse(note));
  } catch (error) {
    return res.status(500).json(failureResponse(error.message));
  }
}

module.exports = {
  createNote,
  getAllNotes,
  getAllNotesById,
  updateNote,
  DeleteNote,
};
