import express from 'express';
import cors from 'cors';
import rutas from './routes/usuariosrutas.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(rutas);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));