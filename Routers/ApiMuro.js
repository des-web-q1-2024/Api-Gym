import Express, { request } from "express";
const Muro = Express();

import { postLike,deleteLike,getLikeCount  } from '../controllers/MuroController.js'


Muro.post('',postLike)
Muro.delete('',deleteLike)
Muro.get('/:idPost',getLikeCount)

export{ Muro }
