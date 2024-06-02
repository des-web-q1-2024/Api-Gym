import Express from "express";
import multer from "multer";

const Cintas = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  getCinta,
  postCinta,
  putCinta,
  deleteCinta,
} from "../controllers/GestionCintasController.js";

Cintas.get("", getCinta);
Cintas.post("", postCinta);
Cintas.put("/:id", putCinta);
Cintas.delete("/:id", deleteCinta);

export { Cintas };
