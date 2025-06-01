const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
};

exports.createNote = async (req, res) => {
  const { title, description, date } = req.body;
  const newNote = new Note({ user: req.user.id, title, description, date });
  await newNote.save();
  res.json(newNote);
};

exports.updateNote = async (req, res) => {
  const { title, description, date } = req.body;
  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { title, description, date },
    { new: true }
  );
  res.json(note);
};

exports.deleteNote = async (req, res) => {
  await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  res.json({ msg: "Nota eliminada" });
};
