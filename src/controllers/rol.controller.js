const Rol = require('../models/Rol');

// CREATE
exports.crearRol = async (req, res) => {
  try {
    const rol = new Rol(req.body);
    await rol.save();
    res.status(201).json(rol);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// READ
exports.obtenerRoles = async (req, res) => {
  const roles = await Rol.find({ estado: true });
  res.json(roles);
};

// UPDATE
exports.actualizarRol = async (req, res) => {
  const rol = await Rol.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(rol);
};

// DELETE (soft)
exports.eliminarRol = async (req, res) => {
  await Rol.findByIdAndUpdate(req.params.id, { estado: false });
  res.json({ msg: 'Rol desactivado' });
};
