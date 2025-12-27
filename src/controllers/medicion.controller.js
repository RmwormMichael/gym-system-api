const Medicion = require("../models/Medicion");
const Usuario = require("../models/Usuario");

// CREATE
exports.crearMedicion = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    const usuario = await Usuario.findById(usuario_id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const medicion = new Medicion(req.body);
    await medicion.save();

    res.status(201).json({ msg: "Medición registrada", medicion });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// OBTENER TODAS LAS MEDICIONES (ADMIN)
exports.obtenerTodas = async (req, res) => {
  try {
    const mediciones = await Medicion.find()
      .populate("usuario_id", "nombre correo")
      .sort({ fecha: -1 });

    res.json(mediciones);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// OBTENER HISTORIAL POR USUARIO
exports.obtenerHistorialUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const { limite = 20 } = req.query;

    const mediciones = await Medicion.find({ usuario_id })
      .sort({ fecha: -1 })
      .limit(parseInt(limite));

    // Calcular progreso
    const progreso =
      mediciones.length > 1
        ? {
            primera: mediciones[mediciones.length - 1],
            ultima: mediciones[0],
            cambio_peso:
              mediciones[0].peso - mediciones[mediciones.length - 1].peso,
          }
        : null;

    res.json({
      total: mediciones.length,
      progreso,
      mediciones,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// OBTENER ÚLTIMA MEDICIÓN
exports.obtenerUltimaMedicion = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const medicion = await Medicion.findOne({ usuario_id }).sort({ fecha: -1 });

    res.json(medicion || { msg: "No hay mediciones registradas" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE
exports.actualizarMedicion = async (req, res) => {
  try {
    const medicion = await Medicion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!medicion) {
      return res.status(404).json({ msg: "Medición no encontrada" });
    }

    res.json({ msg: "Medición actualizada", medicion });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE
exports.eliminarMedicion = async (req, res) => {
  try {
    const medicion = await Medicion.findByIdAndDelete(req.params.id);

    if (!medicion) {
      return res.status(404).json({ msg: "Medición no encontrada" });
    }

    res.json({ msg: "Medición eliminada" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
