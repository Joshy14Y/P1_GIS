<?php
    // Establecer conexión con la base de datos PostgreSQL
    $conn = pg_connect("host=leoviquez.com port=15432 dbname=cursoGIS user=usr_GIS password=usr_GIS") or die('{"error":"Error de conexión con la base de datos"}');
    
    // Consulta para obtener las dimensiones del área de interés (Bounding Box)
    $result = pg_query($conn, "select 	ST_Xmin(bb) as xmin, 
                                    ST_ymax(bb)*-1 as ymax, 
                                    ST_Xmax(bb)-ST_Xmin(bb) as ancho,
                                    ST_Ymax(bb)-ST_ymin(bb) as alto
                                from 
                                  (select ST_Extent(geom) bb from proyecto.parcelas) as extent");
    // Manejo de errores de consulta
    if (!$result) {
      echo '{"error":"Error en la consulta de base de datos"}';
      exit;
    }
    
    // Crear objeto para almacenar resultados
    $object_result= new stdClass();
    
    // Almacenar dimensiones del área de interés en el objeto de resultados
    $object_result->dimensiones = pg_fetch_all($result);
    
    // Consulta para obtener los objetos espaciales
    $result = pg_query($conn, "select id,area,st_assvg(geom,1, 4) as svg from proyecto.parcelas");
    
    // Manejo de errores de consulta
    if (!$result) {
      echo '{"error":"Error en la consulta de base de datos"}';
      exit;
    }
    
    // Almacenar objetos espaciales en el objeto de resultados
    $object_result->objetos = pg_fetch_all($result);
    
    // Convertir objeto de resultados a formato JSON
    echo json_encode($object_result);
?>
