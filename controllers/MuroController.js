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
  const params = [req.params.idPost];
 
  const sql = `select descripcion ,
                      encode(foto, 'base64') AS foto ,
                      encode(fotoPerfil, 'base64') AS fotousuario ,
                      u.nombre, CASE
                                  WHEN EXTRACT(YEAR
                                                FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(YEAR
                                                                                                                FROM AGE(NOW(), p.fecha_post)), ' año(s)')
                                  WHEN EXTRACT(MONTH
                                                FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MONTH
                                                                                                                FROM AGE(NOW(), p.fecha_post)), ' mes(es)')
                                  WHEN EXTRACT(DAY
                                                FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(DAY
                                                                                                                FROM AGE(NOW(), p.fecha_post)), ' día(s)')
                                  WHEN EXTRACT(HOUR
                                                FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(HOUR
                                                                                                                FROM AGE(NOW(), p.fecha_post)), ' hora(s)')
                                  WHEN EXTRACT(MINUTE
                                                FROM AGE(NOW(), p.fecha_post)) > 0 THEN CONCAT('hace ', EXTRACT(MINUTE
                                                                                                                FROM AGE(NOW(), p.fecha_post)), ' minuto(s)')
                                  ELSE 'Recién publicado'
                              END AS tiempo_transcurrido
                    FROM post p
                    INNER JOIN usuarios u ON p.idusuarios = u.id
                    where idpadre=
                      (select id
                        FROM post p
                        where idpadre=0
                            and id=$1)
                    `;
               
  const result = await db.query(sql, params);
console.log('hilos')
  res.json(result);
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
                        idUsuarios = $1 and idpadre=0
                      ORDER BY 
                        p.id DESC;
                    `;
  const result = await db.query(sql, params);

  res.json(result);
};

const postInsertPost = async (req, res) => {
  try {
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
    console.log(1)
    const { descripcion, idUsuarios, idPadre } = req.body;


    const buffer = req.file ? req.file.buffer : null;

    const params = [descripcion, idUsuarios, idPadre, buffer,];
    console.log(params)
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
