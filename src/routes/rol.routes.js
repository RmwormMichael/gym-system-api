const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');
const rolCtrl = require('../controllers/rol.controller');

router.post('/', auth, roleMiddleware('ADMIN'), rolCtrl.crearRol);
router.get('/', auth, roleMiddleware('ADMIN'), rolCtrl.obtenerRoles);
router.put('/:id', auth, roleMiddleware('ADMIN'), rolCtrl.actualizarRol);
router.delete('/:id', auth, roleMiddleware('ADMIN'), rolCtrl.eliminarRol);

module.exports = router;
