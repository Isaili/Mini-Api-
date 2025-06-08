const Note = require("../models/Note");
const formatDate = require("../utils/formatDate")

exports.getNotes = async (req, res) => {
   try {
    const notes = await Note.find({ user: req.params.id });
    const formattedNotes = notes.map(note => ({
      id: note._id.toString(),
      title: note.title,
      description: note.description,
      date: formatDate(note.date)
    }));

    res.json(formattedNotes);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error al obtener las notas", error });
  }
};

exports.createNote = async (req, res) => {
  const { title, description, user_id } = req.body;
  const newNote = new Note({ user: user_id, title, description });
  const note = await newNote.save();

  const responseNote = {
    id: note._id.toString(),
    title: note.title,
    description: note.description,
    date: formatDate(note.date)
  };

  res.json(responseNote);
};


exports.updateNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title, description },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    res.json({
      id: note._id.toString(),
      title: note.title,
      description: note.description,
      date: formatDate(note.date),
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la nota", error });
  }
};


exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id });
    if (!note) {
      return res.status(404).json({ msg: "Nota no encontrada" });
    }
    res.json({ msg: "Nota eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar la nota", error });
  }
};

