const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Por favor completa todos los campos" });
  }

  try {
    // Buscar usuario o email duplicado
    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) return res.status(400).json({ msg: "Usuario o email ya existe" });

    // Crear usuario 
    const user = new User({ username, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ message: "Usuario registrado", token });
  } catch (err) {
    console.error("Error al registrar usuario:", err);
    res.status(500).json({ msg: "Error de servidor", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Por favor completa todos los campos" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Credenciales inválidas" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Credenciales inválidas" });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ msg: "Error de servidor", error: err.message });
  }
};
