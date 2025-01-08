const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/authenticate");
const { createNote, getAllNotes } = require("../controllers/note");

router.post("/notes", authenticate, createNote);
router.get("/notes", authenticate, getAllNotes);
module.exports = router;
