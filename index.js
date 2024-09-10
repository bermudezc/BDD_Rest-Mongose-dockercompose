const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
console.log('mongo->',process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Definir esquema de Usuario
const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number, required: true }
});

// Crear el modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Rutas CRUD

// Crear un nuevo usuario (POST)
app.post('/usuarios', async (req, res) => {
  try {
    console.log('usuario:', req.body)
    const usuario = new Usuario(req.body);
    const resultado = await usuario.save();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el usuario', error });
  }
});

// Obtener todos los usuarios (GET)
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios', error });
  }
});

// Obtener un usuario por ID (GET)
app.get('/usuarios/:email', async (req, res) => {
  try {
    const usuario = await Usuario.findOne( {'email':req.params.email} );
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error });
  }
});

// Actualizar un usuario por ID (PUT)
app.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el usuario', error });
  }
});

// Eliminar un usuario por ID (DELETE)
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
