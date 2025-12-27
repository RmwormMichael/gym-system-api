const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const contactoCtrl = require('../controllers/contacto.controller');
const contactoMiddleware = require('../middlewares/contacto.middleware');

router.post('/', auth, contactoCtrl.crearContacto);

router.get(
  '/usuario/:usuario_id',
  auth,
  contactoMiddleware.soloPropioOAdmin,
  contactoCtrl.obtenerContactosPorUsuario
);

router.get(
  '/',
  auth,
  (req, res, next) => {
    if (!['ADMIN', 'ENTRENADOR'].includes(req.userRol)) {
      return res.status(403).json({ msg: 'No autorizado' });
    }
    next();
  },
  contactoCtrl.obtenerTodos
);


router.put('/:id', auth, contactoCtrl.actualizarContacto);
router.delete('/:id', auth, contactoCtrl.eliminarContacto);

module.exports = router;
