import { db } from "../db/conn.js";

const getUsuarios = async (req, res) => {
    const sql = `SELECT *,encode(fotoPerfil, 'base64') AS foto FROM usuarios;`;
    const result = await db.query(sql);
  
    res.json(result);
}

const getUsuariosByNombreUsuario = async (req, res) => {
  const params = [req.params.nombre_usuario];
  const sql = `SELECT a.id, a.nombre_usuario, a.nombre || ' ' || a.apellido "nombre", a.correo, a.idPerfil, b.nombre "perfil" FROM usuarios a inner join perfil b on a.idPerfil = b.id where a.nombre_usuario = $1;`;
  const result = await db.query(sql, params);
console.log(result)
  res.json(result);
}

const postNuevoUsuarios = async (req, res) => {
    try {
        const { nombre_usuario, nombre, apellido, correo, contrasenia, fechanacimiento, idPerfil } = req.body;
        const buffer = req.file ? req.file.buffer : null;

        const params = [nombre_usuario, nombre, apellido, correo, contrasenia, fechanacimiento, buffer, idPerfil];

        const sql = `
            INSERT INTO usuarios (nombre_usuario, nombre, apellido, correo, contrasenia, fechanacimiento, fotoPerfil, idPerfil)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *, 'Insercion Exitosa' AS mensaje;
        `;

        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) {
        console.error('Error al insertar un nuevo usuario:', err);
        res.status(500).json({ mensaje: err.message });
    }
}

const putUsuarios = async (req, res) => {
    const { id } = req.params;
    const { nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, idPerfil } = req.body;
    const buffer = req.file ? req.file.buffer : null;

    const sql = `
        UPDATE usuarios
        SET nombre_usuario = $1, nombre = $2, apellido = $3, correo = $4, contrasenia = $5, fechanacimiento = $6, fotoPerfil = $7, idPerfil = $8
        WHERE id = $9
        RETURNING *;
    `;

    const params = [nombre_usuario, nombre, apellido, correo, contrasenia, fechaNacimiento, buffer, idPerfil, id];

    try {
        const result = await db.query(sql, params);
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario' });
    }
}

const deleteUsuarios = async (req, res) => {
    const params = [req.params.id];
    const sql = `delete from  usuarios where id=$1 returning id,'Eliminado' mensaje  `
    const result = await db.query(sql, params);
    res.json(result);
}

export { getUsuarios, getUsuariosByNombreUsuario, postNuevoUsuarios, putUsuarios, deleteUsuarios };


