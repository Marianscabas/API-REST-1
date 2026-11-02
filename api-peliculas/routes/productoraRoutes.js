const { Router } = require('express');
const {
  crearProductora,
  obtenerProductoras,
  obtenerProductora,
  actualizarProductora,
  eliminarProductora
} = require('../controllers/productoraController');

const router = Router();

router.post('/', crearProductora);
router.get('/', obtenerProductoras);
router.get('/:id', obtenerProductora);
router.put('/:id', actualizarProductora);
router.delete('/:id', eliminarProductora);

module.exports = router;