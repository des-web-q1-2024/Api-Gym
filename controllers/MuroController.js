import { db } from "../db/conn.js";

//like eventos

const getLikeCount = async (req, res) => {
  const params = [req.params.idPost];
  const sql = `select count(1)  as like
                from EstadoLike where idevento=$1
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

const postLike = async (req, res) => {
  try {
    const { idEvento, idUsuarios } = req.body;
    const params = [idEvento, idUsuarios];

    const sql = `
      INSERT INTO estadolike (idEvento, idUsuarios)
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
        WHERE idEvento = $1 AND idUsuarios = $2
        RETURNING *;
      `;
    const result = await db.query(sql, params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar like" });
  }
}; 

// like post

const getLikeCountPost = async (req, res) => {
  const params = [req.params.idPost];
  const sql = `select count(1)  as like
                from EstadoLike where idpost=$1
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

const postLikeEvento = async (req, res) => {
  try {
    const { idPost, idUsuarios } = req.body;
    const params = [idPost, idUsuarios];

    const sql = `
      INSERT INTO estadolike (idPost, idUsuarios)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await db.query(sql, params);
    console.log(params);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al insertar like post" });
  }
};

const deleteLikeEvento = async (req, res) => {
  try {
    const { idPost, idUsuarios } = req.body;
    const params = [idPost, idUsuarios];
    const sql = `
        DELETE FROM estadolike
        WHERE idpost = $1 AND idUsuarios = $2
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
    const { idEvento, idUsuarios } = req.body;
    const params = [idEvento, idUsuarios];

    const sql = `
      INSERT INTO save_evento (idEvento, idUsuarios)
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
    const { idEvento, idUsuarios } = req.body;
    const params = [idEvento, idUsuarios];
    const sql = `
      DELETE FROM save_evento
      WHERE idevento = $1 AND idUsuarios = $2
      RETURNING * ;
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
                INNER JOIN EVENTO E ON  SE.idevento=e.id
                where se.idUsuarios=$1
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

// crud de post
const getHiloPost = async (req, res) => {
  console.log('hijos')
  const params = [req.params.idPost];

  const sql = `WITH RECURSIVE post_tree AS (
    SELECT 
        p.id,
        p.idpadre,
        p.descripcion,
        encode(p.foto, 'base64') AS foto,
        encode(u.fotoPerfil, 'base64') AS fotousuario,
        u.nombre,
        p.fecha_post,
        0 AS level
    FROM post p
    INNER JOIN usuarios u ON p.idusuarios = u.id
    WHERE p.id = $1
    UNION ALL
    SELECT 
        p.id,
        p.idpadre,
        p.descripcion,
        encode(p.foto, 'base64') AS foto,
        encode(u.fotoPerfil, 'base64') AS fotousuario,
        u.nombre,
        p.fecha_post,
        pt.level + 1 AS level
    FROM post p
    INNER JOIN usuarios u ON p.idusuarios = u.id
    INNER JOIN post_tree pt ON p.idpadre = pt.id
)
SELECT
    id,
    idpadre,
    descripcion,
    foto,
    fotousuario,
    nombre,
    CASE
        WHEN EXTRACT(YEAR FROM AGE(NOW(), fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(YEAR FROM AGE(NOW(), fecha_post)), ' año(s)')
        WHEN EXTRACT(MONTH FROM AGE(NOW(), fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MONTH FROM AGE(NOW(), fecha_post)), ' mes(es)')
        WHEN EXTRACT(DAY FROM AGE(NOW(), fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(DAY FROM AGE(NOW(), fecha_post)), ' día(s)')
        WHEN EXTRACT(HOUR FROM AGE(NOW(), fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(HOUR FROM AGE(NOW(), fecha_post)), ' hora(s)')
        WHEN EXTRACT(MINUTE FROM AGE(NOW(), fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MINUTE FROM AGE(NOW(), fecha_post)), ' minuto(s)')
        ELSE 'Recién publicado'
    END AS tiempo_transcurrido,
    level
FROM post_tree
WHERE level > 0
ORDER BY level, id;
                    `;

  const result = await db.query(sql, params);

  res.json(result);
};

// const getPost = async (req, res) => {

//   const params = [req.params.idUsuarios];
//   const sql = `WITH RECURSIVE post_tree AS (
//     SELECT 
//         p.id,
//         p.idpadre,
//         p.descripcion,
//         encode(p.foto, 'base64') AS foto,
//         encode(u.fotoPerfil, 'base64') AS fotousuario,
//         u.nombre,
//         p.fecha_post,
//         0 AS level,
//         jsonb_build_object(
//             'id', p.id,
//             'descripcion', p.descripcion,
//             'foto', encode(p.foto, 'base64'),
//             'fotousuario', encode(u.fotoPerfil, 'base64'),
//             'nombre', u.nombre,
//             'fecha_post', p.fecha_post,
//             'tiempo_transcurrido', CASE
//                                         WHEN EXTRACT(YEAR FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(YEAR FROM AGE(NOW(), p.fecha_post)), ' año(s)')
//                                         WHEN EXTRACT(MONTH FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MONTH FROM AGE(NOW(), p.fecha_post)), ' mes(es)')
//                                         WHEN EXTRACT(DAY FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(DAY FROM AGE(NOW(), p.fecha_post)), ' día(s)')
//                                         WHEN EXTRACT(HOUR FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(HOUR FROM AGE(NOW(), p.fecha_post)), ' hora(s)')
//                                         WHEN EXTRACT(MINUTE FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MINUTE FROM AGE(NOW(), p.fecha_post)), ' minuto(s)')
//                                         ELSE 'Recién publicado'
//                                     END,
//             'level', 0,
//             'children', '[]'::jsonb
//         ) AS post_object
//     FROM post p
//     INNER JOIN usuarios u ON p.idusuarios = u.id
//     WHERE p.idpadre = 0 -- Filtrar por los registros con ID como padres
//     AND p.idusuarios = $1
//     UNION ALL
//     SELECT 
//         p.id,
//         p.idpadre,
//         p.descripcion,
//         encode(p.foto, 'base64') AS foto,
//         encode(u.fotoPerfil, 'base64') AS fotousuario,
//         u.nombre,
//         p.fecha_post,
//         pt.level + 1 AS level,
//         jsonb_build_object(
//             'id', p.id,
//             'descripcion', p.descripcion,
//             'foto', encode(p.foto, 'base64'),
//             'fotousuario', encode(u.fotoPerfil, 'base64'),
//             'nombre', u.nombre,
//             'fecha_post', p.fecha_post,
//             'tiempo_transcurrido', CASE
//                                         WHEN EXTRACT(YEAR FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(YEAR FROM AGE(NOW(), p.fecha_post)), ' año(s)')
//                                         WHEN EXTRACT(MONTH FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MONTH FROM AGE(NOW(), p.fecha_post)), ' mes(es)')
//                                         WHEN EXTRACT(DAY FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(DAY FROM AGE(NOW(), p.fecha_post)), ' día(s)')
//                                         WHEN EXTRACT(HOUR FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(HOUR FROM AGE(NOW(), p.fecha_post)), ' hora(s)')
//                                         WHEN EXTRACT(MINUTE FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MINUTE FROM AGE(NOW(), p.fecha_post)), ' minuto(s)')
//                                         ELSE 'Recién publicado'
//                                     END,
//             'level', pt.level + 1,
//             'children', '[]'::jsonb
//         ) AS post_object
//     FROM post p
//     INNER JOIN usuarios u ON p.idusuarios = u.id
//     INNER JOIN post_tree pt ON p.idpadre = pt.id
// )
// SELECT jsonb_agg(parent_with_children.post_object)
// FROM (
//     SELECT 
//         parent.post_object || jsonb_build_object('children', jsonb_agg(child.post_object)) AS post_object
//     FROM post_tree parent
//     LEFT JOIN post_tree child ON parent.id = child.idpadre
//     GROUP BY parent.post_object
// ) AS parent_with_children;




//                     `;
//   const result = await db.query(sql, params);

//   res.json(result);
// };

const getPost = async (req, res) => {
  console.log('padres')
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
                         idpadre=0
                      ORDER BY 
                        p.id DESC;
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

const postInsertPost = async (req, res) => {
  try {
    console.log('hijos')
    const { encabezado, descripcion, idUsuarios } = req.body;

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

const postInsertHiloPost = async (req, res) => {
  try {
    console.log(1);
    const { descripcion, idUsuarios, idPadre } = req.body;

    const buffer = req.file ? req.file.buffer : null;

    const params = [descripcion, idUsuarios, idPadre, buffer];
    console.log(params);
    const sql = `
      INSERT INTO post (descripcion, idUsuarios,idPadre, foto) 
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

export {
  postLike,
  deleteLike,
  getLikeCount,
  postSaveEvento,
  deleteSaveEvento,
  getSaveEvento,
  postInsertPost,
  getPost,
  getLikeCountPost,
  postLikeEvento,
  deleteLikeEvento,
  postInsertHiloPost,
  getHiloPost,
};
