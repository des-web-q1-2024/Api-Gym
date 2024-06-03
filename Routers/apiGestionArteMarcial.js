import Express from "express";
import multer from "multer";

const ArteMarcial = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  getArteMarcial,
  postArteMarcial,
  putArteMarcial,
  deleteArteMarcial,
} from "../controllers/GestionArteMarcialController.js";

ArteMarcial.get("", getArteMarcial);
ArteMarcial.post("", postArteMarcial);
ArteMarcial.put("/:id", putArteMarcial);
ArteMarcial.delete("/:id", deleteArteMarcial);

export { ArteMarcial };
