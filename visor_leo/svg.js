// Función para mostrar un mapa SVG con las geometrías proporcionadas
function verMapa(width, height, geometrias) {
    // Crear un elemento SVG con las dimensiones proporcionadas
    svg = crearSVG(width, height, geometrias.dimensiones[0]);

    // Obtener el ancho y alto de las dimensiones proporcionadas
    ancho = parseFloat(geometrias.dimensiones[0].ancho);
    alto = parseFloat(geometrias.dimensiones[0].alto);

    // Calcular la proporción para ajustar el ancho de línea de los objetos
    if (alto > ancho)
        ancho_proporcional = alto / height;
    else
        ancho_proporcional = ancho / width;

    // Crear y añadir los elementos SVG de las geometrías al SVG principal
    crear_path(svg, geometrias.objetos, ancho_proporcional);
    document.getElementById("mapa").appendChild(o_svg);
}

// Función para crear un elemento SVG con las dimensiones proporcionadas
function crearSVG(width, height, dimensiones) {
    var xmlns = "http://www.w3.org/2000/svg";
    o_svg = document.createElementNS(xmlns, "svg");
    o_svg.setAttribute('id', 'svg');
    o_svg.setAttribute('width', width);
    o_svg.setAttribute('height', height);
    vb = dimensiones.xmin + ' ' + dimensiones.ymax + ' ' + dimensiones.ancho + ' ' + dimensiones.alto;
    o_svg.setAttribute('viewBox', vb);
    return (o_svg);
}

// Función para generar un número aleatorio entre 0 y 'numero'
function generarNumero(numero) {
    return (Math.random() * numero).toFixed(0);
}

// Función para generar un color RGB aleatorio
function colorRGB() {
    var color = "(" + generarNumero(255) + "," + generarNumero(255) + "," + generarNumero(255) + ", 0.5)";
    return "rgba" + color;
}

// Función para crear los elementos SVG de las geometrías y añadirlos al SVG principal
function crear_path(svg, geometrias, ancho_proporcional) {
    var xmlns = "http://www.w3.org/2000/svg";
    for (geom in geometrias) {
        // Crear un elemento <path> para cada geometría
        figura = document.createElementNS(xmlns, "path");
        figura.setAttribute("d", geometrias[geom].svg);
        figura.setAttribute("stroke", "black");
        figura.setAttribute("class", "objeto_espacial");
        figura.setAttribute("fill", colorRGB());
        figura.setAttribute("stroke-width", ancho_proporcional);
        // Añadir el elemento <path> al SVG principal
        svg.appendChild(crear_grupoSVG(figura, geometrias[geom].nombre));
    }
}

// Función para crear un grupo SVG que contenga un elemento SVG y un título
function crear_grupoSVG(svg, descripcion) {
    var xmlns = "http://www.w3.org/2000/svg";
    grupo = document.createElementNS(xmlns, "g");
    titulo = document.createElementNS(xmlns, "title");
    titulo.innerHTML = descripcion;
    grupo.appendChild(titulo);
    grupo.appendChild(svg);
    return (grupo);
}

// Función para cargar los datos de geometrías desde un archivo PHP y mostrar el mapa
function cargar_figura() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Al recibir los datos, llamar a la función verMapa para mostrar el mapa
            verMapa(800, 600, JSON.parse(this.responseText));
        }
    };
    // Realizar una solicitud GET al archivo PHP que devuelve los datos de geometrías
    xhttp.open("GET", "dimensiones.php", true);
    xhttp.send();
}
