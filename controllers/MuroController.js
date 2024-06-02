import { db } from "../db/conn.js";

const getLikeCount = async (req, res) => {
  const params = [req.params.idPost];
  const sql = `select count(1)  as like
                from EstadoLike where idpost=$1
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

const postLike = async (req, res) => {
  try {
    const { idPost, idUsuarios } = req.body;
    const params = [idPost, idUsuarios];

    const sql = `
      INSERT INTO estadolike (idPost, idUsuarios)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await db.query(sql, params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al insertar like" });
  }
};

const deleteLike = async (req, res) => {
  try {
    const { idPost, idUsuarios } = req.body;
    const params = [idPost, idUsuarios];
    const sql = `
        DELETE FROM estadolike
        WHERE idPost = $1 AND idUsuarios = $2
        RETURNING *;
      `;
    const result = await db.query(sql, params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar like" });
  }
};

// CRUD de Eventos
const postSaveEvento = async (req, res) => {
  try {
    const { idPost, idUsuarios } = req.body;
    const params = [idPost, idUsuarios];
console.log(params)
    const sql = `
      INSERT INTO save_evento (idPost, idUsuarios)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await db.query(sql, params);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al insertar Evento" });
  }
};

const deleteSaveEvento = async (req, res) => {
  try {
    const { idPost, idUsuarios } = req.body;
    const params = [idPost, idUsuarios];
    const sql = `
      DELETE FROM save_evento
      WHERE idPost = $1 AND idUsuarios = $2
      RETURNING *;
    `;
    const result = await db.query(sql, params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar evento" });
  }
};

const getSaveEvento = async (req, res) => {
  const params = [req.params.idUsuarios];

  const sql = `SELECT * , encode(foto, 'base64') AS imgevento
                FROM SAVE_EVENTO SE
                INNER JOIN EVENTO E ON  SE.IDpost=e.id
                where se.idUsuarios=$1
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

// crud de post
const postInsertPost = async (req, res) => {
  try {
    const { encabezado, descripcion, idUsuarios } = req.body;

    // Si estás usando multer, puedes acceder a los datos del archivo desde req.file
    const buffer = req.file ? req.file.buffer : null;

    const params = [encabezado, descripcion, buffer, idUsuarios];

    const sql = `
      INSERT INTO post (encabezado, descripcion, foto, idUsuarios) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await db.query(sql, params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al insertar post" });
  }
};

const getPost = async (req, res) => {
  const params = [req.params.idUsuarios];
  const sql = `SELECT   p.*, 
                        encode(foto, 'base64') AS foto,
                        encode(fotoPerfil, 'base64') AS fotousuario,
                        u.nombre,
                        CASE 
                            WHEN EXTRACT(YEAR FROM AGE(NOW(), p.fecha_post)) > 0 THEN 
                                CONCAT('hace ', EXTRACT(YEAR FROM AGE(NOW(), p.fecha_post)), ' año(s)')
                            WHEN EXTRACT(MONTH FROM AGE(NOW(), p.fecha_post)) > 0 THEN 
                                CONCAT('hace ', EXTRACT(MONTH FROM AGE(NOW(), p.fecha_post)), ' mes(es)')
                            WHEN EXTRACT(DAY FROM AGE(NOW(), p.fecha_post)) > 0 THEN 
                                CONCAT('hace ', EXTRACT(DAY FROM AGE(NOW(), p.fecha_post)), ' día(s)')
                            WHEN EXTRACT(HOUR FROM AGE(NOW(), p.fecha_post)) > 0 THEN 
                                CONCAT('hace ', EXTRACT(HOUR FROM AGE(NOW(), p.fecha_post)), ' hora(s)')
                            WHEN EXTRACT(MINUTE FROM AGE(NOW(), p.fecha_post)) > 0 THEN 
                                CONCAT('hace ', EXTRACT(MINUTE FROM AGE(NOW(), p.fecha_post)), ' minuto(s)')
                            ELSE 
                                'Recién publicado'
                        END AS tiempo_transcurrido
                      FROM 
                        post p
                      INNER JOIN 
                        usuarios u ON p.idusuarios = u.id
                      WHERE 
                        idUsuarios = $1 
                      ORDER BY 
                        p.id DESC;
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};


export {
  postLike,
  deleteLike,
  getLikeCount,
  postSaveEvento,
  deleteSaveEvento,
  getSaveEvento,
  postInsertPost,
  getPost,
};
