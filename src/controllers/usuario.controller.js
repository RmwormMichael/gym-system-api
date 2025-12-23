const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const generarJWT = require('../config/jwt');

// CREATE
exports.crearUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ msg: 'Correo ya registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const usuario = new Usuario({
      ...req.body,
      password: hash,
    });

    await usuario.save();

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo }).select('+password');
    if (!usuario) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const token = generarJWT(usuario);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// READ
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find().select('-password');
  res.json(usuarios);
};

// UPDATE
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;

  await Usuario.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ msg: 'Usuario actualizado' });
};

// DELETE (soft delete)
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  await Usuario.findByIdAndUpdate(id, { estado_id: 0 });
  res.json({ msg: 'Usuario desactivado' });
};
