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

const getSaveEvento  = async (req, res) => {
  const params = [req.params.idUsuarios];
 
  const sql = `SELECT * , encode(foto, 'base64') AS imgevento
                FROM SAVE_EVENTO SE
                INNER JOIN EVENTO E ON  SE.IDpost=e.id
                where se.idUsuarios=$1
                    `;
  const result = await db.query(sql, params);
  
  res.json(result);
};


export { postLike, deleteLike, getLikeCount, postSaveEvento, deleteSaveEvento,getSaveEvento };
