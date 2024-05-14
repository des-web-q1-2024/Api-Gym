-- Active: 1715647239841@@127.0.0.1@5432@db_dojo
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
idUsuario int REFERENCES Usuario (id)
)

CREATE TABLE Cinta (
id SERIAL PRIMARY KEY,
nombre VARCHAR(70),
foto bytea,
nombre_archivo VARCHAR(500),
mime_type VARCHAR(500),
activo BOOLEAN DEFAULT TRUE,
idUsuario int REFERENCES Usuario (id)
)

CREATE TABLE Evento (
id SERIAL PRIMARY KEY,
nombre VARCHAR(200),
foto bytea,
nombre_archivo VARCHAR(500),
mime_type VARCHAR(500),
fecha DATE
)

ALTER TABLE Evento
ADD COLUMN descripcion VARCHAR(200)


CREATE TABLE Participacion(
id SERIAL PRIMARY KEY,
Logro VARCHAR(500),
idEvento int REFERENCES Evento(id),
idUsuario int REFERENCES Usuario(id)
)

CREATE TABLE Post (
id SERIAL PRIMARY KEY,
encabezado VARCHAR(300),
descripcion VARCHAR(300),
foto bytea,
nombre_archivo VARCHAR(500),
mime_type VARCHAR(500),
likes INTEGER DEFAULT 0,
idPost int REFERENCES Post(id),
idUsuario int REFERENCES Usuario(id)
)

CREATE TABLE Comentario(
id SERIAL PRIMARY KEY,
comentario VARCHAR(200),
idPost int REFERENCES Post(id),
idUsuario int REFERENCES Usuario(id),
fecha_comentario TIMESTAMP DEFAULT current_timestamp,
activo BOOLEAN DEFAULT TRUE
)

CREATE TABLE Hilo_comentario(
id SERIAL PRIMARY KEY,
comentario_detalle VARCHAR(200),
idComentario int REFERENCES Comentario(id),
idUsuario int REFERENCES Usuario(id),
fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
activo BOOLEAN DEFAULT TRUE
)

CREATE TABLE EstadoLike (
id SERIAL PRIMARY KEY,
idPost INT REFERENCES Post(id),
idUsuario INT REFERENCES Usuario(id),
like INTEGER DEFAULT 0
)

CREATE TABLE Graduacion (
id SERIAL PRIMARY KEY,
fecha DATE,
idMatricula int REFERENCES Matricula(id),
idCinta int REFERENCES Cinta(id)
)