const Productora = require('../models/Productora');

// Crear productora
const crearProductora = async (req, res) => {
  try {
    const productora = new Productora(req.body);
    await productora.save();
    res.status(201).json(productora);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Listar todas las productoras
const obtenerProductoras = async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener una productora por ID
const obtenerProductora = async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    res.json(productora);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Editar productora
const actualizarProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    res.json(productora);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar productora
const eliminarProductora = async (req, res) => {
  try {
    const productora = await Productora.findByIdAndDelete(req.params.id);
    if (!productora) return res.status(404).json({ mensaje: 'Productora no encontrada' });
    res.json({ mensaje: 'Productora eliminada' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearProductora,
  obtenerProductoras,
  obtenerProductora,
  actualizarProductora,
  eliminarProductora
};