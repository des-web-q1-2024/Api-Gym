import Express, { request } from "express";
import multer from "multer";
const Muro = Express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  postLike,
  deleteLike,
  getLikeCount,
  postSaveEvento,
  deleteSaveEvento,
  getSaveEvento,
  postInsertPost,
  getPost,
} from "../controllers/MuroController.js";

Muro.post("", postLike);
Muro.delete("", deleteLike);
Muro.get("/:idPost", getLikeCount);

// evento
Muro.get("/saveEvent/:idUsuarios", getSaveEvento);
Muro.post("/saveEvent", postSaveEvento);
Muro.delete("/saveEvent", deleteSaveEvento);

Muro.get("/post/:idUsuarios",getPost);
Muro.post("/post", upload.single('foto'), postInsertPost);


export { Muro };
