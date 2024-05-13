import { db } from "../db/conn.js";


const postNuevoUsuario = async (req, res) => {

    try{
       
        const { nombre_usuario,nombre,apellido,correo,contrasenia,fechaNacimiento,fotoPerfil } = req.body;
     
        const {
            buffer     
        } = req.file;
    
        const params = [nombre_usuario,nombre,apellido,correo,contrasenia,fechaNacimiento ,buffer];
    
        const sql = `insert into usuarios
                    (nombre_usuario,nombre,apellido,correo,contrasenia,fechaNacimiento,foto)
                    values
                    ($1,$2,$3,$4,$5,$6,$7) returning * , 'Insercion Exitosa' mensaje `
    
        const result = await db.query(sql, params);
        res.json(result);
    }catch{
        res.status(500).json({ mensaje: err.message });
    }

   
}

export { postNuevoUsuario }
