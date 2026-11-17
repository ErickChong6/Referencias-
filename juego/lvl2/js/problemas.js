var minutosProblema = 45;
var minutosPenalizacion = 5;
var tiempoRestante = 0;      // en segundos
var reloj = null;            // aquí se guarda el setInterval para poder detenerlo
var textoTiempo;

/*Vidas y revivir  */
var mediasVidas = 6;         // 3 corazones = 6 medias vidas
var revivirUsado = false;    // interruptor: solo se puede revivir una vez por nivel

/** pongan id del problema*/
var bancoNivel2 = [
    {
        id: "p0n2", tipo: "promedios",
        numeros: [0.87539, 0.08823, 0.94813, 0.31900, 0.54155, 0.16818, 0.60311, 0.74457, 0.90561, 0.72848],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        campos: [
            { campo: "media", etiqueta: "x̄" },
            { campo: "z0", etiqueta: "Z₀", tolerancia: 0.01 },
            { campo: "z", etiqueta: "Z" }
        ],
        respuestas: { media: "0.592225", z0: "1.0103", z: "1.96" }
    },

    {
        id: "p1n2", tipo: "frecuencias",
        numeros: [0.87539, 0.08823, 0.94813, 0.31900, 0.54155, 0.16818, 0.60311, 0.74457, 0.90561, 0.72848],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { foi: "2", fei: "2" },
            { foi: "1", fei: "2" },
            { foi: "1", fei: "2" },
            { foi: "3", fei: "2" },
            { foi: "3", fei: "2" }
        ],
        campos: [
            { campo: "xTotal", etiqueta: "χ² calculada" },
            { campo: "xTablas", etiqueta: "χ² de tablas" }
        ],
        respuestas: { xTotal: "2", xTablas: "9.49" }
    },

    {
        id: "p2n2", tipo: "promedios",
        numeros: [0.68407, 0.27506, 0.80392, 0.80019, 0.87039, 0.98253, 0.81755, 0.97673, 0.51622, 0.12206],
        alfa: 0.05,
        conclusion: "Los números rectangulares se rechazan",
        campos: [
            { campo: "media", etiqueta: "x̄" },
            { campo: "z0", etiqueta: "Z₀", tolerancia: 0.01 },
            { campo: "z", etiqueta: "Z" }
        ],
        respuestas: { media: "0.6848719999999999", z0: "2.025171293021901", z: "1.96" }
    },

    {
        id: "p3n2", tipo: "ks",
        numeros: [0.9548, 0.42464, 0.99205, 0.83648, 0.92265, 0.75494, 0.35987, 0.95285, 0.31997, 0.08844],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { i: "1", xi: "0.08844", fxi: "0.1", dn: "0.01156" },
            { i: "2", xi: "0.31997", fxi: "0.2", dn: "0.11996999999999997" },
            { i: "3", xi: "0.35987", fxi: "0.3", dn: "0.059870000000000034" },
            { i: "4", xi: "0.42464", fxi: "0.4", dn: "0.024639999999999995" },
            { i: "5", xi: "0.75494", fxi: "0.5", dn: "0.25494000000000006" },
            { i: "6", xi: "0.83648", fxi: "0.6", dn: "0.23648000000000002" },
            { i: "7", xi: "0.92265", fxi: "0.7", dn: "0.22265000000000001" },
            { i: "8", xi: "0.95285", fxi: "0.8", dn: "0.15284999999999993" },
            { i: "9", xi: "0.9548", fxi: "0.9", dn: "0.05479999999999996" },
            { i: "10", xi: "0.99205", fxi: "1", dn: "0.007950000000000013" },
        ],
        campos: [
            { campo: "Dnmayor", etiqueta: "Valor estadístico mayor" },
            { campo: "dtablas", etiqueta: "dα , N " }
        ],
        respuestas: { Dnmayor: "0.25494000000000006", dtablas: "0.409" }
    },

    {
        id: "p4n2", tipo: "ks",
        numeros: [0.1487, 0.34052, 0.28264, 0.04549, 0.60207, 0.49226, 0.379, 0.26118, 0.11372, 0.21804],
        alfa: 0.05,
        conclusion: "Los números rectangulares se rechazan",
        tabla: [
            { i: "1", xi: "0.04549", fxi: "0.1", dn: "0.05451" },
            { i: "2", xi: "0.11372", fxi: "0.2", dn: "0.08628000000000001" },
            { i: "3", xi: "0.1487", fxi: "0.3", dn: "0.1513" },
            { i: "4", xi: "0.21804", fxi: "0.4", dn: "0.18196" },
            { i: "5", xi: "0.26118", fxi: "0.5", dn: "0.23881999999999998" },
            { i: "6", xi: "0.28264", fxi: "0.6", dn: "0.31736" },
            { i: "7", xi: "0.34052", fxi: "0.7", dn: "0.35947999999999997" },
            { i: "8", xi: "0.379", fxi: "0.8", dn: "0.42100000000000004" },
            { i: "9", xi: "0.49226", fxi: "0.9", dn: "0.40774000000000005" },
            { i: "10", xi: "0.60207", fxi: "1", dn: "0.39793" },
        ],
        campos: [
            { campo: "Dnmayor", etiqueta: "Valor estadístico mayor" },
            { campo: "dtablas", etiqueta: "dα , N " }
        ],
        respuestas: { Dnmayor: "0.42100000000000004", dtablas: "0.409" }
    },

    {
        id: "p5n2", tipo: "promedios",
        numeros: [0.25511, 0.17261, 0.21506, 0.75578, 0.27567, 0.50036, 0.48078, 0.2057, 0.04617, 0.62765],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        campos: [
            { campo: "media", etiqueta: "x̄" },
            { campo: "z0", etiqueta: "Z₀", tolerancia: 0.01 },
            { campo: "z", etiqueta: "Z" }
        ],
        respuestas: { media: "0.35348900000000005", z0: "1.6049475924527876", z: "1.96" }
    },

    {
        id: "p6n2", tipo: "promedios",
        numeros: [0.92372, 0.00915, 0.32904, 0.65957, 0.68834, 0.86768, 0.97361, 0.90266, 0.08871, 0.32131],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        campos: [
            { campo: "media", etiqueta: "x̄" },
            { campo: "z0", etiqueta: "Z₀", tolerancia: 0.01 },
            { campo: "z", etiqueta: "Z" }
        ],
        respuestas: { media: "0.576379", z0: "0.8366900243937415", z: "1.96" }
    },

    {
        id: "p7n2", tipo: "ks",
        numeros: [0.54728, 0.09262, 0.83353, 0.9229, 0.03755, 0.34593, 0.67945, 0.82225, 0.66678, 0.05667],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { i: "1", xi: "0.03755", fxi: "0.1", dn: "0.062450000000000006" },
            { i: "2", xi: "0.05667", fxi: "0.2", dn: "0.14333" },
            { i: "3", xi: "0.09262", fxi: "0.3", dn: "0.20738" },
            { i: "4", xi: "0.34593", fxi: "0.4", dn: "0.05407000000000001" },
            { i: "5", xi: "0.54728", fxi: "0.5", dn: "0.04727999999999999" },
            { i: "6", xi: "0.66678", fxi: "0.6", dn: "0.06678000000000006" },
            { i: "7", xi: "0.67945", fxi: "0.7", dn: "0.020549999999999957" },
            { i: "8", xi: "0.82225", fxi: "0.8", dn: "0.022249999999999992" },
            { i: "9", xi: "0.83353", fxi: "0.9", dn: "0.06647000000000003" },
            { i: "10", xi: "0.9229", fxi: "1", dn: "0.07709999999999995" },
        ],
        campos: [
            { campo: "Dnmayor", etiqueta: "Valor estadístico mayor" },
            { campo: "dtablas", etiqueta: "dα , N " }
        ],
        respuestas: { Dnmayor: "0.20738", dtablas: "0.409" }
    },

    {
        id: "p8n2", tipo: "frecuencias",
        numeros: [0.75421, 0.8994, 0.89253, 0.15064, 0.93945, 0.89218, 0.23474, 0.95338, 0.906, 0.46539],
        alfa: 0.05,
        n: 5,
        conclusion: "Los números rectangulares se rechazan",
        tabla: [
            { foi: "1", fei: "2" },
            { foi: "1", fei: "2" },
            { foi: "1", fei: "2" },
            { foi: "1", fei: "2" },
            { foi: "6", fei: "2" },
        ],
        campos: [
            { campo: "xTotal", etiqueta: "χ² calculada" },
            { campo: "xTablas", etiqueta: "χ² de tablas" }
        ],
        respuestas: { xTotal: "10", xTablas: "9.49" }
    },

    {
        id: "p9n2", tipo: "frecuencias",
        numeros: [0.81063, 0.45197, 0.29936, 0.5235, 0.68606, 0.06692, 0.56818, 0.90104, 0.40981, 0.23586],
        alfa: 0.05,
        n: 5,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { foi: "1", fei: "2" },
            { foi: "2", fei: "2" },
            { foi: "4", fei: "2" },
            { foi: "1", fei: "2" },
            { foi: "2", fei: "2" },
        ],
        campos: [
            { campo: "xTotal", etiqueta: "χ² calculada" },
            { campo: "xTablas", etiqueta: "χ² de tablas" }
        ],
        respuestas: { xTotal: "3", xTablas: "9.49" }
    },

];

/***ELEGIR LOS PROBLEMAS DE LA PARTIDA* */
var problemasPartida = [];   // los que tocan en esta partida
var problemaActual = 0;      // cuál va (0, 1, 2, 3)

function Revolver(lista) {   // Fisher-Yates: todos los órdenes con la misma probabilidad
    var copia = lista.slice();                    // copia para no dañar el banco
    for (var i = copia.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copia[i];
        copia[i] = copia[j];
        copia[j] = temp;
    }
    return copia;
}

function ElegirProblemas() {
    var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel2") || "[]");
    var noResueltos = bancoNivel2.filter(function (p) { return !resueltos.includes(p.id); });
    var yaResueltos = bancoNivel2.filter(function (p) { return resueltos.includes(p.id); });

    // 1 de cada tipo...
    var ks = noResueltos.filter(function (p) { return p.tipo === "ks"; });
    var promedios = noResueltos.filter(function (p) { return p.tipo === "promedios"; });
    var frecuencias = noResueltos.filter(function (p) { return p.tipo === "frecuencias"; });
    var elegidos = Revolver(promedios).slice(0, 1)
        .concat(Revolver(ks).slice(0, 1))
        .concat(Revolver(frecuencias).slice(0, 1));

    // ...y el resto se completa al azar
    var sobrantes = Revolver(noResueltos).filter(function (p) { return !elegidos.includes(p); });
    elegidos = elegidos.concat(sobrantes).slice(0, problemasPorNivel);

    if (elegidos.length < problemasPorNivel) {
        elegidos = elegidos.concat(Revolver(yaResueltos)).slice(0, problemasPorNivel);
    }

    problemasPartida = Revolver(elegidos);        // mezcla el orden
}

/** MOSTRAR EL PROBLEMA */
var nombresPrueba = {
    promedios: "prueba de promedios",
    frecuencias: "prueba de frecuencias",
    ks: "prueba de Kolmogórov-Smirnov"
};

function CuadriculaDeNumeros(numeros, porFila) {
    var html = "<table class='tabla-numeros'>";
    for (var i = 0; i < numeros.length; i += porFila) {        // salta de 5 en 5
        var fila = numeros.slice(i, i + porFila);              // toma 5 números
        html += "<tr><td>" + fila.join("</td><td>") + "</td></tr>";
    }
    return html + "</table>";
}
function MostrarProblema() {
    parado = true;
    gato.classList.remove("gato-corriendo");
    var p = problemasPartida[problemaActual];

    // Igual para todos los tipos
    var titulo = "Aplica la " + nombresPrueba[p.tipo] + " con α = " + p.alfa;
    if (p.n) titulo += " y n = " + p.n;               // solo si el problema trae n
    tituloProblema.innerText = titulo;
    document.getElementById("p-numeros").innerHTML = CuadriculaDeNumeros(p.numeros, 5);

    CrearCampos(p);
    PintarVidas();
    pantallaProblema.style.display = "block";
    IniciarReloj();
}
/** tablas TABLAS */
var columnasPorTipo = {
    frecuencias: [
        { campo: "foi", titulo: "FOᵢ" },
        { campo: "fei", titulo: "FEᵢ" }
    ],
    ks: [
        { campo: "xi", titulo: "xᵢ" },
        { campo: "fxi", titulo: "F(xᵢ)" },
        { campo: "dn", titulo: "Dn" }
    ]

};

var filasTabla = 0;     // cuántas filas lleva el jugador (como en el nivel 1)

function CrearTabla(p) {
    var columnas = columnasPorTipo[p.tipo];
    var tabla = document.createElement("table");
    tabla.className = "p-tabla";
    tabla.id = "tablaProblema";

    var encabezado = tabla.insertRow();
    encabezado.innerHTML = "<th>i</th>";
    columnas.forEach(function (col) {
        encabezado.innerHTML += "<th>" + col.titulo + "</th>";
    });

    // primero se pone en la página, DESPUÉS se agregan filas
    document.getElementById("zona-respuestas").appendChild(tabla);
    filasTabla = 0;
    InsertarFila();                                // empieza con 1 fila
}

function InsertarFila() {
    var p = problemasPartida[problemaActual];
    var columnas = columnasPorTipo[p.tipo];        // las columnas del tipo actual
    var tabla = document.getElementById("tablaProblema");
    var fila = tabla.insertRow(-1);                // -1 = al final
    var i = filasTabla;

    fila.insertCell().innerText = i + 1;           // número de fila: 1, 2, 3...
    columnas.forEach(function (col) {
        var input = document.createElement("input");
        input.dataset.fila = i;
        input.dataset.campo = col.campo;
        fila.insertCell().appendChild(input);
    });
    filasTabla++;
}

function QuitarFila() {
    var tabla = document.getElementById("tablaProblema");
    if (filasTabla > 1) {                          // que siempre quede al menos 1
        tabla.deleteRow(-1);
        filasTabla--;
    }
}

/** pone la tabla y tmb campos para ingresar respuesta*/
function CrearCampos(p) {
    var zona = document.getElementById("zona-respuestas");
    zona.innerHTML = "";                           // borra lo del problema anterior

    // 1) La tabla
    var llevaTabla = columnasPorTipo[p.tipo] !== undefined;
    if (llevaTabla) CrearTabla(p);
    document.querySelector(".botones-tabla").style.display = llevaTabla ? "block" : "none";

    // 2) Las casillas sueltas (todos los tipos)
    p.campos.forEach(function (c) {
        var etiqueta = document.createElement("label");
        etiqueta.className = "campo";
        etiqueta.textContent = c.etiqueta + ": ";

        var input = document.createElement("input");
        input.dataset.campo = c.campo;

        etiqueta.appendChild(input);
        zona.appendChild(etiqueta);
    });

    // 3) Limpiar lo del problema anterior (para TODOS los tipos)
    document.getElementById("p-conclusion").value = "";
    document.getElementById("p-conclusion").classList.remove("ok", "mal");
    document.querySelector(".p-mensaje").innerText = "";
}

/**revisar respuestas se mantiene */
// Convierte "1 + 27/32", "27/32", "0.84375" o 27 en un número
function ANumero(texto) {
    texto = String(texto).replace(/\s+/g, "").replace(",", ".");
    if (texto === "") return NaN;

    var partes = texto.split("+");
    var total = 0;
    for (var i = 0; i < partes.length; i++) {
        var parte = partes[i];
        if (parte === "") return NaN;
        var numero;
        if (parte.includes("/")) {
            var div = parte.split("/");
            if (div.length !== 2) return NaN;
            numero = Number(div[0]) / Number(div[1]);
        } else {
            numero = Number(parte);
        }
        if (isNaN(numero)) return NaN;
        total += numero;
    }
    return total;
}

// tolerancia: qué tan cerca debe estar (si no se indica, 0.0005)
function SonIguales(respuestaJugador, respuestaCorrecta, tolerancia) {
    var a = ANumero(respuestaJugador);
    var b = ANumero(respuestaCorrecta);
    if (isNaN(a) || isNaN(b)) return false;
    return Math.abs(a - b) < (tolerancia || 0.0005);
}

// Busca la tolerancia de un campo suelto en el banco (ej. z0 → 0.01)
function ToleranciaDe(p, campo) {
    var c = p.campos.find(function (c) { return c.campo === campo; });
    return c ? c.tolerancia : undefined;
}

function RevisarRespuestas() {
    var mensaje = document.querySelector(".p-mensaje");
    var inputs = document.querySelectorAll("#zona-respuestas input");
    var conclusion = document.getElementById("p-conclusion");
    var p = problemasPartida[problemaActual];
    var errores = 0;

    // 1) Avisos SIN castigo
    for (var k = 0; k < inputs.length; k++) {
        if (inputs[k].value.trim() === "") {
            mensaje.innerText = "Te faltan casillas por llenar.";
            return;
        }
    }
    if (conclusion.value === "") {
        mensaje.innerText = "Elige una conclusión.";
        return;
    }

    // 2) Revisar cada casilla
    inputs.forEach(function (input) {
        var campo = input.dataset.campo;
        var correcta, tolerancia;

        if (input.dataset.fila !== undefined) {               // casilla de la tabla
            var fila = Number(input.dataset.fila);
            correcta = p.tabla[fila] ? p.tabla[fila][campo] : undefined;   // fila de más = undefined
        } else {                                               // casilla suelta
            correcta = p.respuestas[campo];
            tolerancia = ToleranciaDe(p, campo);
        }

        const acierto = correcta !== undefined && SonIguales(input.value, correcta, tolerancia)

        if (acierto) {
            input.classList.add("ok");
            input.classList.remove("mal");
            input.readOnly = true;
        } else {
            input.classList.add("mal");
            input.classList.remove("ok");
            errores++;
        }
    });

    // 3) Filas que faltan = UN error (fuera del forEach para contarse una sola vez)
    var faltanFilas = p.tabla && filasTabla < p.tabla.length;
    if (faltanFilas) errores++;

    // 4) Conclusión
    if (conclusion.value === p.conclusion) {
        conclusion.classList.add("ok");
        conclusion.classList.remove("mal");
    } else {
        conclusion.classList.add("mal");
        conclusion.classList.remove("ok");
        errores++;
    }

    // 5) Resultado
    if (errores > 0) {
        var texto = "Te equivocaste";
        if (faltanFilas) texto += " (te faltan filas)";
        mensaje.innerText = texto + ". Has perdido media vida y 5 minutos.";
        PerderMediaVida();
        if (mediasVidas > 0) Penalizar();
    } else {
        mensaje.innerText = "";
        ContinuarCarrera();
    }
}

/** vidas no se toca*/
function PintarVidas() {
    var contenedorVidas = document.getElementById("p-vidas");
    contenedorVidas.innerHTML = "";                  // borra los corazones anteriores

    for (var i = 0; i < 3; i++) {
        var resto = mediasVidas - i * 2;
        var img = document.createElement("img");     // una imagen NUEVA por vuelta

        if (resto >= 2) {
            img.src = "../img/corazon.png";
            img.alt = "Corazón completo";
            img.classList.add("img-corazon");
        } else if (resto === 1) {
            img.src = "../img/corazonRoto.png";
            img.alt = "Medio corazón";
            img.classList.add("img-corazonRoto");
        } else {
            continue;                                // vida perdida: no dibuja nada
        }
        contenedorVidas.appendChild(img);
    }
}

function PerderMediaVida() {
    mediasVidas--;
    PintarVidas();
    if (mediasVidas <= 0) {
        SinVidas();
    }
}

/** revivir minijuego */
function SinVidas() {
    DetenerReloj();
    pantallaProblema.style.display = "none";
    document.querySelector(".pantalla-revivir").style.display = "block";
    if (revivirUsado) {
        document.querySelector(".revivir-texto").innerText = "Ya usaste tu oportunidad de revivir.";
        document.querySelector(".btn-revivir").style.display = "none";
    }
}

// Ahorcado o Revuelta
function AbrirMinijuego() {
    revivirUsado = true;
    document.querySelector(".pantalla-revivir").style.display = "none";
    document.querySelector(".minijuego").style.display = "block";
    if (Math.random() < 0.5) IniciarAhorcado();
    else IniciarRevuelta();                // aquí meten los dos archivos js d su juego  para q se sorteen
}

function MinijuegoGanado() {
    document.querySelector(".minijuego").style.display = "none";
    mediasVidas = 6;                  // recupera los 3 corazones
    PintarVidas();
    document.querySelector(".p-mensaje").innerText = "¡Has revivido! Termina el problema.";
    if (tiempoRestante < 600) tiempoRestante = 600;   // si se le acabó el tiempo, recibe 10 minutos
    pantallaProblema.style.display = "block";         // la tabla sigue como la dejó
    ReanudarReloj();
}

function MinijuegoPerdido() {
    IrAlMenu();
}

function IrAlMenu() {
    window.location.href = "../niveles.html";
}

/** formulas */
var imagenesFormulas = [          // se usan en la intro Y en el botón "Fórmulas"
    "../lvl2/img/5.png",
    "../lvl2/img/6.png",
    "../lvl2/img/7.png",
];
var formulaActual = 0;

function AbrirFormulas() {
    formulaActual = 0;
    MostrarFormulas();
    document.querySelector(".ventana-formulas").style.display = "flex";
    document.activeElement.blur();
}

function CerrarFormulas() {
    document.querySelector(".ventana-formulas").style.display = "none";
}

function CambiarFormula(direccion) {
    formulaActual += direccion;
    if (formulaActual < 0) formulaActual = imagenesFormulas.length - 1;
    if (formulaActual >= imagenesFormulas.length) formulaActual = 0;
    MostrarFormulas();
}

function MostrarFormulas() {
    document.querySelector(".formulas-img").src = imagenesFormulas[formulaActual];
    document.querySelector(".formulas-contador").innerText = (formulaActual + 1) + " / " + imagenesFormulas.length;
}
