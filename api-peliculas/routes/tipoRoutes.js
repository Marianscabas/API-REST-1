const { Router } = require('express');
const {
  crearTipo,
  obtenerTipos,
  obtenerTipo,
  actualizarTipo,
  eliminarTipo
} = require('../controllers/tipoController');

const router = Router();

router.post('/', crearTipo);
router.get('/', obtenerTipos);
router.get('/:id', obtenerTipo);
router.put('/:id', actualizarTipo);
router.delete('/:id', eliminarTipo);

module.exports = router;