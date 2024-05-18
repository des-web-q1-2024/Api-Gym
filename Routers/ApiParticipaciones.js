import express from "express";
const Participaciones = express();


import { getEventoID, getEventos, postParticipacion } from "../controllers/ParticipacionesController.js";


Participaciones.use(express.json());
Participaciones.post('/', postParticipacion);
Participaciones.get('', getEventos);
Participaciones.get('/:id', getEventoID);

export { Participaciones };
