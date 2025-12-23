const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const usuarioCtrl = require('../controllers/usuario.controller');

router.post('/', usuarioCtrl.crearUsuario);
router.post('/login', usuarioCtrl.login);

router.get('/', auth, usuarioCtrl.obtenerUsuarios);
router.put('/:id', auth, usuarioCtrl.actualizarUsuario);
router.delete('/:id', auth, usuarioCtrl.eliminarUsuario);

module.exports = router;
