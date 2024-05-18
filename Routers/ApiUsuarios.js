import Express from "express";
import multer from "multer";

const Usuarios = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { getUsuarios, postNuevoUsuarios, putUsuarios, deleteUsuarios } from "../controllers/UsuariosController.js"

Usuarios.get('', getUsuarios);
Usuarios.post('', upload.single('fotoPerfil'), postNuevoUsuarios);
Usuarios.put('/:id', upload.single('fotoPerfil'), putUsuarios);
Usuarios.delete('/:id', deleteUsuarios);

export { Usuarios }
