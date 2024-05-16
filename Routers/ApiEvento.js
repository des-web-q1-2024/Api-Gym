import express from "express";
import multer from "multer";
const Evento = express();
const storage = multer.memoryStorage();
const upload = multer({storage : storage});

import { postEvento, getEvento, dltEvento, updEvento, getEventByDate } from "../Controllers/EventosController.js";

Evento.use(express.json());
Evento.post('', upload.single('foto'), postEvento)
Evento.get('', getEvento)
Evento.delete('/:id', dltEvento)
Evento.put('/:id', updEvento)
Evento.get('/:fecha', getEventByDate)

export {Evento}