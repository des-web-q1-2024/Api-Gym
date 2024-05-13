import { db } from "../db/conn.js";

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

export {postEvento, getEvento, dltEvento, updEvento}