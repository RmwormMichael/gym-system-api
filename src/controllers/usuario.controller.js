const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const generarJWT = require("../config/jwt");
const Rol = require("../models/Rol");

// CREATE
exports.crearUsuario = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ msg: "Correo ya registrado" });
    }

    // 🔹 Buscar rol CLIENTE activo
    const rolCliente = await Rol.findOne({ nombre: "CLIENTE", estado: true });
    if (!rolCliente) {
      return res.status(500).json({ msg: "Rol CLIENTE no configurado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const usuario = new Usuario({
      ...req.body,
      rol_id: rolCliente._id, // 👈 ASIGNACIÓN AUTOMÁTICA
      password: hash,
    });

    await usuario.save();

    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo })
      .select("+password")
      .populate("rol_id");

    if (!usuario) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    if (!usuario.rol_id || !usuario.rol_id.estado) {
      return res.status(403).json({ msg: "Rol no autorizado" });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(400).json({ msg: "Credenciales inválidas" });
    }

    const token = generarJWT(usuario, usuario.rol_id.nombre);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// READ
exports.obtenerUsuarios = async (req, res) => {
  const usuarios = await Usuario.find().select("-password");
  res.json(usuarios);
};

// UPDATE
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;

  await Usuario.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ msg: "Usuario actualizado" });
};

// DELETE (soft delete)
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  await Usuario.findByIdAndUpdate(id, { estado_id: 0 });
  res.json({ msg: "Usuario desactivado" });
};
