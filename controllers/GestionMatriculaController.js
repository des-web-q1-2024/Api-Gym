import { db } from "../db/conn.js";

//Consultar Matricula
const getMatricula = async (req, res) => {
  const sql = `SELECT a.id, fechainicio, b.nombre || ' ' || b.apellido "nombre", a.activo, c.nombre "arteMarcial", a.idartemarcial, a.idusuarios FROM matricula a INNER JOIN usuarios b ON a.idusuarios = b.id INNER JOIN arte_marcial c ON a.idartemarcial = c.id ORDER BY a.idusuarios, a.id`;
  const result = await db.query(sql);
  res.json(result);
};

const getMatriculaByArteMarcial = async (req, res) => {
  const { idartemarcial } = req.params;
  const params = [idartemarcial];

  const sql = `SELECT a.id, fechainicio, b.nombre || ' ' || b.apellido "nombre", a.activo, c.nombre "arteMarcial", a.idartemarcial, a.idusuarios FROM matricula a INNER JOIN usuarios b ON a.idusuarios = b.id INNER JOIN arte_marcial c ON a.idartemarcial = c.id WHERE a.idartemarcial = $1 ORDER BY a.id`;
  const result = await db.query(sql, params);
  res.json(result);
};

//Agregar Matricula
const postMatricula = async (req, res) => {
  const { fechainicio, idartemarcial, idusuarios } = req.body;
  const params = [fechainicio, idartemarcial, idusuarios];
  const sql = `insert into matricula (fechainicio, idartemarcial, idusuarios) values ($1, $2, $3) returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Actualizar datos de Matricula, requerido el ID
const putMatricula = async (req, res) => {
  const { fechainicio, idartemarcial, idusuarios } = req.body;
  const { id } = req.params;
  const params = [fechainicio, idartemarcial, idusuarios, id];
  const sql = `update matricula set fechainicio=$1, idartemarcial=$2, idusuarios = $3 where id=$4 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Eliminar Matricula, requerido el ID
const deleteMatricula = async (req, res) => {
  const params = [req.params.id];
  const sql = `delete from matricula where id=$1 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

export {
  getMatricula,
  getMatriculaByArteMarcial,
  postMatricula,
  putMatricula,
  deleteMatricula,
};
