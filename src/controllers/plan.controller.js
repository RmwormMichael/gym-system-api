const Plan = require('../models/Plan');

// CREATE
exports.crearPlan = async (req, res) => {
  try {
    const { nombre_plan } = req.body;

    const existe = await Plan.findOne({ nombre_plan });
    if (existe) {
      return res.status(400).json({ msg: 'Plan ya existe' });
    }

    const plan = new Plan(req.body);
    await plan.save();

    res.status(201).json({ msg: 'Plan creado', plan });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// READ ALL
exports.obtenerPlanes = async (req, res) => {
  try {
    const { estado } = req.query;
    const filtro = estado ? { estado: estado === 'true' } : {};

    const planes = await Plan.find(filtro).sort({ precio: 1 });
    res.json(planes);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// READ ONE
exports.obtenerPlan = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ msg: 'Plan no encontrado' });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE
exports.actualizarPlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!plan) {
      return res.status(404).json({ msg: 'Plan no encontrado' });
    }

    res.json({ msg: 'Plan actualizado', plan });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE (soft)
exports.eliminarPlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { estado: false },
      { new: true }
    );

    if (!plan) {
      return res.status(404).json({ msg: 'Plan no encontrado' });
    }

    res.json({ msg: 'Plan desactivado' });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};