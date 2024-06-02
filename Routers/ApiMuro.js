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
  getLikeCountPost,
  postLikeEvento,
  deleteLikeEvento,
  postInsertHiloPost,
  getHiloPost,
} from "../controllers/MuroController.js";

// like evento
Muro.get("/:idPost", getLikeCount);
Muro.post("", postLike);
Muro.delete("", deleteLike);


// like post
Muro.get("/post/comentario/:idPost", getLikeCountPost);
Muro.get("/post/Hilocomentario/:idPost", getHiloPost);
Muro.post("/post/comentario", postLikeEvento);
Muro.delete("/post/comentario", deleteLikeEvento);



// evento
Muro.get("/saveEvent/:idUsuarios", getSaveEvento);
Muro.post("/saveEvent", postSaveEvento);
Muro.delete("/saveEvent", deleteSaveEvento);

Muro.get("/post/:idUsuarios",getPost);
Muro.post("/post", upload.single('foto'), postInsertPost);
Muro.post("/post/hilo", upload.single('foto'), postInsertHiloPost);

export { Muro };
