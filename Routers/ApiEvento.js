import express from "express";
import multer from "multer";
const Evento = express();
const storage = multer.memoryStorage();
const upload = multer({storage : storage});

import { postEvento } from "../Controllers/EventosController.js";

Evento.use(express.json());
Evento.post('', upload.single('foto'), postEvento)

export {Evento}