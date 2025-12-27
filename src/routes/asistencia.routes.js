const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const asistenciaCtrl = require('../controllers/asistencia.controller');
const asistenciaMiddleware = require('../middlewares/asistencia.middleware');


router.get('/reporte/diario', auth, asistenciaCtrl.reporteDiario);

router.post(
  '/entrada',
  auth,
  asistenciaMiddleware.soloAdminOEntrenador,
  asistenciaCtrl.registrarEntrada
);

router.post(
  '/salida',
  auth,
  asistenciaMiddleware.soloAdminOEntrenador,
  asistenciaCtrl.registrarSalida
);

router.get(
  '/usuario/:usuario_id',
  auth,
  asistenciaMiddleware.verPropiasOAdmin,
  asistenciaCtrl.obtenerAsistenciasPorUsuario
);

// 👉 ADMIN - obtener todas las asistencias
router.get(
  '/',
  auth,
  asistenciaCtrl.obtenerTodas
);

router.get(
  '/activos',
  auth,
  asistenciaMiddleware.soloAdminOEntrenador,
  asistenciaCtrl.obtenerActivos
);



module.exports = router;