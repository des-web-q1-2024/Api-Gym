import { db } from "../db/conn.js";

const postParticipacion = async (req, res) => {
  try {
    const { idusuario, idevento } = req.body;
    const query = 'INSERT INTO participacion (idusuario, idevento) VALUES ($1, $2)';
    await db.query(query, [idusuario, idevento]);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const getEventos = async (req, res) => {
  try {
    const query = 'SELECT * FROM evento';
    const { rows } = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

//Eduardo esta seria para realizar la seleccion del evento
const getEvento = async (req, res) => {
    try {
      const idevento = req.params.id;
      const query = 'SELECT * FROM evento WHERE id = $1';
      const { rows } = await db.query(query, [idevento]);
      if (rows.length > 0) {
        res.json(rows[0]);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  };

export { getEvento, getEventos, postParticipacion };
