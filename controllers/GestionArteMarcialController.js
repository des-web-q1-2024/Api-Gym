import { db } from "../db/conn.js";

//Consultar Arte Marcial
const getArteMarcial = async (req, res) => {
  const sql = `select id, nombre, activo from arte_marcial order by id `;
  const result = await db.query(sql);
  res.json(result);
};

//Agregar Arte Marcial
const postArteMarcial = async (req, res) => {
  const { nombre, activo } = req.body;
  const params = [nombre, activo];
  const sql = `insert into arte_marcial (nombre, activo) values ($1, $2) returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Actualizar datos del Arte Marcial, requerido el ID
const putArteMarcial = async (req, res) => {
  const { nombre, activo } = req.body;
  const { id } = req.params;
  const params = [nombre, activo, id];
  const sql = `update arte_marcial set nombre=$1, activo=$2 where id=$3 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Eliminar Arte Marcial, requerido el ID
const deleteArteMarcial = async (req, res) => {
  const params = [req.params.id];
  const sql = `delete from arte_marcial where id=$1 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

export { getArteMarcial, postArteMarcial, putArteMarcial, deleteArteMarcial };
