const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();
const licoresRef = db.collection('licores');

// Obtener todos los licores
router.get('/', async (req, res) => {
  try {
    const snapshot = await licoresRef.get();
    const licores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(licores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los licores.' });
  }
});

// Crear un nuevo licor
router.post('/', async (req, res) => {
  try {
    const nuevoLicor = req.body;
    const docRef = await licoresRef.add(nuevoLicor);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el licor.' });
  }
});

// Actualizar un licor
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await licoresRef.doc(id).update(req.body);
    res.json({ mensaje: 'Licor actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el licor.' });
  }
});

// Eliminar un licor
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await licoresRef.doc(id).delete();
    res.json({ mensaje: 'Licor eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el licor.' });
  }
});

module.exports = router;
