const express = require('express');
const app = express();
require('dotenv').config();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

app.use(express.json());

const usuariosRoutes = require('./routes/usuarios');
const licoresRoutes = require('./routes/licores');

app.use('/usuarios', usuariosRoutes);
app.use('/licores', licoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
