const Media = require('../models/Media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

// Valida que género, director y productora estén activos y que el tipo exista
const validarRelaciones = async ({ genero, director, productora, tipo }) => {
  if (genero) {
    const g = await Genero.findOne({ _id: genero, estado: 'Activo' });
    if (!g) return 'El género no existe o está inactivo';
  }
  if (director) {
    const d = await Director.findOne({ _id: director, estado: 'Activo' });
    if (!d) return 'El director no existe o está inactivo';
  }
  if (productora) {
    const p = await Productora.findOne({ _id: productora, estado: 'Activo' });
    if (!p) return 'La productora no existe o está inactiva';
  }
  if (tipo) {
    const t = await Tipo.findById(tipo);
    if (!t) return 'El tipo no existe';
  }
  return null;
};

// Crear media
const crearMedia = async (req, res) => {
  try {
    const error = await validarRelaciones(req.body);
    if (error) return res.status(400).json({ mensaje: error });

    const media = new Media(req.body);
    await media.save();
    res.status(201).json(media);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Listar todas las producciones
const obtenerMedias = async (req, res) => {
  try {
    const medias = await Media.find()
      .populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');
    res.json(medias);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener una producción por ID
const obtenerMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
      .populate('genero', 'nombre')
      .populate('director', 'nombres')
      .populate('productora', 'nombre')
      .populate('tipo', 'nombre');
    if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });
    res.json(media);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Editar media
const actualizarMedia = async (req, res) => {
  try {
    const error = await validarRelaciones(req.body);
    if (error) return res.status(400).json({ mensaje: error });

    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });
    res.json(media);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar media
const eliminarMedia = async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ mensaje: 'Media no encontrada' });
    res.json({ mensaje: 'Media eliminada' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearMedia,
  obtenerMedias,
  obtenerMedia,
  actualizarMedia,
  eliminarMedia
};