const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const usuariosRef = db.collection('usuarios');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const snapshot = await usuariosRef.get();
    const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = req.body;
    const docRef = await usuariosRef.add(nuevoUsuario);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await usuariosRef.doc(id).update(req.body);
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await usuariosRef.doc(id).delete();
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
});

module.exports = router;
