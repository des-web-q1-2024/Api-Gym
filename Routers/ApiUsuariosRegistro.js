import express from 'express';
import { postNuevoUsuarios } from '../controllers/usuariosRegistroController.js';

const ApiUsuariosRegistro = express.Router();

ApiUsuariosRegistro.post('/', postNuevoUsuarios);

export { ApiUsuariosRegistro };





