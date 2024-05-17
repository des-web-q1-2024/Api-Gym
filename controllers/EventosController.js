import { db } from "../db/conn.js";

/*Controlador para poder agregar eventos con su respectiva foto  */
const postEvento = async (req, res) => {
    try {
       
        const {nombre, fecha, descripcion} = req.body
        const {buffer, mimetype, originalname} = req.file

        const params = [buffer, mimetype, originalname, nombre, fecha, descripcion]

        const sql = `INSERT INTO Evento
                     (foto, mime_type, nombre_archivo, nombre, fecha, descripcion)
                     VALUES
                     ($1, $2, $3, $4, $5, $6)
                     RETURNING 'Incersion Exitosa' mensaje`

       const result = await (db.query(sql, params))
       res.json(result)              


    } catch (e) {
        res.status(500).json(e.message)
    }
}

/*Controlador para poder obtener todos los eventos de la base de datos */

const getEvento = async (req, res) => {
    try {
        const sql = `SELECT id, nombre, fecha, descripcion, encode(foto, 'base64') foto, mime_type
        FROM Evento WHERE activo = true`

        const result = await (db.query(sql))
        
        res.json(result)
    } catch (e) {
        res.status(500).json(e.message)
    }
}

/*Controlador para poder eliminar algun evento de la lista, (cabe aclarar que solo se actualiza el estado booleano
    en 'false' para asi mantener sus datos en la base de datos y en todo caso poder ser reutilizado
) */

const dltEvento = async (req, res) => {
    try {
        const params = [req.params.id]

        const sql = `UPDATE Evento
                    SET activo = false
                    WHERE id = $1
                    RETURNING 'Evento Borrado con Exito' mensaje`
        
        const result = await (db.query(sql, params))
        res.json(result)  

    } catch (e) {
       res.status(500).json(e.message) 
    }
}

/*Controlador para actualizar un evento con el ID como parametro */

const updEvento = async (req,res) => {

    try {
        const {nombre, descripcion, fecha} = req.body
        const {id} = req.params
    
        const params = [nombre, descripcion, fecha, id]
    
        const sql = `UPDATE Evento
                     SET nombre = $1,
                     descripcion = $2,
                     fecha = $3
                     WHERE id = $4
                     RETURNING 'Evento actualizado' mensaje`
    
        const result = await (db.query(sql, params))
        res.json(result)    
    } catch (e) {
        res.status(500).json(e.message)
    }
            
}

/*
Controlador para obtener informacion sobre algun evento en especifico de acuerdo a su fecha */

const getEventByDate = async (req, res) => {

try {
    const params = [req.params.fecha]

  const sql = `SELECT nombre, descripcion, fecha, encode(foto, 'base64') foto, mime_type
               FROM Evento 
               WHERE fecha = $1`

  const result = await (db.query(sql, params))

  res.json(result) 
} catch (e) {
   res.status(500).json({Error: e.message}) 
}

 

}

export {postEvento, getEvento, dltEvento, updEvento, getEventByDate}