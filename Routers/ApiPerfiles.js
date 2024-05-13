import Express, { request } from "express";

const Perfiles = Express();

import {getPerfil,postPerfil} from "../Controllers/PerfilesController.js";

Perfiles.get('',getPerfil)
Perfiles.post('',postPerfil)

export{ Perfiles }
