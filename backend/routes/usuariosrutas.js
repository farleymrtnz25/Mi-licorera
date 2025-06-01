import express from 'express';
import {
  crearUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario
} from '../modelo/usuariosmodelo.js';

import {
  crearLicor,
  obtenerLicores,
  actualizarLicor,
  eliminarLicor
} from '../modelo/licoresmodelo.js';

const router = express.Router();

router.post('/usuarios', async (req, res) => {
  const usuario = await crearUsuario(req.body);
  res.json(usuario);
});

router.get('/usuarios', async (req, res) => {
  const usuarios = await obtenerUsuarios();
  res.json(usuarios);
});

router.put('/usuarios/:id', async (req, res) => {
  const usuario = await actualizarUsuario(req.params.id, req.body);
  res.json(usuario);
});

router.delete('/usuarios/:id', async (req, res) => {
  const usuario = await eliminarUsuario(req.params.id);
  res.json(usuario);
});

router.post('/licores', async (req, res) => {
  const licor = await crearLicor(req.body);
  res.json(licor);
});

router.get('/licores', async (req, res) => {
  const licores = await obtenerLicores();
  res.json(licores);
});

router.put('/licores/:id', async (req, res) => {
  const licor = await actualizarLicor(req.params.id, req.body);
  res.json(licor);
});

router.delete('/licores/:id', async (req, res) => {
  const licor = await eliminarLicor(req.params.id);
  res.json(licor);
});

export default router;
