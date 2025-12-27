const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const usuarioCtrl = require('../controllers/usuario.controller');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', usuarioCtrl.crearUsuario);
router.post('/login', usuarioCtrl.login);

router.get('/', auth, usuarioCtrl.obtenerUsuarios);

//SOLO ADMIN
router.put('/:id', auth, roleMiddleware('ADMIN'), usuarioCtrl.actualizarUsuario);
router.delete('/:id', auth, roleMiddleware('ADMIN'), usuarioCtrl.eliminarUsuario);


module.exports = router;
