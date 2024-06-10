-- Active: 1717117117301@@dpg-cpcfta674orc739uvm60-a.ohio-postgres.render.com@5432@db_dojo

/*
AQUI ESTARAN TODAS LAS CONSULTAS SQL.
*/

--************* ELVIS

select * from perfil;
--*******************
--**********EDUARDO
select b.descripcion "evento", c.nombre || ' ' || c.apellido "nombre", a.logro
from
    participacion a
    inner join evento b on a.idevento = b.id
    inner join usuarios c on a.idusuarios = c.id
where
    a.idevento = 1
ORDER BY a.idevento, c.nombre || ' ' || c.apellido, a.id;

Select
    a.id,
    a.idusuarios,
    d.descripcion "evento",
    a.logro,
    b.nombre_usuario,
    b.nombre || ' ' || b.apellido "nombre",
    b.correo,
    b.idPerfil,
    c.nombre "perfil"
from
    participacion a
    inner join usuarios b on a.idusuarios = b.id
    inner join perfil c on b.idPerfil = c.id
    inner join evento d on a.idevento = d.id
where
    a.idevento = 1
ORDER BY a.idevento, b.nombre || ' ' || b.apellido, a.id;

--*********FIN EDUARDO

--************SAMUEL

SELECT * FROM landing

SELECT a.*, b.*
FROM landing a
    INNER JOIN contactosLanding b ON a.id = b.id;

SELECT * FROM contactosLanding

DROP TABLE contactosLanding

DROP TABLE LANDING
--************FIN SAMUEL xd