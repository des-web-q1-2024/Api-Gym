import Express, { request } from "express";
const Muro = Express();

import { postLike,deleteLike,getLikeCount,postSaveEvento ,deleteSaveEvento, getSaveEvento } from '../controllers/MuroController.js'


Muro.post('',postLike)
Muro.delete('',deleteLike)
Muro.get('/:idPost',getLikeCount)

// evento
Muro.get('/saveEvent/:idUsuarios',getSaveEvento)
Muro.post('/saveEvent',postSaveEvento)
Muro.delete('/saveEvent',deleteSaveEvento)


export{ Muro }
