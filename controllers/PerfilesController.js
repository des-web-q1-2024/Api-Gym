import { db } from "../db/conn.js";

//Consultar Perfiles
const getPerfil = async (req, res) => {
    const sql = `select id,nombre,activo                    
                    from perfil
                    order by id
                    `;
    const result = await db.query(sql);
    res.json(result)

}

//Agregar Perfiles
const postPerfil = async (req, res) => {

    const { nombre,activo } = req.body;
    const params = [nombre,activo];
    const sql = `insert into perfil
                (nombre,activo)
                values
                ($1,$2) returning * `
    const result = await db.query(sql, params);
    res.json(result);
}

//Actualizar datos del perfil, requerido el ID del perfil
const putPerfil = async (req, res) => {

    const { nombre,activo } = req.body;
    const { id } = req.params;

    const params = [
        nombre,
        activo,
        id
    ]

    const sql = `update perfil set nombre=$1, activo=$2 where id=$3 returning * `
    const result = await db.query(sql, params);
    res.json(result);

}

//Eliminar Perfiles , requerido el id del perfil
const deletePerfil = async (req, res) => {

    const params = [req.params.id];
    const sql = `delete from  perfil where id=$1 returning * `
    const result = await db.query(sql, params);
    res.json(result);
}

export { getPerfil,postPerfil ,putPerfil,deletePerfil}