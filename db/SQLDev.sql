-- Active: 1717360238194@@dpg-cpcfta674orc739uvm60-a.ohio-postgres.render.com@5432@db_dojo

/*
    AQUI ESTARAN TODAS LAS CONSULTAS SQL.
*/



--************* ELVIS

select * from perfil


--*******************


--**********EDUARDO


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