const { Router } = require('express');
const {
  crearDirector,
  obtenerDirectores,
  obtenerDirector,
  actualizarDirector,
  eliminarDirector
} = require('../controllers/directorController');

const router = Router();

router.post('/', crearDirector);
router.get('/', obtenerDirectores);
router.get('/:id', obtenerDirector);
router.put('/:id', actualizarDirector);
router.delete('/:id', eliminarDirector);

module.exports = router;