import Express, { request } from "express";
import multer from "multer";

const Usuarios = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { postNuevoUsuario } from "../controllers/UsuariosController.js"


Usuarios.post('', upload.single('imagen'), postNuevoUsuario);

export { Usuarios }