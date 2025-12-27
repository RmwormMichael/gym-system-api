const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const planCtrl = require('../controllers/plan.controller');

router.post('/', auth, planCtrl.crearPlan);
router.get('/', auth, planCtrl.obtenerPlanes);
router.get('/:id', auth, planCtrl.obtenerPlan);
router.put('/:id', auth, planCtrl.actualizarPlan);
router.delete('/:id', auth, planCtrl.eliminarPlan);

module.exports = router;