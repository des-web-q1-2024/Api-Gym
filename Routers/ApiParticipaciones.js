import express from "express";
const Participaciones = express();

import {
  getParticipacion,
  getEventos,
  postParticipacion,
  putParticipacion,
  getParticipacionByEventoAlumno,
  getParticipacionAlumnosPorEvento,
  getParticipacionByEventoAlumnoExistis,
} from "../controllers/ParticipacionesController.js";

Participaciones.use(express.json());
Participaciones.get("/", getParticipacion);
Participaciones.get("/:idevento/:idusuarios", getParticipacionByEventoAlumno);
Participaciones.get("/:idevento", getParticipacionAlumnosPorEvento);
Participaciones.post("/", postParticipacion);
Participaciones.put("/:id", putParticipacion);
Participaciones.get("", getEventos);
Participaciones.get(
  "/existe/:idevento/:idusuarios",
  getParticipacionByEventoAlumnoExistis
);

export { Participaciones };
