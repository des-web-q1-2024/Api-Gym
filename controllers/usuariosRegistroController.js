import { db } from "../db/conn.js";

const postNuevoUsuarios = async (req, res) => {
    try {
        const { nombre_usuario, nombre, apellido, correo, contrasenia, fechanacimiento } = req.body;
        const idPerfil = 3; // Id de perfil que deseas asignar

        const buffer = req.file ? req.file.buffer : null;

        // Verificar que el id de perfil sea igual a 3
        if (idPerfil !== 3) {
            throw new Error('No tienes permiso para registrar usuarios con este perfil.');
        }

        const params = [nombre_usuario, nombre, apellido, correo, contrasenia, fechanacimiento, buffer, idPerfil];

        const sql = `
            INSERT INTO usuarios (nombre_usuario, nombre, apellido, correo, contrasenia, fechanacimiento, fotoPerfil, idPerfil)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *, 'Inserción Exitosa' AS mensaje;
        `;

        console.log('Params:', params); // Agrega este console.log para ver los parámetros que estás recibiendo

        const result = await db.query(sql, params);
        console.log('Result:', result); // Agrega este console.log para ver el resultado de la consulta

        res.json(result.rows[0]); // Asegúrate de enviar la fila resultante
    } catch (err) {
        console.error('Error al insertar un nuevo usuario:', err);
        res.status(500).json({ mensaje: err.message });
    }
}

export { postNuevoUsuarios };





