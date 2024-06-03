import { db } from "../db/conn.js";

//Consultar Graduacion
const getGraduacion = async (req, res) => {
  const sql = `SELECT a.id, a.fecha, a.idmatricula, b.fechainicio, c.nombre "arte_marcial", a.idcinta, d.nombre "cinta", b.idusuarios "idalumno", e.nombre || ' ' || e.apellido "nombrealumno", a.idusuarios "idmaestro",  f.nombre || ' ' || f.apellido "nombremaestro" FROM graduacion a    INNER JOIN matricula b ON a.idmatricula = b.id INNER JOIN arte_marcial c ON b.idartemarcial = c.id INNER JOIN cinta d ON a.idcinta = d.id INNER JOIN usuarios e ON b.idusuarios = e.id INNER JOIN usuarios f ON a.idusuarios = f.id WHERE a.idmatricula = 0 ORDER BY a.idmatricula, b.idusuarios, a.fecha;`;
  const result = await db.query(sql);
  res.json(result);
};

const getGraduacionByMatricula = async (req, res) => {
  const { idmatricula } = req.params;
  const params = [idmatricula];

  const sql = `SELECT a.id, a.fecha, a.idmatricula, b.fechainicio, c.nombre "arte_marcial", a.idcinta, d.nombre "cinta", b.idusuarios "idalumno", e.nombre || ' ' || e.apellido "nombrealumno", a.idusuarios "idmaestro",  f.nombre || ' ' || f.apellido "nombremaestro" FROM graduacion a    INNER JOIN matricula b ON a.idmatricula = b.id INNER JOIN arte_marcial c ON b.idartemarcial = c.id INNER JOIN cinta d ON a.idcinta = d.id INNER JOIN usuarios e ON b.idusuarios = e.id INNER JOIN usuarios f ON a.idusuarios = f.id WHERE a.idmatricula = $1 ORDER BY a.idmatricula, b.idusuarios, a.fecha;`;
  const result = await db.query(sql, params);
  res.json(result);
};

const getGraduacionByMatriculaAlumno = async (req, res) => {
  const { idmatricula, idalumno } = req.params;
  const params = [idmatricula, idalumno];

  const sql = `SELECT a.id, a.fecha, a.idmatricula, b.fechainicio, c.nombre "arte_marcial", a.idcinta, d.nombre "cinta", b.idusuarios "idalumno", e.nombre || ' ' || e.apellido "nombrealumno", a.idusuarios "idmaestro",  f.nombre || ' ' || f.apellido "nombremaestro" FROM graduacion a    INNER JOIN matricula b ON a.idmatricula = b.id INNER JOIN arte_marcial c ON b.idartemarcial = c.id INNER JOIN cinta d ON a.idcinta = d.id INNER JOIN usuarios e ON b.idusuarios = e.id INNER JOIN usuarios f ON a.idusuarios = f.id WHERE a.idmatricula = $1 AND b.idusuarios = $2 ORDER BY a.idmatricula, b.idusuarios, a.fecha;`;
  const result = await db.query(sql, params);
  res.json(result);
};

//Agregar Graduacion
const postGraduacion = async (req, res) => {
  const { fecha, idMatricula, idCinta, idUsuarios } = req.body;
  const params = [fecha, idMatricula, idCinta, idUsuarios];
  const sql = `insert into graduacion ( fecha, idMatricula, idCinta, idUsuarios ) values ($1, $2, $3, $4) returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Actualizar datos de Graduacion, requerido el ID
const putGraduacion = async (req, res) => {
  const { fecha, idMatricula, idCinta, idUsuarios } = req.body;
  const { id } = req.params;
  const params = [fecha, idMatricula, idCinta, idUsuarios, id];
  const sql = `update graduacion set fecha=$1, idMatricula=$2, idCinta=$3, idUsuarios=$4 where id=$5 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

// Eliminar Graduacion, requerido el ID
const deleteGraduacion = async (req, res) => {
  const params = [req.params.id];
  const sql = `delete from graduacion where id=$1 returning * `;
  const result = await db.query(sql, params);
  res.json(result);
};

export {
  getGraduacion,
  getGraduacionByMatricula,
  getGraduacionByMatriculaAlumno,
  postGraduacion,
  putGraduacion,
  deleteGraduacion,
};
