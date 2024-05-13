// Api de perfiles, creada para el curd de los perfiles, 


//Importa el módulo Express, que es un framework web para Node.js, junto con la función request de Express.
import Express, { request } from "express";

//Crea una instancia de la aplicación Express llamada Perfiles.
const Perfiles = Express();

//importa las funciones controladoras (getPerfil, postPerfil, putPerfil, deletePerfil) 
//desde un archivo separado (PerfilesController.js) que contiene la lógica para manejar las solicitudes HTTP relacionadas con los perfiles de usuario.
import { getPerfil,postPerfil,putPerfil,deletePerfil } from "../controllers/PerfilesController.js";

//Define las rutas y las funciones controladoras asociadas para manejar las solicitudes HTTP GET, POST, PUT y DELETE respectivamente.
Perfiles.get('',getPerfil) 
Perfiles.post('',postPerfil)
Perfiles.put('/:id',putPerfil)
Perfiles.delete('/:id',deletePerfil)

export{ Perfiles }
