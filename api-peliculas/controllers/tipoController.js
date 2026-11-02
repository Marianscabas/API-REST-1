const Tipo = require('../models/Tipo');

// Crear tipo
const crearTipo = async (req, res) => {
  try {
    const tipo = new Tipo(req.body);
    await tipo.save();
    res.status(201).json(tipo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Listar todos los tipos
const obtenerTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener un tipo por ID
const obtenerTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    res.json(tipo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Editar tipo
const actualizarTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(
      req.params.id,
      { ...req.body, fechaActualizacion: Date.now() },
      { new: true, runValidators: true }
    );
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    res.json(tipo);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

// Eliminar tipo
const eliminarTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) return res.status(404).json({ mensaje: 'Tipo no encontrado' });
    res.json({ mensaje: 'Tipo eliminado' });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearTipo,
  obtenerTipos,
  obtenerTipo,
  actualizarTipo,
  eliminarTipo
};