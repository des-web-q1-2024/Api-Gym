import { db } from "../db/conn.js";

const postEvento = async (req, res) => {
    try {
       
        const {nombre, fecha} = req.body
        const {buffer, mimetype, originalname} = req.file

        const params = [buffer, mimetype, originalname, nombre, fecha]

        const sql = `INSERT INTO Evento
                     (foto, mime_type, nombre_archivo, nombre, fecha)
                     VALUES
                     ($1, $2, $3, $4, $5)
                     RETURNING 'Incersion Exitosa' mensaje`

       const result = await (db.query(sql, params))
       res.json(result)              


    } catch (e) {
        res.status(500).json(e.message)
    }
}

export {postEvento}