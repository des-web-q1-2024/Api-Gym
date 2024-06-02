import { db } from "../db/conn.js";

//Consultar Cinta
const getCinta = async (req, res) => {
  const sql = `select id, nombre, activo from cinta order by id `;
  const result = await db.query(sql);
  res.json(result);
};

//Agregar Cinta
const postCinta = async (req, res) => {
  const { nombre, activo, idusuarios } = req.body;
  const params = [nombre, activo, idusuarios];
  const sql = `insert into cinta (nombre, activo, idusuarios) values ($1, $2, $3) returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Actualizar datos del Cinta, requerido el ID
const putCinta = async (req, res) => {
  const { nombre, activo, idusuarios } = req.body;
  const { id } = req.params;
  const params = [nombre, activo, idusuarios, id];
  const sql = `update cinta set nombre=$1, activo=$2, idusuarios=$3 where id=$4 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Eliminar Cinta, requerido el ID
const deleteCinta = async (req, res) => {
  const params = [req.params.id];
  const sql = `delete from cinta where id=$1 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

export { getCinta, postCinta, putCinta, deleteCinta };
