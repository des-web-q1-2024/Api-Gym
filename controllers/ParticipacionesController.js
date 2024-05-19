import { db } from "../db/conn.js";

const getParticipacion = async (req, res) => {
 try {
      const sql = `SELECT a.id, a.idevento, b.nombre "evento", b.fecha, b.descripcion, a.idusuarios, c.nombre_usuario, c.nombre, c.apellido, c.correo, c.fechaNacimiento, c.idPerfil, d.nombre "perfil" FROM Participacion a INNER JOIN evento b ON a.idevento = b.id INNER JOIN usuarios c ON a.idusuarios = c.id INNER JOIN perfil d ON c.idPerfil = d.id`;
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
const postParticipacion = async (req, res) => {
  try {
    const { idusuarios, idevento, logro } = req.body;
    const params = [idusuarios, idevento, logro];
    const sql = `insert into participacion ( idusuarios, idevento, logro ) values ( $1, $2, $3 ) returning * `;
    const result = await db.query(sql , params);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error });
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
const getEventoID = async (req, res) => {
  try {
        const params = [req.params.id];
        const sql = `SELECT *FROM Evento WHERE id = $1`;
        const result = await db.query(sql, params);

        if (result.length === 0) {
            res.status(404).json({ message: 'No se encontró registro.' });
        } else {
            res.json(result);
        };
    } catch (e) {
        res.status(500).json(e.message)
    }
  };

export { getParticipacion, getEventoID, getEventos, postParticipacion };
