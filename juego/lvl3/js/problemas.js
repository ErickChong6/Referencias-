var minutosProblema = 45;
var minutosPenalizacion = 5;
var tiempoRestante = 0;      // en segundos
var reloj = null;            // aquí se guarda el setInterval para poder detenerlo
var textoTiempo;
const notaProblema = document.getElementById("notaProblema"); /**esto lo pongo para poner la nota en series */
/*Vidas y revivir  */
var mediasVidas = 6;         // 3 corazones = 6 medias vidas
var revivirUsado = false;    // interruptor: solo se puede revivir una vez por nivel

/** pongan id del problema*/
var bancoNivel3 = [
    {
        id: "p0n3", tipo: "series",
        numeros: [0.78961, 0.12079, 0.10699, 0.65726, 0.14151, 0.80548, 0.82654, 0.29453, 0.20852, 0.42989],
        alfa: 0.05,
        n: 2,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { x: "0.78961", y: "0.80548" },
            { x: "0.80548", y: "0.12079" },
            { x: "0.12079", y: "0.82654" },
            { x: "0.82654", y: "0.10699" },
            { x: "0.10699", y: "0.29453" },
            { x: "0.29453", y: "0.65726" },
            { x: "0.65726", y: "0.20852" },
            { x: "0.20852", y: "0.14151" },
            { x: "0.14151", y: "0.42989" },
        ],
        campos: [
            { campo: "xo", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n²−1)", tolerancia: 0.00001 },
        ],
        respuestas: { xo: "1.222222222", X: "7.81", }
    },

    {
        id: "p1n3", tipo: "distancias",
        numeros: [0.38623, 0.41556, 0.80278, 0.15054, 0.40394, 0.09705, 0.97319, 0.45984, 0.53025, 0.65986],
        alfa: 0.05, n: 2,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { foi: "1", fei: "1" },
            { foi: "1", fei: "0.9" },
            { foi: "1", fei: "0.81" },
            { foi: "7", fei: "7.29" }
        ],
        campos: [
            { campo: "feiAmayor", etiqueta: "FEᵢ agrupada (valores menores de 5)", tolerancia: 0.00001 },
            { campo: "feiAmenor", etiqueta: "FEᵢ agrupada (valores mayores de 5)", tolerancia: 0.00001 },
            { campo: "foiA", etiqueta: "FOᵢ agrupada (i < n)", tolerancia: 0.00001 },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n−1)", tolerancia: 0.00001 }
        ],
        respuestas: { feiAmayor: "2.71", feiAmenor: "7.29", foiA: "3", xo2: "0.042570", X: "3.84" }
    },

    {
        id: "p2n3", tipo: "poker",
        numeros: [0.95819, 0.39510, 0.27699, 0.92962, 0.10274, 0.75867, 0.85783, 0.41290, 0.05870, 0.82444],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { categoria: "Todos diferentes (TD)", prob: "0.3024", fo: "3", fe: "3.0240" },
            { categoria: "Un par (1P)", prob: "0.5040", fo: "5", fe: "5.0400" },
            { categoria: "Dos pares (2P)", prob: "0.1080", fo: "1", fe: "1.0800" },
            { categoria: "Tercia (T)", prob: "0.0720", fo: "1", fe: "0.7200" },
            { categoria: "Full (TP)", prob: "0.0090", fo: "0", fe: "0.0900" },
            { categoria: "Póker (P)", prob: "0.0045", fo: "0", fe: "0.0450" },
            { categoria: "Quintilla (Q)", prob: "0.0001", fo: "0", fe: "0.0010" }
        ],
        campos: [
            { campo: "feiagrupada", etiqueta: "FEi agrupada de los valores menores a 5" },
            { campo: "foiagrupada", etiqueta: "FOi agrupada" },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
        ],
        respuestas: { feiagrupada: "4.824", foiagrupada: "5", xo2: "0.0067386975" }
    },

    {
        id: "p3n3", tipo: "series",
        numeros: [0.42337, 0.32066, 0.31692, 0.78948, 0.42101, 0.98416, 0.43699, 0.76515, 0.44447, 0.28233],
        alfa: 0.05,
        n: 2,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { x: "0.42337", y: "0.98416" },
            { x: "0.98416", y: "0.32066" },
            { x: "0.32066", y: "0.43699" },
            { x: "0.43699", y: "0.31692" },
            { x: "0.31692", y: "0.76515" },
            { x: "0.76515", y: "0.78948" },
            { x: "0.78948", y: "0.44447" },
            { x: "0.44447", y: "0.42101" },
            { x: "0.42101", y: "0.28233" },
        ],
        campos: [
            { campo: "xo", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n²−1)", tolerancia: 0.00001 },
        ],
        respuestas: { xo: "2.111111111111111", X: "7.81", }
    },

    {
        id: "p4n3", tipo: "series",
        numeros: [0.98911, 0.67037, 0.29578, 0.72159, 0.36497, 0.06509, 0.34803, 0.93684, 0.82372, 0.1234],
        alfa: 0.05,
        n: 2,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { x: "0.98911", y: "0.06509" },
            { x: "0.06509", y: "0.67037" },
            { x: "0.67037", y: "0.34803" },
            { x: "0.34803", y: "0.29578" },
            { x: "0.29578", y: "0.93684" },
            { x: "0.93684", y: "0.72159" },
            { x: "0.72159", y: "0.82372" },
            { x: "0.82372", y: "0.36497" },
            { x: "0.36497", y: "0.1234" },
        ],
        campos: [
            { campo: "xo", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n²−1)", tolerancia: 0.00001 },
        ],
        respuestas: { xo: "0.3333333333333333", X: "7.81", }
    },

    {
        id: "p5n3", tipo: "distancias",
        numeros: [0.44182, 0.73395, 0.18622, 0.95501, 0.62694, 0.3818, 0.50747, 0.14917, 0.83085, 0.26936],
        alfa: 0.05, n: 2,
        conclusion: "Los números rectangulares se rechazan",
        tabla: [
            { foi: "4", fei: "1" },
            { foi: "3", fei: "0.9" },
            { foi: "3", fei: "8.1" }
        ],
        campos: [
            { campo: "feiAmayor", etiqueta: "FEᵢ agrupada (valores menores de 5)", tolerancia: 0.00001 },
            { campo: "feiAmenor", etiqueta: "FEᵢ agrupada (valores mayores de 5)", tolerancia: 0.00001 },
            { campo: "foiA", etiqueta: "FOᵢ agrupada (i < n)", tolerancia: 0.00001 },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n−1)", tolerancia: 0.00001 }
        ],
        respuestas: { feiAmayor: "1.9", feiAmenor: "8.1", foiA: "7", xo2: "16.900585", X: "3.84" }
    },

    {
        id: "p6n3", tipo: "poker",
        numeros: [0.17724, 0.36069, 0.25784, 0.03916, 0.95059, 0.24641, 0.38108, 0.75351, 0.35036, 0.76817],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { categoria: "Todos diferentes (TD)", prob: "0.3024", fo: "2", fe: "3.024" },
            { categoria: "Un par (1P)", prob: "0.504", fo: "7", fe: "5.04" },
            { categoria: "Dos pares (2P)", prob: "0.108", fo: "1", fe: "1.08" },
            { categoria: "Tercia (T)", prob: "0.072", fo: "0", fe: "0.72" },
            { categoria: "Full (TP)", prob: "0.009", fo: "0", fe: "0.09" },
            { categoria: "Póker (P)", prob: "0.0045", fo: "0", fe: "0.045" },
            { categoria: "Quintilla (Q)", prob: "0.0001", fo: "0", fe: "0.001" },
        ],
        campos: [
            { campo: "feiagrupada", etiqueta: "FEi agrupada de los valores menores a 5" },
            { campo: "foiagrupada", etiqueta: "FOi agrupada" },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
        ],
        respuestas: { feiagrupada: "4.104", foiagrupada: "3", xo2: "1.059204678362573" }
    },


    {
        id: "p7n3", tipo: "distancias",
        numeros: [0.53843, 0.19747, 0.09698, 0.75586, 0.01747, 0.88031, 0.99074, 0.96553, 0.53854, 0.62011],
        alfa: 0.05, n: 2,
        conclusion: "Los números rectangulares se rechazan",
        tabla: [
            { foi: "5", fei: "1" },
            { foi: "3", fei: "0.9" },
            { foi: "2", fei: "8.1" }
        ],
        campos: [
            { campo: "feiAmayor", etiqueta: "FEᵢ agrupada (valores menores de 5)", tolerancia: 0.00001 },
            { campo: "feiAmenor", etiqueta: "FEᵢ agrupada (valores mayores de 5)", tolerancia: 0.00001 },
            { campo: "foiA", etiqueta: "FOᵢ agrupada (i < n)", tolerancia: 0.00001 },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n−1)", tolerancia: 0.00001 }
        ],
        respuestas: { feiAmayor: "1.9", feiAmenor: "8.1", foiA: "8", xo2: "24.178038", X: "3.84" }
    },

    {
        id: "p8n3", tipo: "distancias",
        numeros: [0.42312, 0.03807, 0.50201, 0.34055, 0.33079, 0.97829, 0.58502, 0.48154, 0.94255, 0.51835],
        alfa: 0.05, n: 2,
        conclusion: "Los números rectangulares se rechazan",
        tabla: [
            { foi: "3", fei: "1" },
            { foi: "2", fei: "0.9" },
            { foi: "2", fei: "0.81" },
            { foi: "3", fei: "7.29" }
        ],
        campos: [
            { campo: "feiAmayor", etiqueta: "FEᵢ agrupada (valores menores de 5)", tolerancia: 0.00001 },
            { campo: "feiAmenor", etiqueta: "FEᵢ agrupada (valores mayores de 5)", tolerancia: 0.00001 },
            { campo: "foiA", etiqueta: "FOᵢ agrupada (i < n)", tolerancia: 0.00001 },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
            { campo: "X", etiqueta: "X² (α, n−1)", tolerancia: 0.00001 }
        ],
        respuestas: { feiAmayor: "2.71", feiAmenor: "7.29", foiA: "7", xo2: "9.315749", X: "3.84" }
    },

    {
        id: "p9n3", tipo: "poker",
        numeros: [0.49021, 0.06204, 0.75534, 0.10971, 0.00147, 0.54431, 0.6346, 0.95317, 0.67637, 0.1811],
        alfa: 0.05,
        conclusion: "Los números rectangulares son aceptados",
        tabla: [
            { categoria: "Todos diferentes (TD)", prob: "0.3024", fo: "2", fe: "3.024" },
            { categoria: "Un par (1P)", prob: "0.504", fo: "6", fe: "5.04" },
            { categoria: "Dos pares (2P)", prob: "0.108", fo: "1", fe: "1.08" },
            { categoria: "Tercia (T)", prob: "0.072", fo: "1", fe: "0.72" },
            { categoria: "Full (TP)", prob: "0.009", fo: "0", fe: "0.09" },
            { categoria: "Póker (P)", prob: "0.0045", fo: "0", fe: "0.045" },
            { categoria: "Quintilla (Q)", prob: "0.0001", fo: "0", fe: "0.001" },
        ],
        campos: [
            { campo: "feiagrupada", etiqueta: "FEi agrupada de los valores menores a 5" },
            { campo: "foiagrupada", etiqueta: "FOi agrupada" },
            { campo: "xo2", etiqueta: "X₀²", tolerancia: 0.00001 },
        ],
        respuestas: { feiagrupada: "4.824", foiagrupada: "4", xo2: "0.3236067282634446" }
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
    var resueltos = JSON.parse(sessionStorage.getItem("resueltosNivel3") || "[]");
    var noResueltos = bancoNivel3.filter(function (p) { return !resueltos.includes(p.id); });
    var yaResueltos = bancoNivel3.filter(function (p) { return resueltos.includes(p.id); });

    // 1 de cada tipo...
    var series = noResueltos.filter(function (p) { return p.tipo === "series"; });
    var poker = noResueltos.filter(function (p) { return p.tipo === "poker"; });
    var distancias = noResueltos.filter(function (p) { return p.tipo === "distancias"; });
    var elegidos = Revolver(series).slice(0, 1)
        .concat(Revolver(poker).slice(0, 1))
        .concat(Revolver(distancias).slice(0, 1));

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
    series: "prueba de series",
    poker: "prueba de póker",
    distancias: "prueba de distancias"
};
function CuadriculaDeNumeros(numeros, porFila) {
    var html = "<table class='tabla-numeros'>";
    for (var i = 0; i < numeros.length; i += porFila) {        // salta de 5 en 5
        var fila = numeros.slice(i, i + porFila).map(function (n) { return Number(n).toFixed(5); });
        html += "<tr><td>" + fila.join("</td><td>") + "</td></tr>";
    }
    return html + "</table>";
}


var notasPorTipo = {
    series: "Nota: en los problemas de pruebas de series, los números deben agruparse en parejas por columnas, no por filas."
    // si poker o distancias necesitan nota, agrégala aquí
};

function MostrarProblema() {
    parado = true;
    gato.classList.remove("gato-corriendo");
    var p = problemasPartida[problemaActual];

    // Igual para todos los tipos
    tituloProblema.innerText = "Aplica la " + nombresPrueba[p.tipo] + " con α = " + p.alfa;
    document.getElementById("p-numeros").innerHTML = CuadriculaDeNumeros(p.numeros, 5);

    // Lo único que cambia: la nota (si el tipo no tiene, queda vacía)
    notaProblema.innerText = notasPorTipo[p.tipo] || "";

    CrearCampos(p);
    PintarVidas();
    pantallaProblema.style.display = "block";
    IniciarReloj();
}

/** tablas TABLAS */
var columnasPorTipo = {
    series: [
        { campo: "x", titulo: "No.rectangular Ui(x)" },
        { campo: "y", titulo: "No.rectangular Ui(y)" }
    ],
    distancias: [
        { campo: "foi", titulo: "FOᵢ" },
        { campo: "fei", titulo: "FEᵢ" },
    ],
    poker: [
        { campo: "categoria", titulo: "Categoría", dado: true },     // se muestra como texto
        { campo: "prob", titulo: "Probabilidad", dado: true },  // se muestra como texto
        { campo: "fo", titulo: "FOᵢ" },                        // casilla para el jugador
        { campo: "fe", titulo: "FEᵢ" },

    ]

};

var filasTabla = 0;     // cuántas filas lleva el jugador (como en el nivel 1)
var tablaFija = {
    poker: true      // las filas ya están definidas: el jugador NO agrega filas
};

function CrearTabla(p) {
    var columnas = columnasPorTipo[p.tipo];
    var tabla = document.createElement("table");
    tabla.className = "p-tabla";
    tabla.id = "tablaProblema";

    var encabezado = tabla.insertRow();
    if (!tablaFija[p.tipo]) encabezado.innerHTML = "<th>i</th>";     // ✅ "i" solo si NO es fija
    columnas.forEach(function (col) {
        encabezado.innerHTML += "<th>" + col.titulo + "</th>";
    });

    // primero se pone en la página, DESPUÉS se agregan filas
    document.getElementById("zona-respuestas").appendChild(tabla);
    filasTabla = 0;

    if (tablaFija[p.tipo]) {
        p.tabla.forEach(function () { InsertarFila(); });    // una fila por cada renglón del banco
    } else {
        InsertarFila();                                       // como antes: empieza con 1
    }
}

function InsertarFila() {
    var p = problemasPartida[problemaActual];
    var columnas = columnasPorTipo[p.tipo];        // las columnas del tipo actual
    var tabla = document.getElementById("tablaProblema");
    var fila = tabla.insertRow(-1);                // -1 = al final
    var i = filasTabla;

    if (!tablaFija[p.tipo]) fila.insertCell().innerText = p.tipo === "distancias" ? i : i + 1;
    columnas.forEach(function (col) {
        if (col.dado) {                                          // ✅ columna dada
            fila.insertCell().innerText = p.tabla[i][col.campo]; // escribe el texto del banco
            return;                                              // y pasa a la siguiente columna
        }
        var input = document.createElement("input");             // columna normal: casilla
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
    var puedeAgregarFilas = llevaTabla && !tablaFija[p.tipo];
    document.querySelector(".botones-tabla").style.display = puedeAgregarFilas ? "block" : "none";

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

        if (correcta !== undefined && SonIguales(input.value, correcta, tolerancia)) {
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

function AbrirMinijuego() {
    revivirUsado = true;
    document.querySelector(".pantalla-revivir").style.display = "none";
    document.querySelector(".minijuego").style.display = "block";
    IniciarCuestionario2();
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
    window.location.href = "niveles.html";
}

/** formulas */
var imagenesFormulas = [          // se usan en la intro Y en el botón "Fórmulas"
    "./img/formula1.png", // TODO: poner las formulas reales
    "./img/formula2.png"
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
