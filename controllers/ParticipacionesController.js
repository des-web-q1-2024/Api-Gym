import { db } from "../db/conn.js";

const getParticipacion = async (req, res) => {
  try {
    const sql = `SELECT a.id, a.idevento, b.nombre "evento", a.logro, b.fecha, b.descripcion, a.idusuarios, c.nombre_usuario, c.nombre, c.apellido, c.correo, c.fechaNacimiento, c.idPerfil, d.nombre "perfil" FROM Participacion a INNER JOIN evento b ON a.idevento = b.id INNER JOIN usuarios c ON a.idusuarios = c.id INNER JOIN perfil d ON c.idPerfil = d.id`;
    const result = await db.query(sql);
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getParticipacionByEventoAlumno = async (req, res) => {
  try {
    const { idevento, idusuarios } = req.params;
    const params = [idevento, idusuarios];

    const sql =
      "select a.id, a.idevento, a.idusuarios, a.logro from participacion a where a.idevento = $1 and a.idusuarios = $2";
    const result = await db.query(sql, params);
    if (result.length > 0) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
const postParticipacion = async (req, res) => {
  try {
    const { idusuarios, idevento, logro } = req.body;
    const params = [idusuarios, idevento, logro];
    const sql = `insert into participacion ( idusuarios, idevento, logro ) values ( $1, $2, $3 ) returning * `;
    const result = await db.query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const putParticipacion = async (req, res) => {
  try {
    const id = req.params.id;
    const { logro } = req.body;
    const params = [logro, id];
    const sql = `update participacion set logro = $1 where id=$2 returning *`;
    const result = await db.query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getEventos = async (req, res) => {
  try {
    const query = "SELECT * FROM evento";
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getParticipacionAlumnosPorEvento = async (req, res) => {
  try {
    const params = [req.params.idevento];
    const sql = `Select a.id, a.idusuarios, d.descripcion "evento", a.logro, b.nombre_usuario, b.nombre || ' ' || b.apellido "nombre", b.correo, b.idPerfil, c.nombre "perfil" from participacion a inner join usuarios b on a.idusuarios = b.id inner join perfil c on b.idPerfil = c.id inner join evento d on a.idevento = d.id  where a.idevento = $1 ORDER BY a.idevento, b.nombre || ' ' || b.apellido, a.id;`;
    const result = await db.query(sql, params);

    if (result.length === 0) {
      res.status(404).json({ message: "No se encontró registro." });
    } else {
      res.json(result);
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
};

// adicional para ver si el usuario ya esta registrado en el evento Elvis Alas
const getParticipacionByEventoAlumnoExistis = async (req, res) => {
  try {
    const { idevento, idusuarios } = req.params;
    const params = [idevento, idusuarios];
    console.log(1);
    const sql = `SELECT COUNT(1) AS existe FROM participacion WHERE idevento = $1 AND idusuarios = $2 AND activo = true`;
    const result = await db.query(sql, params);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export {
  getParticipacion,
  getEventos,
  postParticipacion,
  putParticipacion,
  getParticipacionByEventoAlumno,
  getParticipacionAlumnosPorEvento,
  getParticipacionByEventoAlumnoExistis,
};
