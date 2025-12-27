const ContactoFamiliar = require("../models/ContactoFamiliar");
const Usuario = require("../models/Usuario");

// CREATE
exports.crearContacto = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    if (!req.body.parentesco) {
      req.body.parentesco = "Otro";
    }

    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const contacto = new ContactoFamiliar(req.body);
    await contacto.save();

    res.status(201).json({ msg: "Contacto creado", contacto });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// READ por usuario
exports.obtenerContactosPorUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const contactos = await ContactoFamiliar.find({ usuario_id }).sort({
      parentesco: 1,
    });

    res.json(contactos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE
exports.actualizarContacto = async (req, res) => {
  try {
    const contacto = await ContactoFamiliar.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!contacto) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }

    res.json({ msg: "Contacto actualizado", contacto });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE
exports.eliminarContacto = async (req, res) => {
  try {
    const contacto = await ContactoFamiliar.findByIdAndDelete(req.params.id);

    if (!contacto) {
      return res.status(404).json({ msg: "Contacto no encontrado" });
    }

    res.json({ msg: "Contacto eliminado" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// READ ALL (ADMIN / ENTRENADOR)
exports.obtenerTodos = async (req, res) => {
  try {
    const contactos = await ContactoFamiliar.find()
      .populate('usuario_id', 'nombre cedula')
      .sort({ createdAt: -1 });

    res.json(contactos);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
