const Asistencia = require('../models/Asistencia');
const Usuario = require('../models/Usuario');

// REGISTRAR ENTRADA
exports.registrarEntrada = async (req, res) => {
  try {
    const { usuario_id, tipo = 'entrada' } = req.body;

    // Verificar usuario activo
    const usuario = await Usuario.findById(usuario_id);
    if (!usuario || usuario.estado_id !== 1) {
      return res.status(400).json({ msg: 'Usuario no activo' });
    }

    // Verificar si ya tiene una entrada sin salida
    const asistenciaAbierta = await Asistencia.findOne({
      usuario_id,
      fecha_hora_salida: { $exists: false },
    });

    if (asistenciaAbierta && tipo === 'entrada') {
      return res.status(400).json({ msg: 'Usuario ya tiene entrada registrada' });
    }

    const asistencia = new Asistencia({
      usuario_id,
      tipo,
      fecha_hora_entrada: Date.now(),
    });

    await asistencia.save();

    res.status(201).json({ msg: 'Entrada registrada', asistencia });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// OBTENER TODAS LAS ASISTENCIAS (ADMIN)
exports.obtenerTodas = async (req, res) => {
  try {
    const asistencias = await Asistencia.find()
      .populate('usuario_id', 'nombre cedula')
      .sort({ fecha_hora_entrada: -1 });

    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// REGISTRAR SALIDA
exports.registrarSalida = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    // Buscar última entrada sin salida
    const asistencia = await Asistencia.findOne({
      usuario_id,
      fecha_hora_salida: { $exists: false },
    }).sort({ fecha_hora_entrada: -1 });

    if (!asistencia) {
      return res.status(400).json({ msg: 'No hay entrada registrada' });
    }

    const ahora = Date.now();
    const duracion = Math.floor((ahora - asistencia.fecha_hora_entrada) / 60000); // minutos

    asistencia.fecha_hora_salida = ahora;
    asistencia.duracion_minutos = duracion;
    asistencia.tipo = 'salida';

    await asistencia.save();

    res.json({ msg: 'Salida registrada', asistencia });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// OBTENER ASISTENCIAS POR USUARIO
exports.obtenerAsistenciasPorUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const { fecha_inicio, fecha_fin, limite = 50 } = req.query;

    const filtro = { usuario_id };
    
    if (fecha_inicio || fecha_fin) {
      filtro.fecha_hora_entrada = {};
      if (fecha_inicio) filtro.fecha_hora_entrada.$gte = new Date(fecha_inicio);
      if (fecha_fin) filtro.fecha_hora_entrada.$lte = new Date(fecha_fin);
    }

    const asistencias = await Asistencia.find(filtro)
      .populate('usuario_id', 'nombre cedula')
      .sort({ fecha_hora_entrada: -1 })
      .limit(parseInt(limite));

    res.json(asistencias);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.obtenerActivos = async (req, res) => {
  try {
    const activos = await Asistencia.find({
      fecha_hora_salida: { $exists: false },
    }).populate('usuario_id', 'nombre cedula');

    res.json(activos);
  } catch (error) {
    res.status(500).json({ msg: 'Error obteniendo asistencias activas' });
  }
};

// REPORTE DIARIO
exports.reporteDiario = async (req, res) => {
  try {
    const { fecha } = req.query;
    const fechaFiltro = fecha ? new Date(fecha) : new Date();
    
    const inicioDia = new Date(fechaFiltro.setHours(0, 0, 0, 0));
    const finDia = new Date(fechaFiltro.setHours(23, 59, 59, 999));

    const asistencias = await Asistencia.find({
      fecha_hora_entrada: { $gte: inicioDia, $lte: finDia },
    })
      .populate('usuario_id', 'nombre cedula idPlan')
      .sort({ fecha_hora_entrada: 1 });

    const total = asistencias.filter(a => a.tipo === 'entrada').length;

    res.json({
      fecha: inicioDia.toISOString().split('T')[0],
      total_asistencias: total,
      asistencias,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};