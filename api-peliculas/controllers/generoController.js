const Genero = require('../models/Genero');

// Crear género
const crearGenero = async (req, res) => {
  try {
    const genero = new Genero(req.body);
    await genero.save();
    res.status(201).json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Listar todos los géneros
const obtenerGeneros = async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener un género por ID
const obtenerGenero = async (req, res) => {
  try {
    const genero = await Genero.findById(req.params.id);
    if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });
    res.json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Editar género
const actualizarGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });
    res.json(genero);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar género
const eliminarGenero = async (req, res) => {
  try {
    const genero = await Genero.findByIdAndDelete(req.params.id);
    if (!genero) return res.status(404).json({ mensaje: 'Género no encontrado' });
    res.json({ mensaje: 'Género eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearGenero,
  obtenerGeneros,
  obtenerGenero,
  actualizarGenero,
  eliminarGenero
};