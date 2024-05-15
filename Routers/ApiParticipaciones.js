import express from "express";
const Participaciones = express();


import { getEvento, getEventos, postParticipacion } from "../controllers/ParticipacionesController.js";


Participaciones.use(express.json());
Participaciones.post('/', postParticipacion);
Participaciones.get('/eventos', getEventos);
Participaciones.get('/eventos/:id', getEvento);

export { Participaciones };
