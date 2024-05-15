import pg from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const user = 'postgres';
const pass = 'N1706e18ls.';
const dataBase = 'db_dojo';
const server = 'localhost';
const portDb = '5432';


console.log(`USER: ${user}, PASS: ${pass}, DB: ${dataBase}, SERVER: ${server}, PORT_DB: ${portDb}`);

const pgp = pg();

const cnstr = `postgresql://${user}:${pass}@${server}:${portDb}/${dataBase}`;

const db = pgp(cnstr);

db.connect()
    .then(() => {
        console.log("Conexion Exitosa");
    })
    .catch((err) => {
        console.log(`Error de conexion: ${err}`);
    });

export { db };

