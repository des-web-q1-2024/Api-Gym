import { db } from "../db/conn.js";

const postNuevoUsuario = async (req, res) => {
    try {
        const { nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento } = req.body;
        const { buffer } = req.file;
        const params = [nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, buffer];
        
        // Asegurarse de que el SQL sea consistente y agregar el alias 'mensaje' correctamente
        const sql = `INSERT INTO usuarios (nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, foto)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     RETURNING *, 'Insercion Exitosa' AS mensaje`;

        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
}

export { postNuevoUsuario };

