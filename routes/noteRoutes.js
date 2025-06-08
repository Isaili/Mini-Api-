const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getNotes, createNote, updateNote, deleteNote } = require("../controller/noteController");

router.get("/:id", auth, getNotes);
router.post("/", auth, createNote);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

module.exports = router;
