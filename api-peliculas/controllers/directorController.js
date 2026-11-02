const Director = require('../models/Director');

// Crear director
const crearDirector = async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Listar todos los directores
const obtenerDirectores = async (req, res) => {
  try {
    const directores = await Director.find();
    res.json(directores);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener un director por ID
const obtenerDirector = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    res.json(director);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Editar director
const actualizarDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    res.json(director);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar director
const eliminarDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) return res.status(404).json({ mensaje: 'Director no encontrado' });
    res.json({ mensaje: 'Director eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearDirector,
  obtenerDirectores,
  obtenerDirector,
  actualizarDirector,
  eliminarDirector
};