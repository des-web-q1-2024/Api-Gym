import dotenv from "dotenv";
import pg from "pg-promise";

dotenv.config();

const user = process.env.USER;
const pass = process.env.PASS;
const dataBase = process.env.DB;
const server = process.env.SERVER;
const portDb = process.env.PORT_DB;

const pgp = pg();

const Pass = encodeURIComponent(pass);
// const cnstr = `postgresql://${user}:${Pass}@${server}:${portDb}/${dataBase}?ssl=true`;
const cnstr = `postgresql://${user}:${Pass}@${server}/${dataBase}?ssl=true`;

const db = pgp(cnstr);

db.connect()
  .then(() => {
    console.log("Conexion Exitosa");
  })
  .catch((err) => {
    console.log(`Error de conexion: ${err}`);
  });

export { db };
