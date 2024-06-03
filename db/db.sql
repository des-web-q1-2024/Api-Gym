-- Active: 1717203264924@@localhost@5432@db_dojo
CREATE TABLE Perfil (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
)

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(100),
    nombre VARCHAR(30),
    apellido VARCHAR(30),
    correo VARCHAR(50),
    contrasenia VARCHAR(40),
    fechanacimiento DATE,
    fotoPerfil bytea,
    idPerfil int REFERENCES Perfil (id)
)

SELECT
    CASE
        WHEN EXISTS (
            SELECT 1
            FROM usuarios
            WHERE
                nombre_usuario = 'Ealas'
                AND contrasenia = '123'
        ) THEN 1
        ELSE 0
    END AS validado,
    COALESCE(
        (
            SELECT id
            FROM usuarios
            WHERE
                nombre_usuario = 'Ealas'
                AND contrasenia = '123'
        ),
        0
    ) AS idUsuarios;

SELECT a.id, a.nombre_usuario, a.nombre, a.apellido "nombre", a.correo, a.idPerfil, b.nombre "perfil"
FROM usuarios a
    inner join perfil b on a.idPerfil = b.id
where
    a.nombre_usuario = 'Ealas';

CREATE TABLE Arte_Marcial (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
)

CREATE TABLE Matricula (
    id SERIAL PRIMARY KEY,
    fechaInicio DATE,
    idArteMarcial int REFERENCES Arte_Marcial (id),
    idUsuarios int REFERENCES Usuarios (id)
)

ALTER TABLE Matricula ADD COLUMN activo BOOLEAN DEFAULT true;

CREATE TABLE Cinta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(70),
    foto bytea,
    nombre_archivo VARCHAR(500),
    mime_type VARCHAR(500),
    activo BOOLEAN DEFAULT TRUE,
    idUsuarios int REFERENCES Usuarios (id)
)

CREATE TABLE Evento (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200),
    foto bytea,
    nombre_archivo VARCHAR(500),
    mime_type VARCHAR(500),
    fecha DATE,
    descripcion VARCHAR(200),
    activo BOOLEAN DEFAULT true
)

CREATE TABLE Participacion(
id SERIAL PRIMARY KEY,
Logro VARCHAR(500),
idEvento int REFERENCES Evento(id),
idUsuarios int REFERENCES Usuarios(id),
activo bool DEFAULT true


) 

SELECT * FROM Participacion

CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    encabezado VARCHAR(300),
    descripcion VARCHAR(300),
    foto bytea,
    nombre_archivo VARCHAR(500),
    mime_type VARCHAR(500),
    likes INTEGER DEFAULT 0,
    idPost int REFERENCES Post (id),
    idUsuarios int REFERENCES Usuarios (id)
)
ALTER table POSt

CREATE TABLE Comentario (
    id SERIAL PRIMARY KEY,
    comentario VARCHAR(200),
    idPost int REFERENCES Post (id),
    idUsuarios int REFERENCES Usuarios (id),
    fecha_comentario TIMESTAMP DEFAULT current_timestamp,
    activo BOOLEAN DEFAULT TRUE
)

CREATE TABLE Hilo_comentario (
    id SERIAL PRIMARY KEY,
    comentario_detalle VARCHAR(200),
    idComentario int REFERENCES Comentario (id),
    idUsuario int REFERENCES Usuarios (id),
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
)

CREATE TABLE EstadoLike (
    id SERIAL PRIMARY KEY,
    idPost INT REFERENCES evento (id),
    idUsuarios INT REFERENCES Usuarios (id),
    meGusta INTEGER DEFAULT 1
)

DROP table EstadoLike

CREATE TABLE Graduacion (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    idMatricula int REFERENCES Matricula (id),
    idCinta int REFERENCES Cinta (id)
)

CREATE TABLE Save_Evento (
    id SERIAL PRIMARY KEY,
    Date_Save TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idPost INT REFERENCES evento (id),
    idUsuarios INT REFERENCES Usuarios (id)
)

SELECT * FROM arte_marcial;

drop table usuarios

SELECT a.id, b.nombre || ' ' || b.apellido "nombre", a.activo
FROM matricula a
    INNER JOIN usuarios b ON a.idusuarios = b.id
WHERE
    a.idartemarcial = 1
ORDER BY a.id;