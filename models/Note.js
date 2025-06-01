const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  date: Date,
});

module.exports = mongoose.model("Note", NoteSchema);
