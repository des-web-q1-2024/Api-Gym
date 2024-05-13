import pg from 'pg-promise'
const pgp = pg();
import dotenv from 'dotenv'
dotenv.config();

const user = process.env.user;
const pass = process.env.pass;
const DB = process.env.DB;
const host = process.env.host;
const portDb = process.env.portDB;

const cnstr = `postgresql://${user}:${pass}@${host}:${portDb}/${DB}`; 
const db = pgp(cnstr);

db.connect()
.then(() => {
    console.log("Conexion Exitosa");
})
.catch((e) => {
    console.log(`Conexion No exitosa ${e}`);
})

export {db}

