-- Active: 1717360238194@@dpg-cpcfta674orc739uvm60-a.ohio-postgres.render.com@5432@db_dojo

/*

ARCHIVO SQL DE ESTRUCTURA 
SI HAY CAMBIOS USARL LA PLANTILLA

-- FECHA: 
-- PROGRAMADOR:
-- EXPLICACION:

*/


CREATE TABLE Arte_Marcial (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
)



drop table Cinta

CREATE TABLE Cinta (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(70),
    activo BOOLEAN DEFAULT TRUE,
    idUsuarios int REFERENCES Usuarios (id)
)

CREATE TABLE estadolike(
    id SERIAL NOT NULL,
    idusuarios integer,
    megusta integer DEFAULT 1,
    idevento integer,
    idpost integer,
    PRIMARY KEY(id),
    CONSTRAINT estadolike_idusuarios_fkey FOREIGN key(idusuarios) REFERENCES usuarios(id),
    CONSTRAINT estadolike_idevento_fkey FOREIGN key(idevento) REFERENCES evento(id),
    CONSTRAINT estadolike_idpost_fkey FOREIGN key(idpost) REFERENCES post(id)
);


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


DROP table Graduacion;

CREATE TABLE Graduacion (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    foto bytea,
    nombre_archivo VARCHAR(500),
    mime_type VARCHAR(500),
    idMatricula int REFERENCES Matricula (id),
    idCinta int REFERENCES Cinta (id),
    idUsuarios INT REFERENCES Usuarios (id)
)


DROP table Matricula;

CREATE TABLE Matricula (
    id SERIAL PRIMARY KEY,
    fechaInicio DATE,
    idArteMarcial int REFERENCES Arte_Marcial (id),
    idUsuarios int REFERENCES Usuarios (id),
    activo BOOLEAN DEFAULT true
);


CREATE TABLE Participacion(
    id SERIAL PRIMARY KEY,
    Logro VARCHAR(500),
    idEvento int REFERENCES Evento(id),
    idUsuarios int REFERENCES Usuarios(id),
    activo bool DEFAULT true
) 

CREATE TABLE Perfil (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE post(
    id SERIAL NOT NULL,
    encabezado varchar(300),
    descripcion varchar(300),
    foto bytea,
    nombre_archivo varchar(500),
    mime_type varchar(500),
    likes integer DEFAULT 0,
    idpost integer,
    idusuarios integer,
    fecha_post timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    idpadre integer DEFAULT 0,
    PRIMARY KEY(id),
    CONSTRAINT post_idpost_fkey FOREIGN key(idpost) REFERENCES post(id),
    CONSTRAINT post_idusuarios_fkey FOREIGN key(idusuarios) REFERENCES usuarios(id)
);

CREATE TABLE save_evento(
    id SERIAL NOT NULL,
    date_save timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    idpost integer,
    idusuarios integer,
    idevento integer,
    PRIMARY KEY(id),
    CONSTRAINT save_evento_idpost_fkey FOREIGN key(idpost) REFERENCES evento(id),
    CONSTRAINT save_evento_idusuarios_fkey FOREIGN key(idusuarios) REFERENCES usuarios(id),
    CONSTRAINT save_evento_idevento_fkey FOREIGN key(idevento) REFERENCES evento(id)
);

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

/*Creacion tablas de la landing Page

FECHA: 6 DE JUNIO
PROGRAMADOR: SAMUEL GALO
EXPLICACION: CONECTAR A LA BASE DE DATOS A LA LANDING PARA QUE EL ADMINISTRADOS PUEDA MODIFICARLO   
*/
CREATE TABLE landing(
    id SERIAL PRIMARY KEY,
    nosotros VARCHAR(500) NOT NULL,
    mision VARCHAR(500) NOT NULL,
    vision VARCHAR(500) NOT NULL
)

CREATE TABLE contactosLanding(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    telefono VARCHAR(10) NOT NULL
)

