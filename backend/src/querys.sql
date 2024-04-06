CREATE OR REPLACE FUNCTION public.cortes_horizontales_g2(
	geometria geometry,
	cortes integer[])
    RETURNS geometry[]
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	sobre geometry:=st_envelope(geometria);
	minx DOUBLE PRECISION;
	maxx DOUBLE PRECISION;
	miny DOUBLE PRECISION;
	maxy DOUBLE PRECISION;
	distancia_division DOUBLE PRECISION;
	factor_corte DOUBLE PRECISION;
	area geometry;
	corte geometry;
	area_corte DOUBLE PRECISION;
	area_corte_definida int;
	resultado geometry[];
	linea_corte geometry;
begin
	foreach area_corte_definida in array cortes loop
		sobre:=st_envelope(geometria);
		minx=st_xmin(sobre);
		maxx=st_xmax(sobre);
		miny=st_ymin(sobre);
		maxy=st_ymax(sobre);
		raise notice 'Caja: minx->% maxx->% miny->% maxy->%',minx,maxx,miny,maxy;
		raise notice 'Área del siguiente corte a aplicar: %',area_corte_definida;	
		factor_corte:=(maxy-miny)/2;
		distancia_division:=factor_corte;
		linea_corte:=st_setsrid(ST_MakeBOX2D(ST_Point(minx,miny + distancia_division), 
												ST_Point(maxx,maxy)),5367);
		corte=st_intersection(geometria,linea_corte);
		area_corte:=st_area(corte);
		while (abs(area_corte-area_corte_definida)>1) loop
			factor_corte:=factor_corte/2;
			if (area_corte>area_corte_definida) then
				distancia_division:=distancia_division+factor_corte;
				raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡Muy grande!',area_corte_definida,area_corte;
			else
				distancia_division:=distancia_division-factor_corte;
				raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡Muy pequeño!',area_corte_definida,area_corte;
			end if;
			linea_corte:=st_setsrid(ST_MakeBOX2D(ST_Point(minx,miny + distancia_division), 
												ST_Point(maxx,maxy)),5367);
			corte=st_intersection(geometria,linea_corte);
			area_corte:=st_area(corte);
		end loop;
		raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡¡¡Final!!!',area_corte_definida,area_corte;
		geometria=st_difference(geometria,linea_corte);
		resultado:=resultado||corte;
	end loop;
	resultado:=resultado||geometria;
	return (resultado);
end;
$BODY$;
select st_area (unnest), unnest as geom from (
select unnest(cortes_horizontales_g2 
(
	(select geom from proyecto.parcelas where id=1),
	'{3500,12550}'::int[]
))) as recortes

CREATE OR REPLACE FUNCTION public.cortes_verticales2(
	geometria geometry,
	cortes integer[])
    RETURNS geometry[]
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	sobre geometry:=st_envelope(geometria);
	minx DOUBLE PRECISION;
	maxx DOUBLE PRECISION;
	miny DOUBLE PRECISION;
	maxy DOUBLE PRECISION;
	distancia_division DOUBLE PRECISION;
	factor_corte DOUBLE PRECISION;
	area geometry;
	corte geometry;
	area_corte DOUBLE PRECISION;
	area_corte_definida int;
	resultado geometry[];
	linea_corte geometry;
begin
	foreach area_corte_definida in array cortes loop
		sobre:=st_envelope(geometria);
		minx=st_xmin(sobre);
		maxx=st_xmax(sobre);
		miny=st_ymin(sobre);
		maxy=st_ymax(sobre);
		raise notice 'Caja: minx->% maxx->% miny->% maxy->%',minx,maxx,miny,maxy;
		raise notice 'Área del siguiente corte a aplicar: %',area_corte_definida;	
		factor_corte:=(maxx-minx)/2;
		distancia_division:=factor_corte;
		linea_corte:=st_setsrid(ST_MakeBOX2D(ST_Point(minx,miny), 
												ST_Point(minx+distancia_division,maxy)),5367);
		corte=st_intersection(geometria,linea_corte);
		area_corte:=st_area(corte);
		while (abs(area_corte-area_corte_definida)>1) loop
			factor_corte:=factor_corte/2;
			if (area_corte>area_corte_definida) then
				distancia_division:=distancia_division-factor_corte;
				raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡Muy grande!',area_corte_definida,area_corte;
			else
				distancia_division:=distancia_division+factor_corte;
				raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡Muy pequeño!',area_corte_definida,area_corte;
			end if;
			linea_corte:=st_setsrid(ST_MakeBOX2D(ST_Point(minx,miny), 
												ST_Point(minx+distancia_division,maxy)),5367);
			corte=st_intersection(geometria,linea_corte);
			area_corte:=st_area(corte);
		end loop;
		raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡¡¡Final!!!',area_corte_definida,area_corte;
		geometria=st_difference(geometria,linea_corte);
		resultado:=resultado||corte;
	end loop;
	resultado:=resultado||geometria;
	return (resultado);
end;
$BODY$;
select st_area (unnest), unnest as geom from (
select unnest(cortes_verticales2 
(
	(select geom from proyecto.parcelas where id=1),
	'{3500,12550}'::int[]
))) as recortes


CREATE OR REPLACE FUNCTION public.cortes_cuadricula_g2(
	geometria geometry,
	cortes integer[],
	cantidadxcolumn integer)
    RETURNS geometry[]
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
    resultado geometry[];
	verticales geometry[];
	vertice_element geometry; 
	horizontales1 geometry[];
	horizontales2 geometry[];
    columna1 int := 0;
    columna2 int := 0;
	 columna1_elems int[] := '{}'; -- Arreglo para almacenar elementos de columna 1
    columna2_elems int[] := '{}'; -- Arreglo para almacenar elementos de columna 2
	verticales_elems int[] := '{}'; -- Arreglo para almacenar elementos linea vertical
    i int;
	contador int := 1;
	j int;
    tamano integer;
BEGIN
    -- Calcular la cantidad de elementos en el arreglo 
    tamano := array_length(cortes, 1);
    -- Sumar los elementos de cada subarreglo
    FOR i IN 1..tamano LOOP
	for j in 1..cantidadxColumn LOOP
	if (i = 1 AND cortes[i][j] != 0) then
	columna1 := columna1 + cortes[i][j]; 
	columna1_elems := array_append(columna1_elems, cortes[i][j]);
	ELSIF(i = 2 AND cortes[i][j] != 0)then
	  columna2 := columna2 + cortes[i][j];
	  columna2_elems := array_append(columna2_elems, cortes[i][j]);
	end if;
	END LOOP;
    END LOOP;
	RAISE NOTICE 'Elementos de columna 1: %', columna1_elems;
	RAISE NOTICE 'Elementos de columna 2: %', columna2_elems;
	verticales_elems := array_append(verticales_elems,columna1);
	verticales_elems := array_append(verticales_elems,columna2);
	verticales := cortes_verticales2(geometria,verticales_elems);
	FOR vertice_element IN SELECT unnest(verticales) LOOP
		if(contador = 1) then
		horizontales1:= cortes_horizontales_g2(vertice_element,columna1_elems);
		elseif (contador = 2) then
		horizontales2:= cortes_horizontales_g2(vertice_element,columna2_elems);
		else
		raise notice 'contador 3: %', contador;
		resultado:= resultado||vertice_element;
		end if;
		contador := contador +1;
    END LOOP;
	   resultado := resultado||horizontales1||horizontales2;
    RETURN resultado;
END;
$BODY$;

select st_area (unnest), unnest as geom from (
select unnest(cortes_cuadricula 
(
	(select geom from proyecto.parcelas where id=1),
	'{{1200,3200,4300},{900,1230,3240}}'::integer[][],
	3
))) as recortes
CREATE OR REPLACE FUNCTION public.cortes_rotacion_g2(
	geometria geometry,
	cortes integer[],
	rotacion integer)
    RETURNS geometry[]
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
	sobre geometry:=st_envelope(geometria);
	minx DOUBLE PRECISION;
	maxx DOUBLE PRECISION;
	miny DOUBLE PRECISION;
	maxy DOUBLE PRECISION;
	distancia_division DOUBLE PRECISION;
	factor_corte DOUBLE PRECISION;
	area geometry;
	corte geometry;
	area_corte DOUBLE PRECISION;
	area_corte_definida int;
	resultado geometry[];
	linea_vertical geometry;
	linea_rotate geometry;
	punto_final geometry; -- Definimos el punto final de la línea rotada
	puntoFinalX DOUBLE PRECISION;
	wkt_text TEXT;
	diferencia DOUBLE PRECISION;
	linea_corte geometry;
begin
	foreach area_corte_definida in array cortes loop
		sobre:=st_envelope(geometria);
		minx=st_xmin(sobre);
		maxx=st_xmax(sobre);
		miny=st_ymin(sobre);
		maxy=st_ymax(sobre);
		raise notice 'Área del siguiente corte a aplicar: %',area_corte_definida;	
		linea_vertical:= ST_SetSRID(ST_MakeLine(ST_Point(maxx, miny), ST_Point(maxx, maxy)), 5367);
		punto_final := ST_MakePoint(maxx + (maxy - miny) / tan(radians(rotacion)), maxy);
		linea_rotate:=ST_Rotate(linea_vertical, radians(rotacion), ST_Point(maxx,miny));
		linea_rotate := ST_SetPoint(linea_rotate, 1, punto_final);
		puntoFinalX:= ST_X(ST_EndPoint(linea_rotate));
		diferencia:= puntoFinalX-maxx;
		minx:= minx-diferencia;
		maxx := puntoFinalX;
		factor_corte:=(maxx-minx)/2;
		distancia_division:=factor_corte;
		 wkt_text := 'LINESTRING(' ||   maxx-distancia_division || ' ' || miny || ', ' ||
                                (maxx-distancia_division)+diferencia || ' ' || maxy || ', ' ||
                               maxx || ' ' || maxy || ', ' ||
							   maxx || ' ' || miny || ', ' ||
                               maxx-distancia_division || ' ' || miny || ')';
		linea_corte:= st_setsrid(ST_MakePolygon(ST_GeomFromText(wkt_text)),5367);
		corte=st_intersection(geometria,linea_corte);
		area_corte:=st_area(corte);
		while (abs(area_corte-area_corte_definida)>1) loop
			factor_corte:=factor_corte/2;
			if (area_corte>area_corte_definida) then
				distancia_division:=distancia_division-factor_corte;
				raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡Muy grande!',area_corte_definida,area_corte;
			elseif(area_corte<area_corte_definida)then
				distancia_division:=distancia_division+factor_corte;
				raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡Muy pequeño!',area_corte_definida,area_corte;
			elseif(diferencia>distancia_division)then
			CONTINUE;
			end if;
			 wkt_text := 'LINESTRING(' ||   maxx-distancia_division || ' ' || miny || ', ' ||
                                (maxx-distancia_division)+diferencia || ' ' || maxy || ', ' ||
                               maxx || ' ' || maxy || ', ' ||
							   maxx || ' ' || miny || ', ' ||
                               maxx-distancia_division || ' ' || miny || ')';
		linea_corte:= st_setsrid(ST_MakePolygon(ST_GeomFromText(wkt_text)),5367);
		corte=st_intersection(geometria,linea_corte);
		area_corte:=st_area(corte);
		end loop;
		raise notice E'\tÁrea a dividir: % Areas de corte actual: % ¡¡¡Final!!!',area_corte_definida,area_corte;
		geometria=st_difference(geometria,linea_corte);
		resultado:=resultado||corte;
	end loop;
	resultado:=resultado||geometria;
	return (resultado);
end;
$BODY$;
select st_area (unnest), unnest as geom from (
select unnest(cortes_rotacion_g2 
(
	(select geom from proyecto.parcelas where id=1),
	'{2400,1200,7500,900}'::int[], 35
))) as recortes

