const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const medicionCtrl = require('../controllers/medicion.controller');
const medicionMiddleware = require('../middlewares/medicion.middleware');


// Crear (cliente o entrenador)
router.post('/', auth, medicionMiddleware.crear, medicionCtrl.crearMedicion);

// Historial (cliente solo el suyo)
router.get(
  '/usuario/:usuario_id',
  auth,
  medicionMiddleware.verPropiasOAdmin,
  medicionCtrl.obtenerHistorialUsuario
);

router.get(
  '/usuario/:usuario_id/ultima',
  auth,
  medicionMiddleware.verPropiasOAdmin,
  medicionCtrl.obtenerUltimaMedicion
);

// Actualizar (cliente solo el suyo)
router.put(
  '/:id',
  auth,
  medicionMiddleware.verPropiasOAdmin,
  medicionCtrl.actualizarMedicion
);

// Todas (solo admin/entrenador)
router.get(
  '/',
  auth,
  (req, res, next) => {
    if (!['ADMIN', 'ENTRENADOR'].includes(req.userRol)) {
      return res.status(403).json({ msg: 'Solo admin o entrenador' });
    }
    next();
  },
  medicionCtrl.obtenerTodas
);

module.exports = router;
