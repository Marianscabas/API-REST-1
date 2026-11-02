const { Router } = require('express');
const {
  crearMedia,
  obtenerMedias,
  obtenerMedia,
  actualizarMedia,
  eliminarMedia
} = require('../controllers/mediaController');

const router = Router();

router.post('/', crearMedia);
router.get('/', obtenerMedias);
router.get('/:id', obtenerMedia);
router.put('/:id', actualizarMedia);
router.delete('/:id', eliminarMedia);

module.exports = router;