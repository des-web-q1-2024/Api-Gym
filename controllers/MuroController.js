import { db } from "../db/conn.js";

const getLikeCount = async (req, res) => {
    const params = [req.params.idPost];
    const sql = `select count(1)  as like
                from EstadoLike where idpost=$1
                    `;         
    const result = await db.query(sql,params);
    console.log(result)
    res.json(result)
}



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
    res.status(500).json({ error: 'Error al insertar like' });
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
      res.status(500).json({ error: 'Error al eliminar like' });
    }
  };
export { postLike, deleteLike ,getLikeCount };
