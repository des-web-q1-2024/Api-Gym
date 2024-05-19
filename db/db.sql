-- Active: 1707795232143@@127.0.0.1@5432@db_dojo
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
    fechaNacimiento DATE,
    fotoPerfil bytea,
    idPerfil int REFERENCES Perfil (id)
)

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

CREATE TABLE Participacion (
    id SERIAL PRIMARY KEY,
    Logro VARCHAR(500),
    idEvento int REFERENCES Evento (id),
    idUsuarios int REFERENCES Usuarios (id)
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
    idPost INT REFERENCES Post (id),
    idUsuarios INT REFERENCES Usuarios (id),
    meGusta INTEGER DEFAULT 0
)

CREATE TABLE Graduacion (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    idMatricula int REFERENCES Matricula (id),
    idCinta int REFERENCES Cinta (id)
)

insert into
    perfil (nombre)
values ('Administrador'),
    ('Maestro'),
    ('Alumno');

SELECT * FROM Perfil;

insert into
    usuarios (
        nombre_usuario,
        nombre,
        apellido,
        correo,
        contrasenia,
        fechaNacimiento,
        idPerfil
    )
VALUES (
        'EFFS777',
        'Eduardo',
        'Flores',
        'effs777@gmail.com',
        'Hola1',
        '1975-08-04',
        1
    ),
    (
        'EFFS888',
        'Eduardo',
        'Flores',
        'effs888@gmail.com',
        'Hola1',
        '1975-08-04',
        2
    ),
    (
        'EFFS999',
        'Eduardo',
        'Flores',
        'effs999@gmail.com',
        'Hola1',
        '1975-08-04',
        3
    );

SELECT * FROM usuarios;

select * from participacion;

SELECT a.nombre_usuario, a.nombre || ' ' || a.apellido "nombre", a.correo, a.idPerfil, b.nombre "perfil"
FROM usuarios a
    inner join perfil b on a.idPerfil = b.id
where
    a.nombre_usuario = 'EFFS777';



SELECT * FROM Evento


SELECT
    nombre,
    descripcion,
    fecha,
    encode(foto, 'base64') foto,
    mime_type
FROM Evento
WHERE
    fecha = '2024-06-01'
    AND activo = true