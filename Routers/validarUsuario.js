import express from "express";
import { GetUsuario } from "../controllers/ValidarUsuarioController.js";

const validarUsuario = express.Router();

validarUsuario.get('/:Usuario/:Contrasena', GetUsuario);

export { validarUsuario }; 

