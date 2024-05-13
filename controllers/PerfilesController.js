import { db } from "../db/conn.js";


const getPerfil = async (req, res) => {
    const sql = `select id,nombre,activo                    
                    from perfil
                    order by id
                    `;
    const result = await db.query(sql);
    res.json(result)

}


const postPerfil = async (req, res) => {

    const { nombre,activo } = req.body;
    const params = [ombre,activo];
    const sql = `insert into perfil
                (nombre,activo)
                values
                ($1,$2) returning * `
    const result = await db.query(sql, params);
    res.json(result);
}
export { postPerfil,getPerfil }