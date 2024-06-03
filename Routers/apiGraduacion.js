import Express from "express";
import multer from "multer";

const Graduacion = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  getGraduacion,
  getGraduacionByMatricula,
  getGraduacionByMatriculaAlumno,
  postGraduacion,
  putGraduacion,
  deleteGraduacion,
} from "../controllers/GraduacionController.js";

Graduacion.get("", getGraduacion);
Graduacion.get("/:idmatricula", getGraduacionByMatricula);
Graduacion.get("/:idmatricula/:idalumno", getGraduacionByMatriculaAlumno);
Graduacion.post("", postGraduacion);
Graduacion.put("/:id", putGraduacion);
Graduacion.delete("/:id", deleteGraduacion);

export { Graduacion };
