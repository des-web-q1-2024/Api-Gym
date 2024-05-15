import { db } from "../db/conn.js";

const postNuevoUsuario = async (req, res) => {
    try {
        const { nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, fotoPerfil } = req.body;
        const { buffer } = req.file;
        const params = [nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, buffer];
        const sql = `INSERT INTO usuarios (nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, foto)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     RETURNING *, 'Insercion Exitosa' AS mensaje`; // Cambio en la consulta SQL para agregar un alias al mensaje de retorno
        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) { // Agregar el parámetro "err" para capturar el error
        res.status(500).json({ mensaje: err.message });
    }
}

export { postNuevoUsuario };
