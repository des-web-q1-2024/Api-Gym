import express from "express";
const Participaciones = express();


import { getParticipacion, getEventoID, getEventos, postParticipacion } from "../controllers/ParticipacionesController.js";


Participaciones.use(express.json());
Participaciones.get('/', getParticipacion);
Participaciones.post('/', postParticipacion);
Participaciones.get('', getEventos);
Participaciones.get('/:id', getEventoID);

export { Participaciones };
