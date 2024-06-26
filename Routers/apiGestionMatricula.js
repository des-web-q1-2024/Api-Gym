import Express from "express";
import multer from "multer";

const Matriculas = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  getMatricula,
  getMatriculaByArteMarcial,
  getMatriculaByArteMarcialAlumno,
  postMatricula,
  putMatricula,
  deleteMatricula,
} from "../controllers/GestionMatriculaController.js";

Matriculas.get("", getMatricula);
Matriculas.get("/:idartemarcial", getMatriculaByArteMarcial);
Matriculas.get("/:idartemarcial/:idusuarios", getMatriculaByArteMarcialAlumno);
Matriculas.post("", postMatricula);
Matriculas.put("/:id", putMatricula);
Matriculas.delete("/:id", deleteMatricula);

export { Matriculas };
