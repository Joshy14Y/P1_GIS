--Ejercicios de clase
--Divida los segmentos de la tabla carreteras de modo que no existean segmentos mayores a 5 mts en su estructura multilínea.
select gid,tipo,ancho,st_segmentize(geom,5)
from tec.vias
	--vista geográfica
create view tec.vias_segmentos5m
as
	select gid,tipo,ancho,st_segmentize(geom,5) as geom
	from tec.vias
	--Recuperación de la vista geográfica
select * from tec.vias_segmentos5m

--Determine las geometría de los edificios que contengan algún tipo de error en su geometría, termine el motivo del error.
select *,ST_MakeValid(geom) as valid_geom,st_isValidreason(geom) from tec.edificios
where  not st_isvalid(geom)
order by gid

--Exporte las geometrías de la capas de carreteras en formato geoJSON.
--Exporte las edificaciones del tec en formato KML y cárguelas sobre la plataforma GoogleEarth.
select ST_AsKML(geom),ST_AsSVG(geom),ST_AsGeoJSON(geom),* from tec.parqueos


--Solución del laboratorio:
--Cree un cuadro delimitador para la geometria correspondiente al plano catastrado del Tec San Carlos (capa: idesca.catastro_municipal) (30pts)
Select st_envelope(geom) from idesca.catastro_municipal where id=6893

--Determine la cantidad de puntos que posee la geometría que representa al distrito de Florencia en San Carlos. (Capa: snit.distritos) (30pts)
select st_npoints(geom) from snit.distritos where distrito='Florencia'

--Cree una tabla de geometría tipo linestring para la tabla snit.aeropuertos, y actualice todos los registros creando una nueva línea recta desde el punto mismo del aeropuerto representado y el puntos correspondiente al aeropuesto Juan San Santa María. (40pts)
select *,(ST_Length(geom)/1000)::int "Distancia en kilómetros" from 
	(select id,nom_objeto,nom_ofi,st_makeline(geom,(select geom from snit.aeropuertos where id=150)) as geom
		from snit.aeropuertos) as a



