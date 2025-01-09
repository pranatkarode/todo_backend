const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const {
  createNote,
  getAllNotes,
  getAllNotesById,
  updateNote,
  DeleteNote,
} = require("../controllers/note");

router.post("/notes", authenticate, createNote);
router.get("/notes", authenticate, getAllNotes);
router.get("/notes/:id", authenticate, getAllNotesById);
router.put("/notes/:id", authenticate, updateNote);
router.delete("/notes/:id", authenticate, DeleteNote);
module.exports = router;
