import { db } from "../db/conn.js";

const getData = async (req, res) => {
    try {
        const sql = `SELECT * FROM landing WHERE id = 1`
        const result = await db.query(sql);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
    }
}

const getContacto = async (req, res) => {
    try {
        const sql = `SELECT * FROM contactosLanding`
        const result = await db.query(sql);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: "No data found." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
    }
}


const postContacto = async (req, res) => {
    try {
        const { nombre, telefono } = req.body;

        const params = [nombre, telefono];
        const sql = `INSERT INTO contactosLanding (nombre, telefono) VALUES ($1, $2) RETURNING 'Insercion Exitosa' AS mensaje`;
        const result = await db.query(sql, params);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al procesar la solicitud." }); 
    }
}

const postLanding = async (req, res) => {
    try {
        const { nosotros, mision, vision } = req.body;
        const params = [nosotros, mision, vision];

        const sql = `INSERT INTO landing (nosotros, mision, vision)
                     VALUES ($1, $2, $3)
                     RETURNING 'Insercion Exitosa' AS mensaje`;

        const result = await db.query(sql, params);

        if (result.rows > 0) {
            res.status(201).json(result.rows[0]); 
        } else {
            res.status(500).json({ error: "Inserción fallida en landing." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un error al procesar la solicitud." });
        console.error(error);
    }
}

const updLanding = async (req, res) => {
    try {
        
        const {nosotros, mision, vision} = req.body;
        const params = [nosotros, mision, vision];

        const sql = `UPDATE landing
                     SET nosotros = $1,
                     mision = $2,
                     vision = $3
                     WHERE id = 1
                     RETURNING 'Actualización Exitosa' AS mensaje`

        const result = await db.query(sql, params);
        res.status(200).json(result);

    } catch (error) {
       res.status(500).json(error.message) 
    }
}

const updContacto = async (req, res) => {
    try {

       const id = req.params.id
       const {nombre, telefono} = req.body;
       const params = [nombre, telefono, id];

       const sql = `UPDATE contactosLanding
                    SET nombre = $1,
                    telefono = $2
                    WHERE id = $3`
       
      const result = await db.query(sql, params);
      res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export { getData,getContacto, postContacto, postLanding, updLanding, updContacto}

