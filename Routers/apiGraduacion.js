import Express from "express";
import multer from "multer";

// const multer = require("multer");
// const upload = multer();

const Graduacion = Express();
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directorio de destino para los archivos subidos
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Nombre de archivo original
  },
});
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
Graduacion.post("", upload.single("foto"), postGraduacion);
Graduacion.put("/:id", putGraduacion);
Graduacion.delete("/:id", deleteGraduacion);

export { Graduacion };
