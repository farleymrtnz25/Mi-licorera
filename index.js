const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRouter = require('./routes/usuarios');
const licoresRouter = require('./routes/licores');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/licores', licoresRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
