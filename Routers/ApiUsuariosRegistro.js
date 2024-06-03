import express from 'express';
import multer from 'multer'; // Importa Multer
import { postNuevoUsuarios } from '../controllers/usuariosRegistroController.js';

const ApiUsuariosRegistro = express.Router();

// Configura Multer directamente en la ruta
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio de destino para los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre de archivo original
  },
});

const upload = multer({ storage: storage });

// Utiliza Multer en la ruta
ApiUsuariosRegistro.post('/', upload.single('fotoPerfil'), postNuevoUsuarios);

export { ApiUsuariosRegistro };







