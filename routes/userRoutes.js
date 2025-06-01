const express = require('express');
const router = express.Router();
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Registro de usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

    const user = new User({ username, password });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ message: 'Usuario registrado', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', err });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(user._id);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en el servidor', err });
  }
});

module.exports = router;
