import Express from "express";
const Landing = Express();

import { getData, postContacto, postLanding, updLanding, getContacto, updContacto } from "../controllers/LandingController.js";

/*Se recupera la informacion de la base de datos donde esta conectada la landing */
Landing.get('', getData);
Landing.get('/contactos', getContacto)

/*Agregar informacion a la landing*/
Landing.post('/contacto', postContacto);
Landing.post('/landing', postLanding);

/*Actualizar partes de la landing */
Landing.put('', updLanding);
Landing.put("/:id", updContacto)

export { Landing } 