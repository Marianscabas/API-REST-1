const { Router } = require('express');
const {
  crearGenero,
  obtenerGeneros,
  obtenerGenero,
  actualizarGenero,
  eliminarGenero
} = require('../controllers/generoController');

const router = Router();

router.post('/', crearGenero);
router.get('/', obtenerGeneros);
router.get('/:id', obtenerGenero);
router.put('/:id', actualizarGenero);
router.delete('/:id', eliminarGenero);

module.exports = router;